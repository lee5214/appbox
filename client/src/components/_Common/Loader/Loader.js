import React from 'react'
import styles from './Loader.scss'
export default function Loader (){
	return(
		<div className={styles["preloader-1"]}>
			<div>Loading</div>
			<span className={styles.line} />
			<span className={`${styles.line},${styles.line2}`} />
			<span className={`${styles.line},${styles.line3}`} />
			<span className={`${styles.line},${styles.line4}`} />
			<span className={`${styles.line},${styles.line5}`} />
			<span className={`${styles.line},${styles.line6}`} />
			<span className={`${styles.line},${styles.line7}`} />
			<span className={`${styles.line},${styles.line8}`} />
			<span className={`${styles.line},${styles.line9}`} />
		</div>
	)
}
