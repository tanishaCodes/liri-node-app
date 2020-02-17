require("dotenv").config();

var keys        = require("./keys.js");
var bandsInTown = require('bandsInTown');
var spotify     = require('spotify');
var request     = require('request');
//var client  = new Spotify(keys.spotifyKeys);

// BANDS IN TOWN
var getMyBands = function(bands) {
    bandsInTown.search({ Venue: 'establishment', Location: 'address', Date: 'moment.js'}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
     
    console.log(data); 
});

// SPOTIFY
var getArtistNames = function(artist){
    return artist.name;
}

var getMeSpotify = function(songName){
    spotify.search({type: 'track', query: songName}, function(err, data) {
        if (err){
        console.log(Artist, 'Ace of Base', Track, 'The Sign');
        return;
    }
    
    var songs = data.tracks.items;
        for(var i=0; i < songs.length; i++){
            console.log(i);
            console.log('Artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('Song Name: ' + songs[i].name);
            console.log('Preview Song:' + songs[i].preview_url);
            console.log('Album:' + songs[i].album.name);
            console.log('*****************END*****************');
        }
  });
}

var getMeMovie = function(movieName){
    requests('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body){
        if (!error && response.statusCode == 200){
            var jsonData = JSON.parse(body);
                console.log('Title:' + jsonData.Title);
                console.log('Year:' + jsonData.Year);
                console.log('IMDB Rating:' + jsonData.imdbRating);
                console.log('Rotten Tomatoes Rating:' + jsonData.rottenTomatoesRating);
                console.log('Country:' + jsonData.Country);
                console.log('Language:' + jsonData.Language);
                console.log('Plot:' + jsonData.Plot);
                console.log('Actors:' + jsonData.Actors);
            } 
        });  
    }

var doWhatItSays = function(){
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;
    
        var dataArr = data.split(',');
            if(dataArr.length == 2){
            pick(dataArr[0], dataArr[1]);
            } else if(dataArr.length == 1){
            pick(dataArr[0]);
        }
    });
}

var pick = function(caseData, functionData){
    switch(caseData){
        case `concert-this` :
            getMyBands();
            break;
        case `spotify-this-song` :
            getMeSpotify();
            break;
        case `movie-this` :
            getMeMovie();
            break;
        case `do-what-it-says` :
            doWhatItSays();
            break;
        default:
            console.log('Sorry. LIRI does not understand.');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);


}
