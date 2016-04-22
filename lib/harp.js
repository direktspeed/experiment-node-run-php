
var harpserver = require ('harp')

module.exports = function take(verzeichniss) {
	return harpserver.mount(verzeichniss)
	}