/*
	Class For Managing domainSettings for the cms system
dockerimages/nginx/snippets/fastcgi-php.conf: needs merge
dockerimages/nginx/scgi_params: needs merge
dockerimages/nginx/fastcgi_params: needs merge


bad file list:

find . -type f -iname test2.php -exec rm -fv {} \; 
find . -type f -iname xml.so -exec rm -fv {} \; >> /srv/services/dellog.sh
find . -type f -iname tetyafehxfger.php -exec rm -fv {} \; 
find . -type f -iname wp_taempalte.php -exec rm -fv {} \; 
find . -type f -iname sdgjnsjrgisjdng36236xfbg.php -exec rm -fv {} \; 
find . -type f -iname sdjgisnosepaoevnsuevi3t4wy3439i4gn3gnksjdng.php -exec rm -fv {} \;
find . -type f -iname output.php -exec rm -fv {} \;
find . -type f -iname xmlr-php.php -exec rm -fv {} \;
find . -type f -iname xnlwlr.php -exec rm -fv {} \;
find . -type f -iname wp-ajax.php -exec rm -fv {} \;
find . -type f -iname shabs-element.php -exec rm -fv {} \;
find . -type f -iname e5nbwvcxef.php -exec rm -fv {} \;
find . -type d -iname "wordfence" -exec rm -rfv {} \;
find . -type d -iname "w3-total-cache" -exec rm -frv {} \;
find . -type f -iname "*.tmp" -exec rm -fv {} \;
w3tc-config zxcvbn
*/
// var async = require('async')
var Settings = {}
var CurrentSettings = {}
var Provider = {}
var filename = ""
var debug = require('debug')('domainConfig')
var fs = require('fs'),
    util = require('util'),
    path = require('path');


domainConfig = {
	initialize: function() {
	    // this is the right way to do it:
	    this.log = [];
	  },
	getSettingsDb: function getSettingsDb(callback, argv) {
		var callback = callback
		var fs = require('fs');
		var Config = require('../lib/config'),
	    	argv = argv || {}
	    	configFile = argv.c || argv.config;

		if (!configFile) {
		    configFile = path.resolve(__dirname, '..', 'config', 'servers', 'config.json');
		    if (process.env.SETTINGS_FLAVOR !== undefined) {
		        configFile = configFile.replace(/\.json$/, '_' + process.env.SETTINGS_FLAVOR + '.json');
		    }
		}

		util.log('Loading config from ' + configFile);

		fs.readFile(configFile, function (err, data) {
		    if (err) {
		        throw new Error('Couldn\'t locate requested config file at: ' + configFile);
		    }

		    var config;
		    try {
		          config = new Config(data);
		    } catch (e) {
		          util.log('Failed loading configuration!');
		          throw e;
		    }

		    // Wait for configuration to say ready...
		    config.once('ready', function () {

		        if (argv.d || argv.dry) {
		              util.log('Configuration file looks ok. Here is the result:');
		              util.log(config.inspect());
		              return;
		        }

				require('./db.js');
				db = cb_dscms.Buckets.dscms
				db.get("domainConfig", function(err, remote_domainSettings) {
				    if (err) return process.exit('Failed Loading Settings via key domainSettings from Couchbase: %s', err)
				    
				    if (remote_domainSettings) { 
				         domainConfig["value"] = remote_domainSettings.value
				         
				         callback(0 ,domainConfig["value"], config)
				    }
				});

		    });
		});
	},
	getSettingsFs: function getSettingsFs(callback, argv) {
		var callback = callback
		var fs = require('fs');
		var Config = require('./config');
	    var argv = argv || {}
	    configFile = argv.c || argv.config;

		if (!configFile) {
		    configFile = path.resolve(__dirname, '..', 'config', 'servers', 'config.json');
		    if (process.env.SETTINGS_FLAVOR !== undefined) {
		        configFile = configFile.replace(/\.json$/, '_' + process.env.SETTINGS_FLAVOR + '.json');
		    }
		}

		util.log('Loading config from ' + configFile);

		fs.readFile(configFile, function (err, data) {
		    if (err) {
		        throw new Error('Couldn\'t locate requested config file at: ' + configFile);
		    }

		    var config;
		    try {
		          config = new Config(data);
		    } catch (e) {
		          util.log('Failed loading configuration!');
		          throw e;
		    }

		      // Wait for configuration to say ready...
		      config.once('ready', function () {

		        if (argv.d || argv.dry) {
		              util.log('Configuration file looks ok. Here is the result:');
		              util.log(config.inspect());
		              return;
		        }

		   		var dirname = '/app/config/domains/'
				var filename = ""			

				fs.readdir(dirname, function(err, filenames) {
				    if (err) return console.log(err);

				    for (i=0; i < filenames.length; i++) {
				      filename = filenames[i]
				      console.log(filename)
				      if (filename.indexOf('.json') < 0) return
				      
				      CurrentSettings = require(dirname+filename)
				      
				      for (j=0; j < Object.keys(CurrentSettings).length; j++) {
				      	Settings[Object.keys(CurrentSettings)[j]] = CurrentSettings[Object.keys(CurrentSettings)[j]]
				      	// CurrentSettings[Object.keys(CurrentSettings)[j]] = null
				      	if ( (j == Object.keys(CurrentSettings).length -1) && (i == filenames.length -1) ) {
				      		callback(0, Settings, config);
				      	}
				      }
				    if (i == filenames.length -1) console.log(Settings)
				    };
				    // callback(0, Settings);
				});


		    });
		});
	},
	set: function set(callback, argv) {
		if (process.env.NODE_ENV == 'development') {
		  console.log("dev mode %s", process.env.NODE_ENV)
		  this.getSettingsFs(callback, argv)
		  // domainConfig.getSettingsFs(callback, argv)
		  /*
		  var fs = require('fs');
		  var dirname = '/app/config/domains/'
		  var filename = ""			
			  fs.readdir(dirname, function(err, filenames) {
			    if (err) return console.log(err);

			    for (i=0; i < filenames.length; i++) {
			      filename = filenames[i]
			      console.log(filename)
			      if (filename.indexOf('.json') < 0) return
			      
			      CurrentSettings = require(dirname+filename)
			      
			      for (j=0; j < Object.keys(CurrentSettings).length; j++) {
			      	Settings[Object.keys(CurrentSettings)[j]] = CurrentSettings[Object.keys(CurrentSettings)[j]]
			      	// CurrentSettings[Object.keys(CurrentSettings)[j]] = null
			      	if ( (j == Object.keys(CurrentSettings).length -1) && (i == filenames.length -1) ) callback(0, Settings);
			      }
			    if (i == filenames.length -1) console.log(Settings)
			    };
			    // callback(0, Settings);
			  });
			*/

		  // callback(require('/app/domainSettings.json'));
		} else {
		    console.log("Production mode %s", process.env.NODE_ENV)
		    this.getSettingsDb(callback, argv)
		}

	},
	setProvider: function setp(callback) {
		if ( (process.env.NODE_ENV == 'development') || (process.env.NODE_ENV) || (process.env.LOCAL == 'true')){
		  console.log("Provider mode %s %s", process.env.NODE_ENV, process.env.LOCAL)
		  
		  var fs = require('fs');
		  var dirname = '/app/config/provider/'
		  var filename = ""			
			  fs.readdir(dirname, function(err, filenames) {
			    if (err) return console.log(err);

			    for (i=0; i < filenames.length; i++) {
			      filename = filenames[i]
			      console.log(filename)
			      if (filename.indexOf('.json') < 0) return
			      
			      Provider[filename.replace('.json', '')] = require(dirname+filename)
			      
		          if (i == filenames.length -1) {
		          	debug(Provider)
		          	callback(null, Provider)
		          }
			    };
			    
			    // callback(0, Settings);
			  });
			//usage: domainConfig.setProvider(function cb(err, Provider){	Provider = Provider })

		  // callback(require('/app/domainSettings.json'));
		} else {
		    console.log("Production mode %s", process.env.NODE_ENV)
		    // get each provider_# key and set it by provider.domain from cb
		    //this.get(callback)
		}

	},
	get: function get(callback) {
		require('./db.js');
		db = cb_dscms.Buckets.dscms
		db.get("domainConfig", function(err, remote_domainSettings) {
		    if (err) return process.exit('Failed Loading Settings via key domainSettings from Couchbase: %s', err)
		    
		    if (remote_domainSettings) { 
		         domainConfig["value"] = remote_domainSettings.value
		         callback(0 ,domainConfig["value"])
		    }
		});
	},
	"import":  function imp(callback) {
		require('/app/db.js');
		db = cb_dscms.Buckets.dscms
		db.get("domainConfig", function(err, remote_domainSettings) {
		    if (err) {
		        console.log('Failed Loading Settings via key domainSettings from Couchbase')
		        console.log(err)
		        // remote_domainSettings = require('/app/domainSettings.json');
		        process.exit(1)
		    }

		    if (remote_domainSettings) { 
		         domainConfig["value"] = remote_domainSettings.value
		         callback(domainConfig["value"])
		    }
		});
	},
	'export': function exp() {
		  var fs = require('fs');
		  var dirname = '/app/config/domains/'
		  var filename = ""			
			  
			  fs.readdir(dirname, function(err, filenames) {
			    if (err) return console.log(err);

			    for (i=0; i < filenames.length; i++) {
			      filename = filenames[i]
			      console.log(filename)
			      if (filename.indexOf('.json') < 0) return
			      
			      CurrentSettings = require(dirname+filename)
			      
			      for (j=0; j < Object.keys(CurrentSettings).length; j++) {
			      	Settings[Object.keys(CurrentSettings)[j]] = CurrentSettings[Object.keys(CurrentSettings)[j]]
			      	// CurrentSettings[Object.keys(CurrentSettings)[j]] = null
			      	if ( (j == Object.keys(CurrentSettings).length -1) && (i == filenames.length -1) ) {
			      			require('./db.js');
							db = cb_dscms.Buckets.dscms
			      			db.upsert("domainConfig", Settings, function(err, done) {
							    if (err) {
							        console.log('Failed Storing Settings via key domainSettings from Couchbase')
							        console.log(err)
							        // remote_domainSettings = require('/app/domainSettings.json');
							        process.exit(1)
							    } else console.log("DONE SAVING domainConfig %s", done.cas); process.exit(0)
							});
			      	}
			      }
			    if (i == filenames.length -1) console.log(Settings)
			    };
			    // callback(0, Settings);
			  });
		console.log(Settings)		
	}
}

module.exports = exports = domainConfig
//domainConfig.set(start)
//domainConfig.set(start)
/*
domainConfig.get(function(err, value) {
	if (!err) console.log(JSON.stringify(value, null, 2)); else console.log(err)
})
*/

/*
	Execute able for Administration use!

	domainConfig.export()

*/

if (typeof process.argv[2] !== "undefined") {
switch (process.argv[2]) {
		case "export":
			return domainConfig.export()
		break;
		case "import":
			return domainConfig.import()
		break;
		default:
			console.log("startet without options (export = write to db, import = get from db")
		break;
	} 
}