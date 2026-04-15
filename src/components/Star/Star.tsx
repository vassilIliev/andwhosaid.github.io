import type React from 'react';
import styles from './Star.module.css';

const BASE = import.meta.env.BASE_URL;

type Props = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  rotate?: number;
};

export default function Star({ top, left, right, bottom, size = 36, rotate = 0 }: Props) {
  return (
    <img
      src={`${BASE}assets/picture-assets/star-yellow.svg`}
      alt=""
      aria-hidden="true"
      className={styles.star}
      style={
        {
          top,
          left,
          right,
          bottom,
          '--star-size': `${size}px`,
          transform: `rotate(${rotate}deg)`,
        } as React.CSSProperties
      }
    />
  );
}
