const express = require('express');
const routerActor = require('./actor.router');
const routerMovie = require('./movie.router');
const routerDirector = require('./director.router');
const routerGenre = require('./genre.router');
const router = express.Router();

router.use('/actors',routerActor)

router.use('/movies',routerMovie)

router.use('/directors',routerDirector)

router.use('/genres',routerGenre)

module.exports = router;