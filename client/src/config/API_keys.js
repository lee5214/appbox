import prodKeys from './prodKeys';
import devKeys from './devKeys';

let keys;

if (process.env.NODE_ENV === 'production') {
	keys = prodKeys;
} else {
	keys = devKeys;
}

export default keys;
