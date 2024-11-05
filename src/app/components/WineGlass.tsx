import React from 'react';
import styles from './wineglass.module.scss';

function WineGlass({ color }: { color: string }) {

  let colorCode;

  switch (color.toLowerCase()) {
    case 'red':
      colorCode = '#80091b';
      break
    case 'white':
      colorCode = '#F9E8C0';
      break
    case 'rosé':
      colorCode = '#FAC2BF';
      break
  }

  return (
    <div className={styles.wineGlass}>
      <div className={`${styles.circle} ${styles.top}`}></div>
      <div className={`${styles.circle} ${styles.middle}`} style={{ backgroundColor: colorCode }}></div>
      <div className={`${styles.line}`}></div>
      <div className={`${styles.circle} ${styles.bottom}`}></div>
    </div>
  )
}

export default WineGlass