/*
  saves res.locals.template.compiled to couchbase and to file

*/
var fs = require('fs-extra')
var debug = require('debug')('dscms:url_cache:save');
var log = require('bunyan').createLogger({name: "dscms:router"});

module.exports = function(req, res) {
  
  var req_url = req.hostname + req.originalUrl;
	var fs_url = encodeURIComponent(req_url);

  //save as .html
  fs_url = fs_url.replace('.html', '')
	var fs_name = '/app/cache/url_cache_#' + fs_url + '.html';
	var body = { html: res.locals.template['compiled'] };
	//console.log(req_url);
	// console.log(body) url_cache_#domain.tld/path/to/file

  function save_to_cb() {
    cb_dscms.Buckets.cache.upsert('urlCache_#' + req_url, body, function(err, done) {
      if (err) console.log(err)
      debug(done)
      /*
        cb_dscms.Buckets.dscms.get('url_cache_#' + req_url, function(err, result) {
          if (err) console.log(err)
          console.log(result.value)
        })
      */
      return
    })
  }

  
  function save_to_file() {
    fs.writeFile(fs_name, body.html, function(err) {
      if(err) return console.log(err);
      debug("The file %s was saved!", fs_name);
      return
    });    
  }

  if (!process.env.DSCMS_CACHE) process.env.DSCMS_CACHE = 'false'
	
  if ((process.env.NODE_ENV == 'production') && (process.env.DSCMS_CACHE == 'db') ) {
    save_to_cb()
  } else if ((process.env.NODE_ENV == 'development') || (process.env.DSCMS_CACHE == 'file')) {
    save_to_file()
  } else {
    debug('NOT TIGGERED: %s %s', process.env.NODE_ENV, process.env.DSCMS_CACHE)
    return
  }
}