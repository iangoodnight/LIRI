//  .env package containing Twitter and Spotify API keys
require("dotenv").config();
//  keys package
var keys = require ('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var fs = require('fs');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');

var request = require('request');