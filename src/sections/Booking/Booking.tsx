import { useState } from 'react';
import Star from '../../components/Star/Star';
import styles from './Booking.module.css';

const services = ['Кухня', 'DJ', 'Декорация', 'Фотограф', 'Видеограф'] as const;
const guestRanges = ['до 50', '50 – 100', '100 – 150', '150 – 200', '200+'];

export default function Booking() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (svc: string) =>
    setSelected((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc],
    );

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

        <form className={styles.card} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.left}>
            <label className={styles.field}>
              <span className={styles.label}>Име и Фамилия</span>
              <input
                type="text"
                name="name"
                placeholder="Name and Surname"
                required
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

            <button type="submit" className={styles.submit}>
              НАПРАВИ ЗАПИТВАНЕ
            </button>
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
            </fieldset>

            <label className={styles.field}>
              <span className={styles.label}>
                Колко хора предвиждаш да поканиш?
              </span>
              <select name="guests" className={styles.input} defaultValue="">
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
