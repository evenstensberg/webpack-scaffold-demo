/* eslint-disable quotes */
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
