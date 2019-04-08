// Required elements
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require('fs'); // in the node file system
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the "command" at [2] (concert-this, spotify-this-song, movie-this, do-what-it-says) 
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

var header = "================= Liri says ==================";

// Function that writes the output of each argument to log.txt
function writeToLog(output) {
  fs.appendFile('log.txt', output, (err) => {
    if (err) throw err;
    console.log('The "output" was appended to the file!');
  });
}

//  ===================== Arguments =============================//
// Based on the command selected...
// the content is put through the appropriate get/response/function:

// ====================== concert-this ========================== //
if (command === "concert-this") {
  // 1. `node liri.js concert-this <artist/band name here>`
  queryUrl = "https://rest.bandsintown.com/artists/" + content + "/events?app_id=codingbootcamp";
  axios.get(queryUrl).then(
  function(response) {
    for (var i = 0; i < response.data.length; i++) {
      var formattedDate = response.data[i].datetime.slice(0,10);
      var randomDate = formattedDate;
      var randomFormat = "YYYY/MM/DD";
      var convertedDate = moment(randomDate, randomFormat);
    
    var output = 
    "\n" + header +
    "\nArtist(s): " + content + 
    "\nVenue: " + response.data[i].venue.name + 
    "\nVenue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country;
    "\nDate: " + convertedDate.format("MM/DD/YYYY");
    console.log(output);
    }
    writeToLog(output);
  })
}
// ====================== spotify-this-song ========================== //

else if (command === "spotify-this-song") {
//   // 2. `node liri.js spotify-this-song '<song name here>'`
//   // If there is no song name, set the song to The Sign by Ace of Base
  if (!content) {
      content = "The Sign Ace of Base";
  }
  spotify.search({ type: 'track', query: content }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
      } else {
        var output =
        "\n" + header +
        "\nArtist: " + data.tracks.items[0].album.artists[0].name + 
        "\nSong: " + content.toUpperCase() +  
        "\nPreview link of the song: " + data.tracks.items[0].album.external_urls.spotify +  
        "\nAlbum it's on: " + data.tracks.items[0].album.name;
        console.log(output);
        writeToLog(output);      
      }
    });
}

// ====================== movie-this ========================== //

else if (command === "movie-this") {  
  // 3. `node liri.js movie-this '<movie name here>'`
  if (!content) {
    content = "Mr Nobody";
    console.log("================= Liri says ==================");
    console.log("You didn't enter a movie, so I've selected one for you!")
    console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
    console.log("It's on Netflix! See the deets, below:");
    }
  var queryUrl = "http://www.omdbapi.com/?t=" + content + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function(response) {
      var output =
      "\n" + header +
      "\nTitle: " + response.data.Title + 
      "\nIMDB Rating: " + response.data.imdbRating +
      "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
      "\nCountry where produced: " + response.data.Country +
      "\nLanguage: " + response.data.Language +
      "\nPlot: " + response.data.Plot +
      "\n" + "Actors: " + response.data.Actors;
      console.log(output);
      writeToLog(output);     
      })
      
    }

// ====================== do-what-it-says ========================== //
    
else if (command === "do-what-it-says") {
//   // 4. `node liri.js do-what-it-says`
fs.readFile("random.txt", "utf8", function(error, data) {
  spotify-this-song(data);
});
}


//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

