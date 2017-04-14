# webpack-addons-demo


## Part 1 

Let's define our skeleton. In order for the CLI to find our options, we've got to define some properties in the constructor first.

[`generator.js`](https://github.com/ev1stensberg/webpack-addons-demo/blob/Part-1/generator.js)

```js
const Generator = require('yeoman-generator');

module.exports = class WebpackGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);
		opts.env.configuration = {
			dev: {}
		}
	}
};
```
