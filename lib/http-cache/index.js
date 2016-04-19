// The http cache
// can store loadbalanced results to caching backend and get it from there.
// we use driver methods .getHttpCache, .saveHttpCache
/* Serves Cached Requests for Adult Tube Sites */
if (process.env.NODE_ENV == 'development') {
   console.log("dev mode %s", process.env.NODE_ENV)
   module.exports = require( __dirname + '/serve_fs_url_cache') 
} else {
   console.log("Production mode %s", process.env.NODE_ENV)
   module.exports = require( __dirname + '/serve_cb_url_cache') 
}