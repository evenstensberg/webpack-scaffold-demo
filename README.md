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

As you can see, the `configuration` object has to have one property you name, it can be anything. A good practise is to name the underlying property with the name you want to give your `webpack.config.js` file, to better indicate what values each file has.

## PART 1-A

In order for us to interact with the users, we make good use of the [`prompting`]() method yeoman has. In this method we can get various of answers from the user, like asking for entry points or plugins. You can either manually create each object representing a question, or you can make good use of our utilities from [`webpack-addons`](). I'm in a good mood today, so I'm going to build a configuration if the user chooses `Pengwings`.


```js
const Generator = require('yeoman-generator');
const List = require('webpack-addons').List;

module.exports = class WebpackGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);
		opts.env.configuration = {
			dev: {}
		};
	}

	prompting() {
		return this.prompt([
			List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings'])
		]).then (answer => {
			if(answer['confirm'] === 'Pengwings') {

			}
		});
	}
};
```

## PART 1-B

So far, we've made an interaction with the user. If you were coding along, great! So how do we proceed from here? Let's try to build a simple webpack config that has an entry point, an output, and a context property. For this, we need to create a `webpackOptions` property on our `dev` object. This is where `entry`, `output` and `context` is gonna be hooked up, later resulting in a `webpack.config.js`.

##### Hint: Define the `webpackOptions` property in the constructor to make your addon as most clean as possible!

```js
const Generator = require('yeoman-generator');
const List = require('webpack-addons').List;

module.exports = class WebpackGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);
		opts.env.configuration = {
			dev: {
				webpackOptions: {}
			}
		};
	}

	prompting() {
		return this.prompt([
			List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings'])
		]).then (answer => {
			if(answer['confirm'] === 'Pengwings') {

			}
		});
	}
};
```
