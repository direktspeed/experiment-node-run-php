module.exports = function (req,res, vhosts) {
    'use strict';
                
	// read requested host infos
	// match against connfig and use what ever is in config as router.
	try {
		
		if (typeof vhosts[req.headers['host']] == 'undefined') {
			req.vhosts = vhosts['default']
			return require(vhosts['default'].vhost_use)(req,res, next)
		} else {
			req.vhosts = vhosts[req.headers['host']]
			return require(vhosts[req.headers['host']].vhost_use)(req,res, next)
		}
	} catch (e) {
		console.log(e)
		return console.log(vhosts['default'])
		// return console.log(e)
	}
    
    // module.exports = ConfigError;

};