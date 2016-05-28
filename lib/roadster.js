'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.static('./bower_components'));
app.use(express.static('./web'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// -----------------------------------------------------------------------------
// The last bit
// -----------------------------------------------------------------------------

app.listen(3005, function() {
    console.log('Roadster ready!');
});
