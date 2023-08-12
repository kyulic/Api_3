const request=require("supertest")
const app=require('../app')

//require('../models')
let genreId
const URL_GENRES='/api/v1/genres'

const genre={
    name:"Acción"
}

test("POST-> URL_GENRES, shoult return status code 201 ", async() => { 

    const res=await request(app)
    .post(URL_GENRES)
    .send(genre)

    genreId=res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
 })


 test("Get All-> URL_GENRES, should return status code 200, res.body to be defined and res.body.length === 1", async () => {

    const res = await request(app)
      .get(URL_GENRES);
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body.length).toBe(1)
  });


  test("Get ONE -> '/api/v1/genres/:id', should return status code 200, res.body to be defined and res.body.name === genre.name", async () => {

    const res = await request(app)
      .get(`${URL_GENRES}/${genreId}`);
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body.name).toBe(genre.name);
  }); 

  test("PUT -> URL_GENRES, should return status code 200, res.body to be defined and res.body.name === genreUpdate.name", async () => {

    const genreUpdate={
    name:"Romance"
}
    const res = await request(app)
      .put(`${URL_GENRES}/${genreId}`)
      .send(genreUpdate)
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body.name).toBe(genreUpdate.name);
  }); 


  test("DELETE-> 'URL_GENRES/:id', should return status code 204", async () => {

    const res = await request(app)
      .delete(`${URL_GENRES}/${genreId}`);
  
    expect(res.status).toBe(204);
  
  }); 

  