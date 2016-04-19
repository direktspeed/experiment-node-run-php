module.exports = function useVhost(vhosts) {
    'use strict';
    

    try {
        if (typeof config.http.vhosts[req.headers['host']] == 'undefined') req.vhosts = config.http.vhosts['default']                        
        else req.vhosts = config.http.vhosts[req.headers['host']]
        // console.log(config.http.vhosts[req.headers['host']].aO)
        console.log('VHOST LOG: %s', typeof req.vhosts)
        // check if vhost_use has seperator , in it then do split(',')
        // create a express router
        var router = express.Router()
    
        router.use(require(req.vhosts.vhost_use)(req.vhosts.options))
        
        return router(req,res, req.vhosts.app)
    } catch (e) {
        console.log('VHOST ERROR')
        console.log(e)
        console.log(require(req.vhosts.vhost_use).resolve)
        return
        // onsole.log(http.vhosts['default'])
        // return console.log(e)
    }

    
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