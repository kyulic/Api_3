const request=require("supertest")
const app=require('../app')
const { create } = require("../controllers/movie.controllers")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")

require('../models')
let movieId
const URL_MOVIES='/api/v1/movies'

const movie={
    name:"Mujer Maravilla",
    image:"kkkk",
    synopsis:"loream jjdfijeieijfdsij",
    releaseYear:2012
}

test("POST-> URL_MOVIES, shoult return status code 201 ", async() => { 

    const res=await request(app)
    .post(URL_MOVIES)
    .send(movie)

    movieId=res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
 })


 test("Get All-> URL_MOVIES, should return status code 200, res.body to be defined and res.body.length === 1", async () => {

    const res = await request(app)
      .get(URL_MOVIES);

      
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body.length).toBe(1)

    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].actors).toHaveLength(0)

    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)

    expect(res.body[0].directors).toBeDefined()
    expect(res.body[0].directors).toHaveLength(0)
    
  });


  test("Get ONE -> '/api/v1/genres/:id', should return status code 200, res.body to be defined and res.body.name === movie.name", async () => {

    const res = await request(app)
      .get(`${URL_MOVIES}/${movieId}`);
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body.name).toBe(movie.name);
  }); 

  test("PUT -> URL_MOVIES, should return status code 200, res.body to be defined and res.body.name === movieUpdate.name", async () => {

    const movieUpdate={
    name:"Capitan America"
}
    const res = await request(app)
      .put(`${URL_MOVIES}/${movieId}`)
      .send(movieUpdate)
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body.name).toBe(movieUpdate.name);
  }); 

  // /movies/:id/actors

  test("POST-> URL_MOVIES/:id/actors, shoult return status code 200 and res.body.length===1  ", async() => { 

    const actor={
      firstName:"Angelina",
      lastName:"Jolie",
      nationality:"Estadounidense",
      image:"kkkk",
      birthday:1972-7-11
  }

  const createActor=await Actor.create(actor)
    const res=await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([createActor.id])

    

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createActor.id)

    await createActor.destroy()
 })


 // /movies/:id/directors

 test("POST-> URL_MOVIES/:id/directors, shoult return status code 200 and res.body.length===1  ", async() => { 

  const director={
    firstName:"Patty",
    lastName:"Jenkins",
    nationality:"Estadounidense",
    image:"kkkk",
    birthday:1971-7-24
}

const createDirector=await Director.create(director)
  const res=await request(app)
  .post(`${URL_MOVIES}/${movieId}/directors`)
  .send([createDirector.id])

  

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createDirector.id)

  await createDirector.destroy()
})

// /movies/:id/genres

test("POST-> URL_MOVIES/:id/genres, shoult return status code 200 and res.body.length===1  ", async() => { 

  const genre={
    name:"Acción"
}


const createGenre=await Genre.create(genre)
  const res=await request(app)
  .post(`${URL_MOVIES}/${movieId}/genres`)
  .send([createGenre.id])

  

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createGenre.id)

  await createGenre.destroy()
})




  test("DELETE-> 'URL_MOVIES/:id', should return status code 204", async () => {

    const res = await request(app)
      .delete(`${URL_MOVIES}/${movieId}`);
  
    expect(res.status).toBe(204);
  
  }); 

  