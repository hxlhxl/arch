URL中有一些字符是不可以出现的，所以必须使用某种编码策略代替它，这些字符包括" ", "<", ">",...等，编码方式就是使用其ASCII的HEX表示，并在其前面加上`%`,比如空格HEX是20，则表示为`%20`，"+"HEX是2B，则表示为`%2b`.
URL中的query部分是可以使用空格的，这个一般被`+`(`%2B`)代替。


# API

- parse(string, [options])
Parse a query string into an object. Leading ? or # are ignored, so you can pass location.search or location.hash directly.

```
function parse(input, options) {
	options = Object.assign({decode: true, arrayFormat: 'none'}, options);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = param.replace(/\+/g, ' ').split('=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : decode(value, options);

		formatter(decode(key, options), value, ret);
	}

	return Object.keys(ret).sort().reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

```

- 
