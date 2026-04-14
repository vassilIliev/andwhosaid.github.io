import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

const BASE = import.meta.env.BASE_URL;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="&WhoSaid — начало" onClick={close}>
          <img
            src={`${BASE}assets/picture-assets/12! logo.png`}
            alt=""
            className={styles.logo}
            width={92}
            height={61}
          />
          <span className={styles.brandText}>И КОЙ КАЗА?!</span>
        </a>

        <nav className={styles.menu} aria-label="Главна навигация">
          <a href="#services">Услуги</a>
          <a href="#about">За нас</a>
          <a href="#contact">Контакти</a>
        </nav>

        <a href="#contact" className={styles.cta}>
          Направи запитване
        </a>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Затвори меню' : 'Отвори меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.burgerLine} ${open ? styles.burgerLineOpen1 : ''}`} />
          <span className={`${styles.burgerLine} ${open ? styles.burgerLineOpen2 : ''}`} />
          <span className={`${styles.burgerLine} ${open ? styles.burgerLineOpen3 : ''}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        aria-hidden={!open}
      >
        <nav aria-label="Мобилна навигация">
          <a href="#services" onClick={close}>Услуги</a>
          <a href="#about" onClick={close}>За нас</a>
          <a href="#contact" onClick={close}>Контакти</a>
          <a href="#contact" className={styles.drawerCta} onClick={close}>
            Направи запитване
          </a>
        </nav>
      </div>
    </header>
  );
}
