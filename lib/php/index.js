var path = require('path'),
    util = require('util'),
    querystring = require('querystring'),
    child_process = require('child_process');

var router =  require('express').Router().use(/.+\.php$/, function PHPServer(req, res, next) {
    var engine = function (filePath, opts, callback) {
	    opts = opts || {};

	    
	    //PHP CGI MODE!

	    // CLI MODE Only NEEDS: REQEST_METHOD CONTENT LENGTH, QUERY_STRING
	    var binPath = opts.binPath || '/usr/bin/php',
	    var runnerPath = opts.runnerPath || (__dirname + '/../../page_runner.php');

	    // default to true for easier PHP debugging
	    var displayErrors = typeof opts.displayErrors === 'undefined' ? true : opts.displayErrors,
	        method = opts.method || 'GET',
	        get = opts.get || {},
	        post = opts.post || {},

	        query = opts.query || querystring.stringify(get),
	        body = opts.body || querystring.stringify(post),

	        PHPOpts = {
	        	/*
		  			Implament CGI Interface and CLI Interface both!!!	
				    location = /robots.txt  { access_log off; log_not_found off; }
  					location = /favicon.ico { access_log off; log_not_found off; }
  					location ~ /\.          { access_log off; log_not_found off; deny all; }
					location ~ ~$           { access_log off; log_not_found off; deny all; }



				    SCRIPT_FILENAME    $request_filename;
				    REQUEST_URI        $request_uri;
				    DOCUMENT_URI       $document_uri;
				    DOCUMENT_ROOT      $document_root;
				    GATEWAY_INTERFACE  CGI/1.1;		    
				    REMOTE_PORT        $remote_port;
				    SERVER_ADDR        $server_addr;
				    
		  			
		  			AUTH_TYPE
		            CONTENT_TYPE
		            PATH_INFO
		            PATH_TRANSLATED
		            REMOTE_ADDR
		            REMOTE_HOST
		            REMOTE_IDENT
		            REMOTE_USER
		            SCRIPT_NAME
		            SERVER_NAME
		            SERVER_PORT
		            SERVER_SOFTWARE
		            header("Status: 404 Not Found");
						else
    				header("HTTP/1.1 404 Not Found");
    				echo "deb http://ftp.us.debian.org/debian/ wheezy main contrib non-free \n deb-src http://ftp.us.debian.org/debian/ wheezy main contrib non-free" >> /etc/apt/sources.list && apt-get update && apt-get install -y php5-cgi=5.4.45-0+deb7u2 php5-common=5.4.45-0+deb7u2
	        	*/
	        	env : {
		            SERVER_PROTOCOL: 'HTTP/1.1',
		            REQUEST_METHOD: method,
		            CONTENT_LENGTH: body.length,
		            SERVER_SOFTWARE: 'dsServer',
		            QUERY_STRING: query
	        	},
	        	maxBuffer: 1024 * 15000
	        }
	        };

	    var command = util.format(
	        '%s %s %s %s',
	        (body ? util.format('echo "%s" | ', body) : '') + binPath,
	        runnerPath,
	        path.dirname(filePath),
	        filePath
	    );
		
	    child_process.exec(command, PHPOpts, function (error, stdout, stderr) {
	        if (error) {

	            // can leak server configuration
	            if (displayErrors && stdout) {
	                callback(stdout);
	            } else {
	                callback(error);
	            }
	        } else if (stdout) {
	            callback(null, stdout);
	        } else if (stderr) {
	            callback(stderr);
	        } else {
	            callback(null, null);
	        }
	    });
	};

    engine(req.path.slice(1), {
        method: req.method,
        get: req.query,
        post: req.body,
        headers: req.headers
    }, function(stderr,stdout) {
    	console.log(stderr,stdout)
    	return res.end(stdout)
    });

});

module.exports = router;