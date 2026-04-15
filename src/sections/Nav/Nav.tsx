import { useState, useEffect } from 'react';
import type React from 'react';
import styles from './Nav.module.css';

const BASE = import.meta.env.BASE_URL;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const scrollToId = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    close();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          <a href="#services" onClick={scrollToId('services')}>Услуги</a>
          <a href="#about" onClick={scrollToId('about')}>За нас</a>
          <a href="#contact" onClick={scrollToId('contact')}>Контакти</a>
        </nav>

        <a href="#contact" className={styles.cta} onClick={scrollToId('contact')}>
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
          <a href="#services" onClick={scrollToId('services')}>Услуги</a>
          <a href="#about" onClick={scrollToId('about')}>За нас</a>
          <a href="#contact" onClick={scrollToId('contact')}>Контакти</a>
          <a href="#contact" className={styles.drawerCta} onClick={scrollToId('contact')}>
            Направи запитване
          </a>
        </nav>
      </div>
    </header>
  );
}
