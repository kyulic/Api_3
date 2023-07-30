const Actor = require("./Actor");
const Movie = require("./Movie");
const Director = require("./Director");
const Genre = require("./Genre");


//create table many a many MoviesActors 
 Actor.belongsToMany(Movie,{through:"MoviesActors"})
 Movie.belongsToMany(Actor,{through:"MoviesActors"})


 //create table many a many MoviesGenres
 

  Genre.belongsToMany(Movie,{through:"MoviesGenres"})
 Movie.belongsToMany(Genre,{through:"MoviesGenres"})


  //create table many a many MoviesDirectors
 
 Director.belongsToMany(Movie,{through:"MoviesDirectors"})
 Movie.belongsToMany(Director,{through:"MoviesDirectors"})

 