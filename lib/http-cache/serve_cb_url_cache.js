/*
	cb_url_cache


*/
var mime = require('mime')
var debug = require('debug')('dscmsCbUrlCache')
self = module.exports = function( req, res, next ) {
	if (!process.env.DSCMS_NOCACHE) {
	var req_url = req.hostname + req.originalUrl;
		cb_dscms.Buckets.cache.get('urlCache_#' + req_url, function(err, result) {
			if (err) {
				debug('cBurlCache:: urlCache_#' + req_url + ' - %s', err)
				next()
				return
			}
			if (result.value.html) {
				debug('cBurlCache: %s',result)
				res.header("Content-Type", "text/html");
				res.status(200).write(result.value.html)
				res.end()
				return
			} else if (result.value.image) {
				var modified_since = new Date(req.headers['if-modified-since']).getTime();
				var last_modified = new Date('2015-10-24 21:17:23').getTime()
				if(req.headers['if-modified-since'] || last_modified > modified_since){
				    var imageData = new Buffer(result.value.image, 'base64');
	       			console.log('DELIVER FROM CACHE')
	        		// make last modifyed on date in cache data.
        			res.writeHead(200, {
	          			'Content-Type': mime.lookup(req_url),
	          			'Last-Modified': last_modified,
	          			'Modified': last_modified,
						'Expires': new Date(new Date().getTime() + 604800000).toUTCString(),
	          			'Cache-Control': 'public, max-age=31557600',
    	      			'Content-Length': imageData.length
	       			});
        			res.end(imageData);     
					return
				} else {
					console.log('DELIVER FROM CACHE 304')
					res.status(304)
					res.end()
					return
				}
			}
			

		})
	} else next()
}

module.exports = self