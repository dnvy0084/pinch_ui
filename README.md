# pinch_ui
핀치 UI 구현

```javascript

const samples = [
  ['CCBDE', 'AAADE', 'AAABF', 'CCBBF'],
  ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ'],
];

function head(a) {
  if(!(a instanceof Array)) return null;
  
  return a[0];
}

function curry(f) {
	return function (...rest) {
		if(rest.length >= f.length) 
			return f(...rest);

		return curry(f.bind(null, ...rest));
	}
}

function _curry(f) {
	return function anonymous(...args) {
		return function(...rest) {
			if(f.length >= args.length + rest.length) 
				return f(...args, ...rest);

			return anonymous(...args, ...rest);
		}
	}

	return anonymous();
}

const tap = curry(
	function(f, e) {
		f(e);
		return e;
	}
);

function scan(map) {
	const width = head(map).length
		, height = map.length;

	toString(map);

	let a = [];

	for(let i = 0; i < height - 1; i++) {
		for(let j = 0; j < width - 1; j++) {
			a = a.concat(varifyBlock(map, j, i));	
		}
	}

	console.log(a);

	a.forEach(([x, y]) => replaceAt(map[y], x, ' '));

	toString(map);
}

function deleteBlock(map, [x, y]) {
	const targets = [
		[x, y],
		[x + 1, y],
		[x, y + 1],
		[x + 1, y + 1]
	];

	targets.forEach(([x, y]) => map[y] = replaceAt(map[y], x, ' '));
} 

function replaceAt(str, i, chars) {
	return str.slice(0, i) + chars + str.slice(i + 1);
}

function varifyBlock(map, x, y) {
	const block = map[y][x];

	if(block == ' ') return [];

	const targets = [
			[x + 1, y],
			[x, y + 1],
			[x + 1, y + 1]
		],
		matchAll = targets
			.every(([x, y]) => map[y][x] == block);

	if(!matchAll) return [];

	return [[x, y]];
}

function toString(map) {
	const str = map.map(s => s.match(/./g).join(' '))
		.join('\n');

	console.log(str);
}

samples.forEach(scan);
```
