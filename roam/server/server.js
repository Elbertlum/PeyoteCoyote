'use strict'

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var apoc = require('apoc');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var yelp = require('./utils/api');
var gmailKeys = require('./utils/apiKeys').gmailKeys;
var formattedDateHtml = require('./utils/dateFormatter');
var generateEmail = require('./utils/emailGenerator');
var boundingBoxGenerator = require('./utils/boundingBoxGenerator');
var roamOffGenerator = require('./utils/roamOffGenerator');

const signupHandler = require('./utils/signupHandler');
const signinHandler = require('./utils/signinHandler');
const roamHandler = require('./utils/roamHandler');
const cancelRoamHandler = require('./utils/cancelRoamHandler');
const joinRoamHandler = require('./utils/joinRoamHandler');
const roamListHandler = require('./utils/roamListHandler');

var saltRounds = 10;

//config for email SMTP for gmail. We are send email notifications to users
var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'typosroam@gmail.com',
    pass: 'typ0sr0am'
  }
};

//transport vehicle for nodemailer to send out email
var transporter = nodemailer.createTransport(smtpConfig);

app.use(bodyParser.json());

//Checks to make sure server is working
app.get('/', function(req, res){
  res.send('Hello World!');
});

//Post to server on signup page
app.post('/signup', function(req, res) {
  signupHandler(req.data, res);

});

//Validation for sign in page
app.post('/signin', function(req, res) {
  signinHandler(req.body, res);

});

//Page to set up event between users, making API calls to YELP
app.post('/roam', function(req, res) {
  roamHandler(req, res);

});

//Cancellation of roam; only the creator has cancellation abilities
app.post('/cancel', function(req, res) {
  cancelRoamHandler(req, res, transporter);

});

//List roam pools/x in the area;
app.post('/roamList', function(req, res) {
  roamListHandler(req, res);

});

//join roam pools/x in the area;
app.post('/joinRoam', function(req, res) {
  joinRoamHandler(req, res);

});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
