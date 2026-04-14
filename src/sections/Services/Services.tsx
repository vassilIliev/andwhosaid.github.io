import styles from './Services.module.css';

const BASE = import.meta.env.BASE_URL;

type Theme = 'light' | 'green' | 'dark' | 'pink';

type Card = {
  id: string;
  theme: Theme;
  accent: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href?: string;
  learnMore?: boolean;
};

const cards: Card[] = [
  {
    id: 'cocktails',
    theme: 'light',
    accent: 'страхотно',
    title: 'Коктейлно Меню',
    body: 'Подходящо за всеки вкус и настроение.',
    image: 'chasha.png',
    imageAlt: 'Коктейлна чаша',
  },
  {
    id: 'kitchen',
    theme: 'green',
    accent: 'кухня',
    title: 'Да Си Оближеш Пръстите',
    body: 'Защото сладко след сладко не е завършек.',
    image: 'tigan.png',
    imageAlt: 'Тиган',
  },
  {
    id: 'dj',
    theme: 'dark',
    accent: 'музика',
    title: 'DJ, Който Да Те Разцепи',
    body: 'Така ден трябва да звучи — много, много, много.',
    image: 'dj.png',
    imageAlt: 'DJ плоча',
  },
  {
    id: 'decor',
    theme: 'pink',
    accent: 'атмосфера',
    title: 'Декорация',
    body: 'Нека залата да изглежда толкова специално, колкото фантазията ти може да измисли.',
    image: 'балон.png',
    imageAlt: 'Балон',
  },
  {
    id: 'photographer',
    theme: 'pink',
    accent: 'спомени',
    title: 'Фотограф',
    body: 'Твоят най-добър профил, твоят най-добър кадър, всички заснети от Георги Сиркатов.',
    image: 'camera.png',
    imageAlt: 'Фотоапарат',
    href: '#/photographer',
    learnMore: true,
  },
  {
    id: 'videographer',
    theme: 'dark',
    accent: 'видео',
    title: 'Видеограф',
    body: 'Тази история трябва да е преживяна и показана за поколения след.',
    image: 'video.png',
    imageAlt: 'Видео',
    href: '#/videographer',
    learnMore: true,
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <span className={styles.badge}>Услуги</span>
          <p className={styles.tagline}>
            Услугите, които биха направили твоят ден специален и незабравим.
          </p>
        </header>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article
              key={card.id}
              className={`${styles.card} ${styles[`theme_${card.theme}`]}`}
            >
              <p className={styles.accent}>{card.accent}</p>
              <h3 className={styles.title}>
                <span className={styles.titleLabel}>{card.title}</span>
              </h3>
              <p className={styles.body}>{card.body}</p>
              {card.learnMore && (
                <a href={card.href} className={styles.learnMore}>
                  <span className={styles.learnMoreIcon} aria-hidden="true">↗</span>
                  Научи повече
                </a>
              )}
              <img
                src={`${BASE}assets/picture-assets/${card.image}`}
                alt={card.imageAlt}
                className={styles.cardImage}
                loading="lazy"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
