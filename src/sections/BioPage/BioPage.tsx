import { useRef } from 'react';
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
            <a href="#contact" className={styles.cta}>
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
