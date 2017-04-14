const Generator = require('yeoman-generator');

module.exports = class WebpackGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);
		opts.env.configuration = {
			dev: {}
		}
	}
};
