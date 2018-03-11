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
			Input('entry', 'What is the entry point in your app?'),
			Input('plugin', 'What do you want to name your commonsChunk?')
		]).then (answer => {
			if(answer['confirm'] === 'Pengwings') {
				this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
				this.options.env.configuration.dev.topScope = [
					'const path = require("path")',
					'const webpack = require("webpack")'
				];
				this.options.env.configuration.dev.configName = 'pengwings';
			}
		});
	}
	writing() {
		this.config.set('configuration', this.options.env.configuration);
	}
};
