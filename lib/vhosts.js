module.exports = function (req,res, domainConfig) {
    'use strict';

	// read requested host infos
	// match against connfig and use what ever is in config as router.
	try {
		
		if (typeof domainConfig[req.headers['host']] == 'undefined') return require(domainConfig['default'].vhost_use)(req,res, next)
		return require(domainConfig[req.headers['host']].vhost_use)(req,res, next)
	} catch (e) {
		console.log(e)
		return console.log(domainConfig['default'])
		// return console.log(e)
	}
    
    // module.exports = ConfigError;

};