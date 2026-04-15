import { useEffect, useState } from 'react';
import Star from '../../components/Star/Star';
import styles from './Booking.module.css';

const services = ['Кухня', 'DJ', 'Декорация', 'Фотограф', 'Видеограф'] as const;
const guestRanges = ['до 50', '50 – 100', '100 – 150', '150 – 200', '200+'];
const WORKER_URL = 'https://andwhosaid-mailer.vassil-iliev-97.workers.dev'

const todayIso = () => new Date().toISOString().slice(0, 10);
const COOLDOWN_SECONDS = 5;

export default function Booking() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [servicesError, setServicesError] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(id);
  }, [cooldown]);

  const toggle = (svc: string) => {
    setSelected((prev) => {
      const next = prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc];
      if (next.length > 0) setServicesError(false);
      return next;
    });
  };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (cooldown > 0 || status === 'sending') return;
      const form = e.currentTarget;

      if (selected.length === 0) {
        setServicesError(true);
        return;
      }

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
        setCooldown(COOLDOWN_SECONDS);
        form.reset();
        setSelected([]);
      } catch {
        setStatus("error");
        setCooldown(COOLDOWN_SECONDS);
      }
    };
  return (
    <section className={styles.booking} id="contact">
      <div className={styles.bgDots} aria-hidden="true" />
      <Star top="4%" left="3%" size={58} rotate={-10} />
      <Star top="2%" right="6%" size={26} rotate={8} />
      <Star bottom="6%" right="3%" size={42} rotate={-14} />

      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.badge}>Направи Запитване Сега!</span>
          <p className={styles.tagline}>
            Направи запитване за дата, час и налични места, а ние ще се
            погрижим да ти върнем отговор в най-кратък срок.
          </p>
        </header>

        <form className={styles.card} onSubmit={onSubmit}>
          <div className={styles.left}>
            <label className={styles.field}>
              <span className={styles.label}>Име и Фамилия</span>
              <input
                type="text"
                name="name"
                placeholder="Name and Surname"
                required
                maxLength={50}
                minLength={2}
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Телефон</span>
              <input
                type="tel"
                name="phone"
                placeholder="+359xxxxxxxx"
                required
                maxLength={20}
                pattern="\+?[0-9\s\-]{6,20}"
                title="Само цифри и знак +, до 20 символа"
                inputMode="tel"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Мейл</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Дата на бала</span>
              <input
                type="date"
                name="date"
                required
                min={todayIso()}
                className={styles.input}
              />
            </label>

            <label className={styles.consent}>
              <input
                type="checkbox"
                name="consent"
                required
                className={styles.checkbox}
              />
              <span>
                * Съгласявам се предоставените от мен лични данни (име, телефон
                и имейл) да бъдат използвани единствено с цел осъществяване на
                контакт във връзка с моето запитване и изготвяне на персонална
                оферта.
              </span>
            </label>

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className={styles.honeypot}
            />

            <button
              type="submit"
              className={styles.submit}
              disabled={status === 'sending' || cooldown > 0}
            >
              {status === 'sending'
                ? 'ИЗПРАЩАНЕ…'
                : cooldown > 0
                ? `ИЗЧАКАЙ ${cooldown}s`
                : 'НАПРАВИ ЗАПИТВАНЕ'}
            </button>

            {status === 'sent' && (
              <p className={styles.statusOk}>
                Благодарим! Получихме запитването ти и ще се свържем скоро. Можете и да звъннете на телефон - 0885449203.
              </p>
            )}
            {status === 'error' && (
              <p className={styles.statusErr}>
                Нещо се обърка. Опитай отново или ни звънни директно - 0885449203.
              </p>
            )}
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.right}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>
                Избери всички услуги, които би искал да включиш в своя
                празничен ден:
              </legend>
              <div className={styles.checkList}>
                {services.map((svc) => (
                  <label key={svc} className={styles.checkRow}>
                    <input
                      type="checkbox"
                      name="services"
                      value={svc}
                      checked={selected.includes(svc)}
                      onChange={() => toggle(svc)}
                      className={styles.checkbox}
                    />
                    <span>{svc}</span>
                  </label>
                ))}
              </div>
              {servicesError && (
                <p className={styles.fieldError}>
                  Избери поне една услуга.
                </p>
              )}
            </fieldset>

            <label className={styles.field}>
              <span className={styles.label}>
                Колко хора предвиждаш да поканиш?
              </span>
              <select name="guests" required className={styles.input} defaultValue="">
                <option value="" disabled>
                  Избери диапазон
                </option>
                {guestRanges.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Допълнителни детайли</span>
              <textarea
                name="details"
                placeholder="Additional details"
                rows={4}
                className={`${styles.input} ${styles.textarea}`}
              />
            </label>
          </div>
        </form>
      </div>
    </section>
  );
}
