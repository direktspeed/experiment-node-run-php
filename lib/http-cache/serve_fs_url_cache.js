/*
	fs_url_cache


*/
var debug = require('debug')('dscms:url_cache')
var fs = require('fs')
var mime = require('mime')
var req_url, fs_url, mime_fs_url, fs_name 


self = module.exports = function serve_fs_url_cache( req, res, next ){
	if (!process.env.DSCMS_NOCACHE) process.env.DSCMS_NOCACHE = 'false'
	
	if (process.env.DSCMS_NOCACHE == 'false') {
		
		var req_url = req.hostname + req.originalUrl;
		var fs_url = encodeURIComponent(req_url);
		var mime_fs_url = mime.lookup(fs_url).split('/')
		var fs_name = '/app/cache/url_cache_#' + fs_url;


		function is_image() {
			if (mime_fs_url[0] == 'image') {
				return('true')
			} else return false
		}
		
		function serve_image() {
			if (fs.existsSync(fs_name)) {
				var imageData = fs.readFileSync(fs_name);
				// console.log('BLA3: %s OHA: %s', imageData)
				res.writeHead(200, {
	          		'Content-Type': mime.lookup(fs_name),
	          		'Content-Length': imageData.length
	        	});
	        	debug('IMAGE server %s', fs_name)
	        	res.write(imageData)
	        	res.end()
	        	return
			} else next()
		}
		
		function serve_html() {
			fs_url = fs_url.replace('.html', '');	/* strip html */
			fs_name = '/app/cache/url_cache_#' + fs_url + '.html';
			console.log('SERVERHTML %s', fs_name)
			if (fs.existsSync(fs_name)) {
				var htmlData = fs.readFileSync(fs_name);
				res.writeHead(200, {
	          		'Content-Type': mime.lookup(fs_name),
	          		'Content-Length': htmlData.length
	        	});
	        	debug('HTML server %s', fs_name)
	        	res.end(htmlData)
			} else next()
		}

		
		if (is_image() == 'true') {
			serve_image()
		} else serve_html()
		/*
		if (fs.existsSync(fs_name) && (process.env.DSCMS_NOCACHE == false)) {
	    	// Do something
	    	data = fs.readFileSync(fs_name,'utf8');  			
	  		console.log(data);
	  		// set header mime type
	  		res.status(200).write(data);
			res.end();
			return;  			
			
		} else {
			if (!process.env.DSCMS_NOCACHE) console.log('cache: no file exists')
			next()
			return
		}
		*/	
	} else next()

}

module.exports = self