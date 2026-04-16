import { useRef } from 'react';
import Star from '../../components/Star/Star';
import styles from './BioPage.module.css';

const BASE = import.meta.env.BASE_URL;

type GalleryItem = { src: string; alt: string };

type Props = {
  badge: string;
  tagline: string;
  paragraphs: string[];
  quote: string;
  portrait: { src: string; alt: string };
  gallery?: GalleryItem[];
  galleryAspect?: 'portrait' | 'landscape';
  showDotGrid?: boolean;
  darkStars?: boolean;
};

export default function BioPage({
  badge,
  tagline,
  paragraphs,
  quote,
  portrait,
  gallery,
  galleryAspect = 'portrait',
  showDotGrid,
  darkStars,
}: Props) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.8, 400);
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <section className={styles.bio}>
      {showDotGrid && <div className={styles.dotGrid} aria-hidden="true" />}

      <Star top="3%" left="4%" size={52} rotate={-12} dark={darkStars} />
      <Star top="8%" right="6%" size={28} rotate={14} dark={darkStars} />
      <Star top="18%" left="48%" size={20} rotate={-8} dark={darkStars} />
      <Star top="32%" right="3%" size={44} rotate={6} dark={darkStars} />
      <Star top="45%" left="2%" size={34} rotate={-18} dark={darkStars} />
      <Star top="60%" right="8%" size={24} rotate={12} dark={darkStars} />
      <Star bottom="12%" left="6%" size={40} rotate={-10} dark={darkStars} />
      <Star bottom="4%" right="5%" size={30} rotate={16} dark={darkStars} />

      <div className={styles.inner}>
        <a href="#/" className={styles.back}>
          <span aria-hidden="true">←</span> Назад
        </a>

        <div className={styles.hero}>
          <div className={styles.portraitWrap}>
            <img
              src={`${BASE}${portrait.src}`}
              alt={portrait.alt}
              className={styles.portrait}
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className={styles.copy}>
            <span className={styles.badge}>{badge}</span>
            <p className={styles.tagline}>{tagline}</p>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>
                {p}
              </p>
            ))}
            <blockquote className={styles.quote}>{quote}</blockquote>
            <a href="#/contact" className={styles.cta}>
              НАПРАВИ ЗАПИТВАНЕ
            </a>
          </div>
        </div>
      </div>

      {gallery && gallery.length > 0 && (
        <div className={styles.galleryWrap}>
          <div className={styles.galleryHeader}>
            <h2 className={styles.galleryTitle}>Портфолио</h2>
            <div className={styles.galleryNav}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollBy(-1)}
                aria-label="Предишни снимки"
              >
                ←
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollBy(1)}
                aria-label="Следващи снимки"
              >
                →
              </button>
            </div>
          </div>
          <div className={styles.galleryRail} ref={railRef}>
            {gallery.map((item, i) => (
              <figure
                key={item.src}
                className={`${styles.galleryItem} ${
                  galleryAspect === 'landscape'
                    ? styles.galleryItemLandscape
                    : ''
                } ${i % 2 === 1 ? styles.galleryItemDown : ''}`}
              >
                <img
                  src={`${BASE}${item.src}`}
                  alt={item.alt}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
