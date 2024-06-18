const loaderUtils = require('loader-utils');

module.exports = function (source) {
    const url = loaderUtils.interpolateName(this, '[name].[ext]?t=[hash]', { content: source });
    return `module.exports = "${url}";`;
};