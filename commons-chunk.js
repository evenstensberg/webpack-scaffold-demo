/* eslint-disable quotes */
module.exports = function createCommonsChunkPlugin(chunk) {
	return (
		"new webpack.optimize.CommonsChunkPlugin({name:" + "'" + chunk + "'" +
		",filename:" + "'" + chunk + "-[hash].min.js'})"
	);
};
