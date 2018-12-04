export const ObjectsMatch = (item1: object, item2: object) => {
	const keys1 = Object.keys(item1);
	const keys2 = Object.keys(item2);
	for (const key1 of keys1) {
		if (keys2.indexOf(key1) < 0) {
			return false;
		}
		if (typeof item1[key1] !== typeof item2[key1]) {
			return false;
		}
		if (item1[key1] instanceof Array) {
			if (!ArraysMatch(item1[key1], item2[key1])) {
				return false;
			}
		} else if (typeof item1[key1] === 'object') {
			if (!ObjectsMatch(item1[key1], item2[key1])) {
				return false;
			}
		} else {
			if (item1[key1] === item2[key1]) {
				return false;
			}
		}
	}
	return true;
};

export const areSimilar = (
	thing1: any[] | object,
	thing2: any[] | object
): boolean => {
	if (thing1 instanceof Array && thing2 instanceof Array)
		return ArraysMatch(thing1, thing2);
	if (typeof thing1 === 'object' && typeof thing2 === 'object')
		return ObjectsMatch(thing1, thing2);
	return false;
};

export const ArraysMatch = (
	array1: (string | object | any[] | any)[],
	array2: (string | object | any[] | any)[]
): boolean => {
	if (array1.length != array2.length) {
	}
	for (const item1 of array1) {
		if (item1 instanceof Array) {
			let found = false;

			for (const item2 of array2) {
				if (ArraysMatch(item1, item2)) found = true;
			}
			if (!found) {
				return false;
			}
		} else if (typeof item1 === 'object') {
			let found = false;
			for (const item2 of array2) {
				if (ObjectsMatch(item1, item2)) {
					found = true;
				}
			}
			if (!found) {
				return false;
			}
		} else {
			if (array2.indexOf(item1) < 0) {
				return false;
			}
		}
	}
	return true;
};
