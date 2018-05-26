import React from 'react';
import styles from './Loader.scss';

export default function Loader () {
	return (
		<div className={ styles.loaderContainer }>
			<div className={ styles.preloader }>
				{ /*<div>Loading</div>*/ }
				<span className={ styles.line1 }/>
				<span className={ styles.line2 }/>
				<span className={ styles.line3 }/>
				<span className={ styles.line4 }/>
				<span className={ styles.line5 }/>
				<span className={ styles.line6 }/>
				<span className={ styles.line7 }/>
				<span className={ styles.line8 }/>
				<span className={ styles.line9 }/>
			</div>
		</div>
	);
}
