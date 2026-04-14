import styles from './Location.module.css';

const BASE = import.meta.env.BASE_URL;

export default function Location() {
  return (
    <section className={styles.location} id="about">
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <span className={styles.badge}>Локация? Локация. Локация!</span>
          <a href="#contact" className={styles.headerLink}>
            NOMO del Arte
          </a>
        </header>

        <div className={styles.card}>
          <img
            src={`${BASE}assets/location/cathedral-blob.png`}
            alt="Храм-паметник Свети Александър Невски, София"
            className={styles.image}
            loading="lazy"
          />

          <div className={styles.content}>
            <div className={styles.rail} aria-hidden="true">
              <span className={styles.diamond} />
            </div>

            <div className={styles.column}>
              <div className={styles.block}>
                <p className={styles.paragraph}>
                  Разположено на броени метри от храм-паметник „Свети Александър
                  Невски“, нашето заведение NOMO del Arte ти дава уникалната
                  възможност да посрещнеш твоя специален ден с близки и приятели
                  в непосредствена близост до сборната локация на всички
                  завършващи.
                </p>
                <a
                  href="#contact"
                  className={`${styles.inlineLink} ${styles.linkPink}`}
                >
                  NOMO del Arte — гр. София, ул. Шипка 1{' '}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className={styles.block}>
                <p className={styles.paragraph}>
                  Покани всички гости, с които искаш да споделиш своя ден —
                  заведението има достатъчна вместимост. Високи маси, ниски
                  маси, сепарета, зона за снимки — не се притеснявай, всички
                  могат да дойдат.
                </p>
                <a
                  href="#contact"
                  className={`${styles.inlineLink} ${styles.linkYellow}`}
                >
                  Над 150 места
                </a>
              </div>
            </div>
          </div>

          <div className={styles.verticalMark} aria-hidden="true">
            NOMO
          </div>

          <div className={styles.dotGrid} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
