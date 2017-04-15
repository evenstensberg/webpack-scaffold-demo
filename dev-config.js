/* eslint-disable quotes */
const createCommonsChunkPlugin = require('./commons-chunk');

module.exports = function createDevConfig(answer) {
	let entryProp = answer.entry ? ( "'" + answer.entry + "'") : "'index.js'";
	let devConfig = {
		entry: entryProp,
		output: {
			filename: "'[name].js'"
		},
		context: 'path.join(__dirname, "src")',
		plugins: [
			createCommonsChunkPlugin(answer.plugin)
		]
	};
	return devConfig;
};
