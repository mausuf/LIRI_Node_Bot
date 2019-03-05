//Required
require("dotenv").config();
var keys = require("./keys.js");

var fs = require("fs");
var moment = require("moment");
var axios = require("axios");


var spotifyTest = process.env.SPOTIFY_ID
var command = process.argv[2]
var searchTerm = process.argv[3]

fs.appendFile("log.txt", command + ",", function(err){
    if(err) throw err;
});

//Start js
switch (command){
    case "concert-this":
        searchForBandsInTown(searchTerm);
        break;
    case "spotify-this-song":
        spotifyThisSong(searchTerm);
        break;
    case "movie-this":
        movieThis(searchTerm);
        break;
    case "do-what-it-says":
        doRandom();
        break;
};

//searchForBandsInTown
function searchForBandsInTown(artist) {
    var axiosURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(axiosURL).then(
        function(response) {
            console.log(response.data);
            if(response.data[0].venue !=  undefined) {
                console.log("Event Venue: " + response.data[0].venue.name);
                console.log("Event Location: " + response.data[0].venue.city);
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
            }
            else {
                console.log("No results found.");
            }
        }
    ).catch(function (error) {
        console.log (error);
    });
};


//movieThis
function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function(response) {
            // setTimeout();
            console.log(response.data);
            if (response.data.Title != undefined) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdbRating:: " + response.data.imdbRating);
                console.log("Title: " + response.data.Title);
                console.log("Country:: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("RottenTomatoes: " + response.data.tomatoRating);
            }
            else {
                movieThis("Mr. Nobody");
            }
        }
    ).catch(function (error) {
        console.log(error);
        console.log("No Results found. ");
    });
    // setTimeout(() => {
    //     startApp();
    // }, 50000);
};


//spotifyThisSong
function spotifyThisSong(song) {
    var Spotify = require("node-spotify-api");
    var spotify = new Spotify(keys.spotify);
    spotify.search({type: "track", query: song})
    .then(function(response){
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Track: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);  
            i = response.tracks.items.length;
    })
    .catch(function (error) {
        console.log(error);
        console.log("No results found.")
    });
};


//doRandom

function doRandom() {
    fs.readFile("random.txt", "utf8", function(error,data) {
        var dataArr = data.split(",");
        spotifyThisSong(dataArr[1]);
        if (error);
        console.log(error);
    }
)}



//----------Notes-------------
