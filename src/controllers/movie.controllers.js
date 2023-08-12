const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include:[Actor,Genre,Director]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id,{include:[Actor,Genre,Director]});
    if(!result) return res.sendStatus(400);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(400);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(400);
    return res.json(result[1][0]);
});

// /movies/:id/actors

const setActors=catchError(async(req,res)=>{
    const {id}=req.params
    const movie =await Movie.findByPk(id)
    if(!movie) return res.sendStatus(400)
    await movie.setActors(req.body)
    const actors= await movie.getActors()

    return res.json(actors)
})

// /movies/:id/directors
const setDirectors=catchError(async(req,res)=>{
    const {id}=req.params
    const movie =await Movie.findByPk(id)
    if(!movie) return res.sendStatus(400)
    await movie.setDirectors(req.body)
    const directors= await movie.getDirectors()

    return res.json(directors)
})

// /movies/:id/genres
const setGenres=catchError(async(req,res)=>{
    const {id}=req.params
    const movie =await Movie.findByPk(id)
    if(!movie) return res.sendStatus(400)
    await movie.setGenres(req.body)
    const genres= await movie.getGenres()

    return res.json(genres)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setActors,
    setDirectors,
    setGenres
}