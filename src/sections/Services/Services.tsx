import Star from '../../components/Star/Star';
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
  whitePill?: boolean;
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
    theme: 'pink',
    accent: 'кухня',
    title: 'Да Си Оближеш Пръстите',
    body: 'Защото гладна мечка, училище не завършва.',
    image: 'tigan.png',
    imageAlt: 'Тиган',
  },
  {
    id: 'dj',
    theme: 'dark',
    accent: 'музика',
    title: 'DJ, Който Да Те Разцепи От Танци',
    body: 'Така ден трябва да звучи — много, много, много… много добре.',
    image: 'dj.png',
    imageAlt: 'DJ плоча',
  },
  {
    id: 'decor',
    theme: 'light',
    accent: 'атмосфера',
    title: 'Декорация',
    body: 'Нека твоят ден изглежда толкова специално, колкото фантазията ти може да измисли.',
    image: 'балон.png',
    imageAlt: 'Балон',
  },
  {
    id: 'photographer',
    theme: 'light',
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
    theme: 'pink',
    accent: 'видео',
    title: 'Видеограф',
    body: 'Тази история трябва да е преживяна и показана за поколения след.',
    image: 'video.png',
    imageAlt: 'Видео',
    href: '#/videographer',
    learnMore: true,
    whitePill: true,
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <Star top="3%" left="3%" size={52} rotate={-15} />
      <Star top="22%" right="4%" size={34} rotate={10} />
      <Star top="48%" left="48%" size={22} rotate={12} />
      <Star top="66%" right="5%" size={44} rotate={-5} />
      <Star bottom="4%" left="4%" size={70} rotate={-18} />
      <div className={`${styles.dotGridLarge}`} aria-hidden="true" />
      <div className={`${styles.dotGridSmall}`} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.badge}>От Какво Има Нужда Един Бал?</span>
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
                <span
                  className={`${styles.titleLabel} ${card.whitePill ? styles.titleLabelWhite : ''}`}
                >
                  {card.title}
                </span>
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
                className={`${styles.cardImage} ${styles[`cardImage_${card.id}`] ?? ''}`}
                loading="lazy"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
