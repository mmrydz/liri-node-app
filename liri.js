// Read and set environment variables
require("dotenv").config();

var keys = require("./keys.js");

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the "command" at [2](concert-this, spotify-this-song, movie-this, do-what-it-says) 
// and "content" at [3 ...](artist, song, movie, action):
var command = inputString[2];
var content = "";
// Because most of our queries will be more than one word, we combine everything after [2] into one var:
for (var i = 3; i < inputString.length; i++) {

  if (i > 3 && i < inputString.length) {
    content = content + "+" + inputString[i];
  }
  else {
    content += inputString[i];
  }
}
console.log(content);

// Based on the command selected...
// the content is put through the appropriate get/response/function:
if (command === "concert-this") {
  // 1. `node liri.js concert-this <artist/band name here>`
    var axios = require("axios");
    queryUrl = "https://rest.bandsintown.com/artists/" + content + "/events?app_id=codingbootcamp";
    console.log(queryUrl);
    axios.get(queryUrl).then(
    function(response) {
      console.log(response.ArtistData);
    // console.log(response.VenueData);
    // console.log(response.VenueData.name);
    // console.log(response.VenueData.city + ", " + response.VenueData.region + " " + response.VenueData.country);
    // console.log(response.EventData.datetime);
    //  * Date of the Event (use moment to format this as "MM/DD/YYYY") -- still need to do this ***
})
}

else if (command === "spotify-this-song") {
  // 2. `node liri.js spotify-this-song '<song name here>'`
    var axios = require("axios");

    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: content }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    console.log(data); 
    // * Artist(s)
    // * The song's name
    // * A preview link of the song from Spotify
    // * The album that the song is from
    // * If no song is provided then your program will default to "The Sign" by Ace of Base.
  })
}

else if (command === "movie-this") {
  // 3. `node liri.js movie-this '<movie name here>'`
  var axios = require("axios");
  if (!content) {
    content = "Mr Nobody";
    console.log("======================================");
    console.log("You didn't enter a movie, so I've selected one for you!")
    console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
    console.log("It's on Netflix! See the deets, below:");
    }
  var queryUrl = "http://www.omdbapi.com/?t=" + content + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function(response) {
      //console.log(response);
      console.log("======================================");
      console.log("Title: " + response.data.Title);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating); 
      /// console.log(response); lists the above as tomatoRating (which is undefined), but also in index [2] Ratings array //
      console.log("Country where produced: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("======================================");
  
      })
      
    }
  





// else if (command === "do-what-it-says") {
//   // 4. `node liri.js do-what-it-says`
//   outputNum = parseFloat(num1) / parseFloat(num2);
// }


//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

