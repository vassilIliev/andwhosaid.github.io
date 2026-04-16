import { useRef, useState } from 'react';
import styles from './LazyImage.module.css';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

export default function LazyImage({ wrapperClassName, className, onLoad, ...rest }: Props) {
  const [ready, setReady] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (!img) { setReady(true); onLoad?.(e); return; }

    img.decode().then(() => {
      setReady(true);
      onLoad?.(e);
    }).catch(() => {
      setReady(true);
      onLoad?.(e);
    });
  };

  return (
    <div className={`${styles.wrap} ${wrapperClassName ?? ''}`}>
      {!ready && (
        <div className={styles.loader} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      )}
      <img
        ref={imgRef}
        {...rest}
        className={`${className ?? ''} ${ready ? styles.visible : styles.hidden}`}
        onLoad={handleLoad}
      />
    </div>
  );
}
