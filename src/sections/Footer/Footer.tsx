import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>И КОЙ КАЗА?!</p>

        <div className={styles.row}>
          <div className={styles.block}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className={styles.text}>
              <span className={styles.label}>ADDRESS</span>
              <span className={styles.value}>
                Sofia, Bulgaria, str. Shipka 1
              </span>
            </div>
          </div>

          <div className={styles.block}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div className={styles.text}>
              <span className={styles.label}>PHONE</span>
              <a href="tel:+359885449203" className={styles.value}>
                +359 885 449 203
              </a>
            </div>
          </div>

          <p className={styles.copyright}>
            © 2026 ИКойКаза. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
