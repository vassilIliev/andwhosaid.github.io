import Star from '../../components/Star/Star';
import styles from './Hero.module.css';

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.bgDotsTopLeft} aria-hidden="true" />
      <div className={styles.bgDotsBottomRight} aria-hidden="true" />
      <img
        src={`${BASE}assets/picture-assets/squiggle-yellow.svg`}
        alt=""
        className={styles.squiggle}
        aria-hidden="true"
      />
      <Star top="14%" right="2%" size={140} rotate={-12} />
      <Star top="8%" left="46%" size={22} rotate={14} />
      <Star bottom="18%" left="2%" size={64} rotate={8} />
      <Star bottom="6%" right="14%" size={28} rotate={-6} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.wordmarkWrap}>
          <img
            src={`${BASE}assets/picture-assets/Untitled-2.png`}
            alt="КОЙ КАЗА?!"
            className={styles.wordmark}
          />
        </div>

        <div className={styles.visual}>
          <div className={styles.dotGrid} aria-hidden="true" />
          <img
            src={`${BASE}assets/picture-assets/hero-youth-blob.png`}
            alt=""
            className={styles.visualImg}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className={styles.copy}>
          <p className={styles.lede}>
            А ти намери ли място, където да събереш приятели и роднини за своя
            празник? Направи този ден незабравим, а ние ще ти помогнем да
            организираш всичко.
          </p>
          <a href="#contact" className={styles.cta}>
            НАПРАВИ ЗАПИТВАНЕ
          </a>
        </div>
      </div>
    </section>
  );
}
