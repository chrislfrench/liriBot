require('dotenv').config()
var request = require('request');
var spotify = require('spotify');
var request = require('request');
var twitter = require('twitter');
var fs = require('fs');

// var movieThis = request;
// var spotifyThis = spotify;
// var myTweets = twitter;

var keys = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});


var searchArray = process.argv;
var userInput = "";
for (var i = 3; i < searchArray.length; i++) {
    userInput = userInput + "+" + searchArray[i];
}; 

// var "do-what-it-says" = process.argv[2];
// var my-tweets = process.argv[2];
// var spotify-this-song = process.argv[2];

console.log(userInput);

function movie2() {
	
	request("http://www.omdbapi.com/?t=" + "Mr.+Nobody" + "&y=&plot=short&r=json" , function(err, response, body){


			console.log("\n=====================\n");
			console.log("The title of the movie is " + JSON.parse(body).Title);
			console.log("\n=====================\n");
			console.log("This was released " + JSON.parse(body).Released);
			console.log("\n=====================\n");
			console.log("The imbd rating is " + JSON.parse(body).Ratings[0].Value);
			console.log("\n=====================\n");
			console.log("This was made in  " + JSON.parse(body).Country);
			console.log("\n=====================\n");
			console.log("This movie's language is " + JSON.parse(body).Language);
			console.log("\n=====================\n");
			console.log(JSON.parse(body).Plot);
			console.log("\n=====================\n");
			console.log(JSON.parse(body).Actors + " starred in this movie");
			console.log("\n=====================\n");
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value); 
			console.log("\n=====================\n"); 

	}
};	



// Movie-this function
function movie() {

	request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json" , function(err, response, body){

		if (JSON.parse(body).Title === undefined) { 

			movie2();
		
		} else (!err) {
		
			// console.log(JSON.stringify(response, null, 4))
			console.log("\n=====================\n");
			console.log("The title of the movie is " + JSON.parse(body).Title);
			console.log("\n=====================\n");
			console.log("This was released " + JSON.parse(body).Released);
			console.log("\n=====================\n");
			console.log("The imbd rating is " + JSON.parse(body).Ratings[0].Value);
			console.log("\n=====================\n");
			console.log("This was made in  " + JSON.parse(body).Country);
			console.log("\n=====================\n");
			console.log("This movie's language is " + JSON.parse(body).Language);
			console.log("\n=====================\n");
			console.log(JSON.parse(body).Plot);
			console.log("\n=====================\n");
			console.log(JSON.parse(body).Actors + " starred in this movie");
			console.log("\n=====================\n");
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("\n=====================\n");
			console.log(JSON.parse(body).imbdRating);

	     }
	};
}




// Spotify-this-song function
function spotifySong() {
	
	spotify.search({ type: 'track', query: userInput }, function(err, data) {
 
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    } else if (!err) {

	    	console.log("\n=====================\n");
	    	
	    	console.log("The song is by the artist " + data.tracks.items[0].artists[0].name);
	    	console.log("Track name: " + data.tracks.items[0].name);
	    	console.log("Album Name: " + data.tracks.items[0].album.name); 
	    	console.log("Spotify URL: " + data.tracks.items[0].preview_url);

	    	
	    	console.log("\n=====================\n");
	    }
});
    // Do something with 'data' 
};

  // My-tweets function
function twitterGet(){
  keys.get('statuses/user_timeline', function(err, tweets, response){
  	// console.log(tweets);
    for ( var i = 0; i < tweets.length; i++ )
    console.log("Twitter Msg: " + tweets[i].text + " " + "Tweeted @: " + tweets[i].created_at)
  }) 
};     

// Random-text function
if(process.argv[2] === "spotify-this-song"){
  spotifySong()
  } if (process.argv[2] === "movie-this"){
    movie()
  } if (process.argv[2] === "my-tweets"){
    twitterGet()
  } if (process.argv[2] === "do-what-it-says"){
    readRandom()
};

