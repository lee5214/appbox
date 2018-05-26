import { TweenMax } from 'gsap';

export const startAnimation = (ele) => {
	TweenMax.to (ele, 1, {
		opacity : 1,
		stroke : 'red',
		x : -100,
		y : -100,
	});
};
