//vars and requires
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const request = require("request");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let term = process.argv[3];
    if(process.argv[4]){
        for(let i = 4; i < process.argv.length; i++){
            term += "+"+process.argv[i];
        }
    }

//functions
function concertInfo(){//sends a request to bandsintown api and outputs concert information
    const url = "https://rest.bandsintown.com/artists/"+term+"/events?app_id=liri";
    request(url, function(error, res, body){
        if(error) throw error;
        let data = JSON.parse(body);
        data.forEach(info => {
            console.log("Venue: ", info.venue.name);
            console.log("Location: ", info.venue.city, ",", info.venue.country);
            console.log("Date: ", info.datetime, "\n");
        });
    });
}

function songInfo(){//sends a search request to node-spotify-api and displays information about a song
    spotify.search({type: "track", query: term })
    .then(function(res){
        let list = res.tracks.items;
        list.forEach(element => {
            console.log("Artist Name:", element.artists[0].name);
            console.log("Song Name:", element.name);
            console.log("Song Preview:", element.preview_url);
            console.log("Album Name:", element.album.name, "\n");

        });
    }).catch(function(err){
        throw err;
    });
}

function movieInfo(){//sends a search request to the omdb api and displayes information about a movie
    const url = "http://www.omdbapi.com/?t="+term+"&y=&plot=short&apikey=trilogy";
    request(url, function(error, res, body){
        if(!error && res.statusCode === 200){
            let info = JSON.parse(body);
            console.log("Title:", info.Title);
            console.log("Year:", info.Year);
            console.log("IMDB Rating:", info.imdbRating);
            console.log("Rotten Tomatoes Rating:", info.Ratings[1].Value);
            console.log("Country:", info.Country);
            console.log("Language", info.Language);
            console.log("Plot:", info.Plot);
            console.log("Actors:", info.Actors, "\n");
        }
    });
}

//do-what-it-says
function whatItSays(){ //reads a command from a file and executes 
    fs.readFile("./random.txt", "utf8", (err, data) => {
        if(err) throw err;
        let output = data.split(",");
        output[1] = output[1].substr(1).slice(0,-1).replace(/ /g, "+");
        command = output[0];
        term = output[1];
        console.log('Executing command from file "./random.txt"\n');
        checkCommand();
    });
}

function defaultOutput(){//no command / not valid command
    console.log("List of commands:");
    console.log(" concert-this [artist/band name]");
    console.log(" spotify-this-song [song name]");
    console.log(" movie-this [movie title]");
    console.log(" do-what-it-says [n/a]");
}

function checkCommand(){//do what command is
    switch(command){
        case "concert-this":
            concertInfo();
            break;
        case "spotify-this-song":
            songInfo();
            break;
        case "movie-this":
            movieInfo();
            break;
        case "do-what-it-says":
            whatItSays();
            break;
        default:
            defaultOutput();
            break;
    }
}

//Run
checkCommand();