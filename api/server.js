// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var admin 	= require("firebase-admin");
var request = require('request');
var cors 		= require('cors');
var moment = require('moment');

app.use(cors())

admin.initializeApp({
  credential: admin.credential.cert("prove-it-firebase-key.json"),
  databaseURL: "https://prove-it-efbec.firebaseio.com"
});
//firebase-adminsdk-cpyy9@prove-it-efbec.iam.gserviceaccount.com

// var ref = admin.database().ref('people');
// var testRef = ref.child('test');
//spike ref
var spikeRef = admin.database().ref('spikes');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8081; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

	res.json({ message: 'hooray! welcome to our api!' });	
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

	res.sendFile(__dirname + '/index.html');	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/submit')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
	  // g-recaptcha-response is the key that browser will generate upon form submit.
		  // if its blank or null means user has not selected the captcha, so return the error.
		  console.log(req.body.formData);
		  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
		    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
		  }
		  // Put your secret key here.
		  var secretKey = "6Lf1DBQUAAAAADmykyLRyf_y1zsn51NVICoQmouO";
		  // req.connection.remoteAddress will provide IP address of connected user.
		  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
		  // Hitting GET request to the URL, Google will respond with success or error scenario.
		  request(verificationUrl,function(error,response,body) {
		    body = JSON.parse(body);
		    // Success will be true or false depending upon captcha validation.
		    if(body.success !== undefined && !body.success) {
		      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
		    }
		    return res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
		  });
	});


	// on routes that end in /bears
// ----------------------------------------------------
router.route('/spike')
	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
	  
		res.json({"post" : true});

	})

	.put(function(req, res) {

		//root.child('users').child(user.uid).child("username").setValue(newUsername.value);
	  	console.log(req.body);
		res.json({'put' : req.body});
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
	
		var ip = req.connection.remoteAddress;
		var spike = new Spike(ip);

		var response = spikeRef.push(spike);
		console.log('response: ', response);

		console.log(spike);

		res.json(spike);
		
	});

// ----------------------------------------------------
router.route('/spike/:send_id')
	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
	
		var send_id = req.params.send_id;

		var ref = admin.database().ref("spikes");
		// Test for the existence of certain keys within a DataSnapshot
		ref.orderByChild('send_url_id')
		    .equalTo(send_id)
		    .once('value')
		    .then(function (snapshot) {
		      var value = snapshot.val();
		      	if (value) {
		      		console.log(value);
		      		res.json(value);
		    	} 
			});
});

router.route('/view/:view_id')
	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
	
		var view_id = req.params.view_id;

		// Find all dinosaurs whose names come before Pterodactyl lexicographically.
		var ref = admin.database().ref("spikes");
		// Test for the existence of certain keys within a DataSnapshot
		ref.orderByChild('view_url_id')
		    .equalTo(view_id)
		    .once('value')
		    .then(function (snapshot) {
		      var value = snapshot.val();
		      	if (value) {
		      		console.log(value);
		      		res.json(value);
		    	} 
			});
});
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/test/:test_id')

	// get the bear with that id
	.get(function(req, res) {
		res.json('test');
	})

	// update the bear with this id
	.put(function(req, res) {
		testRef.push({
			name:"tyson",
			admin:true,
			count:1
		})
		res.json('pong');
		res.json({ message: 'test!' });	
	})

	// delete the bear with this id
	.delete(function(req, res) {
	
		res.json({ message: 'test' });
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

function Spike(ip) {
	this._id;
    this.send_base_url = 'http://localhost:8080/spike/';
    this.send_url_id = _smallid();
    this.view_base_url = 'http://localhost:8080/view/';
    this.view_url_id = _smallid();
    this.time_created = moment().format('YYYY-MM-DD hh:mm:ss');
    this.time_started;
    this.time_completed;
    this.pass;
    this.flagged = false;
    this.destructed = false;
    this.archive = false;  
    this.created_by = {
        ip: ip,
        country_code: null
    },
    this.meta_data_collection = {
        ip_address: null,
        browser: null,
        device: null,
        country_code: null,
        location: null,
        postal_code: null,
        approximate_coordinates: [],
        accuracy_radius: null,
        isp: null,
        orginization: null,
        domain: null,
        metro_code: null,
        email: null,
        email_domain: null,
        phone_numbers: [],
        user_names: []
    };
    this.captcha_data = {
    };
    this.threat_levels = {
        ai_bot: null,
        proxy: null
    };
    this.logging = [];
}


//generate guids
function _guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}

//generate small ids
function _smallid(){
    var id = "";
    var idLength = 11;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < idLength; i++ )
        id += possible.charAt(Math.floor(Math.random() * possible.length));

    return id;
}