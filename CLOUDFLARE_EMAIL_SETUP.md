# Cloudflare Worker → Personal Email (Booking Form)

Send form submissions from the &whoSaid site straight to your personal inbox, with **no backend, no database, no third-party mail API, no API key in the frontend**. Uses only Cloudflare (free tier).

## How it works

```
Booking form  ──POST──►  Cloudflare Worker  ──env.BOOKING_MAIL.send()──►  Cloudflare Email Routing  ──►  your@personal.com
 (browser fetch)          (subdomain.workers.dev)                         (built-in, no SMTP, no API key)
```

- The Worker uses Cloudflare's native `send_email` binding.
- The binding can only deliver to **verified destination addresses** you control — perfect for "form → my own inbox."
- You don't need to buy anything new if your domain is already on Cloudflare. Email Routing is free.

## Prerequisites

1. A domain managed by Cloudflare (nameservers pointed at Cloudflare). For this project let's assume `andwhosaid.com`. If you don't own one yet, register it on Cloudflare Registrar or any registrar and point nameservers.
2. A free Cloudflare account.
3. Node.js on your machine (you already have it).
4. Your personal email (e.g. `vasil@gmail.com`) that will receive the form submissions.

---

## Step 1 — Enable Email Routing on your domain

1. Cloudflare dashboard → pick your domain (`andwhosaid.com`) → **Email** → **Email Routing** → **Get started**.
2. Cloudflare will auto-add the required MX + TXT records. Click **Add records and enable**.
3. Under **Destination addresses**, click **Add destination address**, enter your personal email, and click the verification link Cloudflare emails you. Wait until it shows **Verified** (green check).
4. (Optional but recommended) Add a catch-all or a specific route like `hello@andwhosaid.com` → your personal email, so replies work out of the box.

> Email Routing gives you free inbound forwarding AND unlocks the `send_email` binding that Workers use to send outbound mail.

---

## Step 2 — Scaffold the Worker

In a separate folder (not inside the React app — keep it alongside):

```bash
cd "C:/Users/VasilIliev/OneDrive - Digital Lights Ltd/Desktop/PROJECTS"
npm create cloudflare@latest -- andwhosaid-mailer
```

Answer the prompts:
- Template: **"Hello World" Worker**
- TypeScript: **No** (JS is enough for a ~40-line worker)
- Git: up to you
- Deploy now: **No** (we'll configure first)

```bash
cd andwhosaid-mailer
npm install mimetext
```

`mimetext` is a tiny library that builds a correct RFC-822 MIME string — the `send_email` binding needs raw MIME, not just a body.

---

## Step 3 — Configure `wrangler.toml`

Replace the contents of `wrangler.toml` with:

```toml
name = "andwhosaid-mailer"
main = "src/index.js"
compatibility_date = "2026-04-15"

# Bind the Email Routing sender. The Worker will call env.BOOKING_MAIL.send(...)
# `destination_address` locks the Worker so it can ONLY deliver to your
# personal email — even if someone tampers with the Worker code, it cannot
# be weaponized to spam other addresses.
[[send_email]]
name = "BOOKING_MAIL"
destination_address = "vasil@gmail.com"   # <-- your verified personal email
```

> If later you want the Worker to send to multiple addresses (e.g. you + a partner), swap `destination_address` for `allowed_destination_addresses = ["a@x.com", "b@y.com"]`. All of them must be verified in Email Routing first.

---

## Step 4 — Write the Worker (`src/index.js`)

```js
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

// Lock down who can call this Worker. Add your GitHub Pages origin here.
const ALLOWED_ORIGINS = [
  "https://<your-gh-user>.github.io",
  "http://localhost:5173", // Vite dev
];

const FROM_ADDRESS = "form@andwhosaid.com";   // any local-part on your zone
const FROM_NAME    = "andWhoSaid форма";
const TO_ADDRESS   = "vasil@gmail.com";        // must match wrangler.toml
const SUBJECT_PFX  = "[andWhoSaid] Ново запитване";

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: cors });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response("Bad JSON", { status: 400, headers: cors });
    }

    // Honeypot — reject bots that fill hidden fields
    if (data.website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const {
      name = "",
      phone = "",
      email = "",
      date = "",
      guests = "",
      services = [],
      details = "",
    } = data;

    if (!name || !phone) {
      return new Response("Missing required fields", { status: 400, headers: cors });
    }

    const servicesList = Array.isArray(services) ? services.join(", ") : "";

    const html = `
      <h2>Ново запитване от сайта</h2>
      <table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td><b>Име</b></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><b>Телефон</b></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td><b>Имейл</b></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><b>Дата</b></td><td>${escapeHtml(date)}</td></tr>
        <tr><td><b>Брой гости</b></td><td>${escapeHtml(guests)}</td></tr>
        <tr><td><b>Услуги</b></td><td>${escapeHtml(servicesList)}</td></tr>
        <tr><td valign="top"><b>Детайли</b></td><td>${escapeHtml(details).replace(/\n/g,"<br>")}</td></tr>
      </table>
    `;

    const msg = createMimeMessage();
    msg.setSender({ name: FROM_NAME, addr: FROM_ADDRESS });
    msg.setRecipient(TO_ADDRESS);
    if (email) msg.setHeader("Reply-To", email);
    msg.setSubject(`${SUBJECT_PFX} — ${name}`);
    msg.addMessage({ contentType: "text/html", data: html });

    const message = new EmailMessage(FROM_ADDRESS, TO_ADDRESS, msg.asRaw());

    try {
      await env.BOOKING_MAIL.send(message);
    } catch (e) {
      return new Response(`Mail error: ${e.message}`, { status: 500, headers: cors });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
```

### Why this is safe without a secret key
- There **is no API key** — the Worker authenticates to Email Routing via the binding, which only exists inside the Cloudflare runtime.
- The binding is locked to `destination_address = "vasil@gmail.com"`, so even someone POSTing directly to the Worker URL cannot redirect mail elsewhere.
- CORS allow-list + honeypot + required fields keep casual spam low. For heavier protection add Cloudflare Turnstile (free captcha) in step 7.

---

## Step 5 — Deploy the Worker

```bash
npx wrangler login           # one-time, opens browser
npx wrangler deploy
```

You'll get a URL like:
```
https://andwhosaid-mailer.<your-cf-subdomain>.workers.dev
```

Copy it — the site will POST to this URL.

> First deploy will ask Cloudflare to provision the `send_email` binding. If it complains that the destination isn't verified, revisit Step 1.4.

---

## Step 6 — Wire the Booking form to the Worker

In `src/sections/Booking/Booking.tsx`, add a Worker URL constant and replace the `onSubmit`:

```tsx
const WORKER_URL = "https://andwhosaid-mailer.<your-cf-subdomain>.workers.dev";

const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const fd = new FormData(form);
  const payload = {
    name: fd.get("name"),
    phone: fd.get("phone"),
    email: fd.get("email"),
    date: fd.get("date"),
    guests: fd.get("guests"),
    services: selected,            // existing state from the checkboxes
    details: fd.get("details"),
    website: fd.get("website"),    // honeypot
  };

  setStatus("sending");
  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    setStatus("sent");
    form.reset();
    setSelected([]);
  } catch {
    setStatus("error");
  }
};
```

Make sure each input has a matching `name` attribute (`name`, `phone`, `email`, `date`, `guests`, `details`), and add a hidden honeypot field:

```tsx
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  style={{ position: "absolute", left: "-9999px" }}
  aria-hidden="true"
/>
```

Show `status` under the submit button: "Изпращане…", "Благодарим, получихме запитването ти!", or "Нещо се обърка, опитай отново или ни звънни."

---

## Step 7 — (Optional) Add Turnstile captcha

If spam becomes a problem:

1. Cloudflare dashboard → **Turnstile** → create a site → copy the site key + secret.
2. Frontend: render `<div class="cf-turnstile" data-sitekey="...">` above the submit button (load their script). The widget injects a `cf-turnstile-response` token into the form.
3. Worker: add the token to the payload, then before sending mail, `fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { ... })` with the secret (store it via `wrangler secret put TURNSTILE_SECRET`). Reject on failure.

---

## Step 8 — Test end-to-end

1. `npx wrangler dev` — local worker at `http://localhost:8787`. Temporarily point `WORKER_URL` there.
2. Submit the form from `npm run dev` on `localhost:5173`. Local `wrangler dev` actually calls out to Cloudflare for the email binding, so real mail will arrive.
3. Check your personal inbox. Also check spam folder the first time — once you mark it "Not spam" Gmail/Outlook learn.
4. Flip `WORKER_URL` back to the deployed `*.workers.dev` URL and push the site.

---

## Limits & things to know

- **Free Workers plan:** 100,000 requests/day — plenty for a contact form.
- **Email Routing sending:** no documented hard cap for the `send_email` binding, but it's meant for transactional volumes (replies, notifications, form mail), not newsletters. You'll be fine with dozens per day; don't try to send thousands.
- **Sender domain:** the `From:` address must be on a zone in your Cloudflare account that has Email Routing enabled. You **cannot** send as `@gmail.com` or any domain you don't own.
- **Recipient domain:** the destination address must be verified in Email Routing. You can't use the Worker to spam arbitrary addresses — this is by design and is exactly what keeps it free and key-less.
- **DNS:** Cloudflare sets up SPF/DKIM for Email Routing automatically. Don't overwrite those records.
- **Cold starts:** Workers start in <5ms; the form submission will feel instant.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `send_email: destination address not verified` | Verification link not clicked | Re-send from Email Routing → Destination addresses |
| `send_email: sender not allowed` | `From:` uses a domain not in your CF account | Use an address ending in your own zone |
| `CORS error` in browser | Site origin not in `ALLOWED_ORIGINS` | Add it and redeploy the Worker |
| Mail lands in spam | First-time sender reputation | Mark as "Not spam" once; Cloudflare's SPF/DKIM are already correct |
| `wrangler deploy` says binding unknown | Old wrangler | `npm i -g wrangler@latest` |

---

## Sources

- [Cloudflare docs — Send emails from Workers](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/)
- [Cloudflare docs — Email Workers overview](https://developers.cloudflare.com/email-routing/email-workers/)
- [Cloudflare docs — Local development for Email Workers](https://developers.cloudflare.com/email-routing/email-workers/local-development/)
- [jldec — Routing emails through a Cloudflare Worker](https://jldec.me/blog/routing-emails-through-a-cloudflare-worker)
- [jldec/my-email-worker — reference repo](https://github.com/jldec/my-email-worker)
