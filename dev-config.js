module.exports = function createDevConfig(answer) {
	let entryProp = answer.entry ? ( "'" + answer.entry + "'") : "'index.js'"
	let devConfig = {
		entry: entryProp
	};
	return devConfig;
};
