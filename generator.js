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
