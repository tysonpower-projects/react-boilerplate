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

app.use(cors())

admin.initializeApp({
  credential: admin.credential.cert("prove-it-firebase-key.json"),
  databaseURL: "https://prove-it-efbec.firebaseio.com"
});
//firebase-adminsdk-cpyy9@prove-it-efbec.iam.gserviceaccount.com

var ref = admin.database().ref('people');
var testRef = ref.child('test');



// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

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
		    res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
		  });
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
	
			// Get a database reference to our posts
			var db = admin.database();
			var ref = db.ref("people");

			// Attach an asynchronous callback to read the data at our posts reference
			ref.on("child_added", function(snapshot) {
			  	console.log(snapshot.val());
			  	res.json(snapshot.val());
			}, function (errorObject) {
			  	console.log("The read failed: " + errorObject.code);
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
