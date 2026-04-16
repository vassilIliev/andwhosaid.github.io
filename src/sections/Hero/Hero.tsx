import { useState, useRef, useEffect } from 'react';
import Star from '../../components/Star/Star';
import styles from './Hero.module.css';

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<'loading' | 'playing' | 'failed'>('loading');

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onPlaying = () => setVideoState('playing');
    const onError = () => setVideoState('failed');
    const onStalled = () => {
      setTimeout(() => {
        if (vid.readyState < 3) setVideoState('failed');
      }, 8000);
    };

    vid.addEventListener('playing', onPlaying);
    vid.addEventListener('error', onError);
    vid.addEventListener('stalled', onStalled);

    const timeout = setTimeout(() => {
      if (vid.readyState < 3) setVideoState('failed');
    }, 12000);

    return () => {
      vid.removeEventListener('playing', onPlaying);
      vid.removeEventListener('error', onError);
      vid.removeEventListener('stalled', onStalled);
      clearTimeout(timeout);
    };
  }, []);

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

          {videoState === 'loading' && (
            <div className={styles.videoLoader} aria-hidden="true">
              <span className={styles.loaderDot} />
              <span className={styles.loaderDot} />
              <span className={styles.loaderDot} />
            </div>
          )}

          {videoState === 'failed' && (
            <img
              src={`${BASE}assets/picture-assets/hero-youth-blob.png`}
              alt="YOUTH"
              className={styles.visualImg}
            />
          )}

          <video
            ref={videoRef}
            className={`${styles.visualVideo} ${videoState === 'playing' ? styles.videoVisible : styles.videoHidden}`}
            src={`${BASE}assets/hero_video.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
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
