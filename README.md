This is a node.js application that runs in the command line.
This app can return data about movies, songs, and concerts from three separate APIs

Install instructions:
    clone this repository;
    in the root folder run:
    npm install
    to install dependencies.
    
Run instructions:
    Open a command line to the root directory and type:
    node index.js //will display a list of accepted commands

    The program takes any number of arguments
    the first argument must be a command see list bellow
    Every argument after will be parsed together to form a search term

    Example:
    node index.js spotify-this-song Close to the Edge //multiple arguments; queries spotify database for songs related to "Close to the Edge"
    
List of commands:
   * concert-this (arg: band/artist name)

   * spotify-this-song (arg: song name)

   * movie-this (arg: movie title)

   * do-what-it-says (arg: n/a)

APIs used in this project:
    * node-spotify-api
    * omdb
    * bands in town