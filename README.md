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

## Part 2-A

Congrats, you've now created the base of an `webpack-addon`! Let's add some stuff to our future configuration file!
I'm going to follow good convention, and extract my config into another file, named `dev-config.js`. As this is just regular JavaScript, we can make the module a function, and supply our entry as a parameter for us to build up a configuration file from.

[`dev-config.js`]()

```js
module.exports = function createDevConfig(answer) {
	let devConfig = {};
};
```

[`generator.js`]()

```js
const Generator = require('yeoman-generator');
const List = require('webpack-addons').List;
const createDevConfig = require('./dev-config');

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
				this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
			}
		});
	}
};
```

Sweet! We've now abstracted some part of the code that's probably gonna be really big. We can almost call ourselves engineers now! Let's go ahead and add another question, like asking for an entry point.

```js
const Generator = require('yeoman-generator');
const List = require('webpack-addons').List;
const Input = require('webpack-addons').Input;
const createDevConfig = require('./dev-config');

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
			List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings']),
			Input('entry', 'What is the entry point in your app?')
		]).then (answer => {
			if(answer['confirm'] === 'Pengwings') {
				this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
			}
		});
	}
};
```

These answers aren't well known on their own for us, so let's go ahead and create our config.

## Part 3-A

Let's start by looking at `dev-config.js`. We have some answers, now we want to use them to build up an config. How do we do that? Evidently, we should mount our values on the variable we've declared, with some properties we want to build up. We also want to use the answers for the entry prop. I've also taken the liberty to add an output property that has a `filename`.

##### Important: With string values, you need to wrap your strings once again. This is because we can declare some other functionality, using only " ", while " 'Mystring' " resolves to a string.

[`dev-config.js`]()

```js
module.exports = function createDevConfig(answer) {
	let entryProp = answer.entry ? ( "'" + answer.entry + "'") : "'index.js'";
	let devConfig = {
		entry: entryProp,
		output: {
			filename: "'[name].js'"
		}
	};
	return devConfig;
};

```

Try running `webpack --init webpack-addons-demo`, and now you're seeing your first scaffold!

## Part 3-B

Cool. Now we've got an initial scaffold. Let's add the rest of our options! For the context, let's say we've got a `path.join` we want to make use of. For this, you use a single quote string.

```js
module.exports = function createDevConfig(answer) {
	let entryProp = answer.entry ? ( "'" + answer.entry + "'") : "'index.js'";
	let devConfig = {
		entry: entryProp,
		output: {
			filename: "'[name].js'"
		},
		context: 'path.join(__dirname, "src")'
	};
	return devConfig;
};
```js
