require("dotenv").config();
var keys = require ('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var inquirer = require('inquirer');
var omdb = require('omdb');
var request = require('request');


function introduction() {
	console.log("Hey Kiddo!  My name is Liri and I can do stuff!");
}

var runLoop = function() {
	inquirer
		.prompt([
		{
			type: "confirm",
			message: "Anything else?",
			name: "restart"
		}
		]).then(function(data) {
			console.log("data.restart: " + data.restart);
			if (data.restart === true) {
				run();
			}
		});
};

//  Get 20 Latest Tweets
function getTweets(name) {

	var Name = name;
	var params = {screen_name: Name};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			console.log('Error occurred: ' + error);
		} else {
			var tweetLength = tweets.length;
			for (var i = 0; i < tweetLength && i < 20; i++) {
	    	console.log(tweets[i].text);
	  		}
	  	runLoop();
		}
	});
}

//  Get first five spotify results
function getSpotify(song) {
	var Song = song;
	spotify.search({ type: 'track', query: Song }, function(err, data) {
	    if ( err ) {
	       	console.log('Error occurred: ' + err);
	       	return;
	   	} else {
	   		var results = data.tracks.items;
    		for (var j = 0; j < results.length && j < 5; j++) {
				for (var k = 0; k < results[j].album.artists.length; k++) {
					console.log("Artist(s): " + results[j].album.artists[k].name);
				}
			console.log("Song: " + results[j].name + "\nPreview: " + results[j].preview_url + "\nAlbum: " + results[j].album.name + "\n\n--- --- ---\n");
	    	}
	    runLoop();
		}
	 });
}

//  Get OMDB results
function getOMDB(input) {
	if (!input) {
		input = "Mr. Nobody";
	} else {
		input = input;
	}
	var queryUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=' + encodeURIComponent(input);
		
	request(queryUrl, function(error, response, body) {
		body = JSON.parse(body);
		if (error) {
			console.log("Error: " + error);
		} else {
			console.log("\nTitle: " + body.Title + "\nReleased: " + body.Released + "\nIMDB Rating: " + body.Ratings[0].Value + "\nRotten Tomatoes Rating: " + body.Ratings[1].Value + "\nCountry Produced: " + body.Country + "\nLanguage: " + body.Language + "\nPlot: " + body.Plot + "\nActors: " + body.Actors);
			runLoop();
		}
	});
}




function run() {

	inquirer
		.prompt([
		{
			type: "input",
			message: "Whacha wanna know?",
			name:  "action"
		}
		])
		.then(function(data) {
		if (data.action === "my-tweets") {
			inquirer
				.prompt([
				{
					type: "input",
					message: "Whazzer handle muchacho? (Don't worry, if you aren't twitter savvy you can just leave the field blank and check out my sweet, sweet tweets!) \n --->",
					name: "handle"
				}
				])
				.then(function(data) {
					if (!data.handle) {
						getTweets("chirptobesquare");
					} else {
					getTweets(data.handle);
					}
				});
		}
		if (data.action === "spotify-this-song") {
			inquirer
				.prompt([
				{
					type: "input",
					message: "Got a song stuck in your head? (If not, you can leave the field blank and I'll pick a song to stick in your head!) \n--->",
					name: "song"
				}
				])
				.then(function(data) {
					if (!data.song) {
						getSpotify("The Sign (Ace of Base)");
					} else {
						getSpotify(data.song);
					}
				});
		}
		if (data.action === "movie-this") {
			inquirer
				.prompt([
				{
					type: "input",
					message: "I love movies!  Whaddya been watchin'? (If you leave the input blank, I can tell you about what I've been whatchin'!)",
					name: "movie"
				}
				])
				.then(function(data) {
					console.log("data.movie: " + data.movie);
					getOMDB(data.movie);
				});
		}
	});
}

introduction();
run();


	


