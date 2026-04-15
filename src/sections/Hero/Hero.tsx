import Star from '../../components/Star/Star';
import styles from './Hero.module.css';

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <img
        src={`${BASE}assets/picture-assets/squiggle-yellow.svg`}
        alt=""
        className={styles.squiggle}
        aria-hidden="true"
      />
      <Star top="18%" right="-4%" size={180} rotate={-12} />
      <Star bottom="0%" left="0.5%" size={76} rotate={8} />

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
