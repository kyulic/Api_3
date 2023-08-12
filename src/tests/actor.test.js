const request=require("supertest")
const app=require('../app')
require('../models')
let actorId
const URL_ACTORS='/api/v1/actors'

const actor={
    firstName:"Sofia",
    lastName:"Vergara",
    nationality:"Colombiana",
    image:"kkkk",
    birthday:1972-7-10
}

test("POST-> URL_ACTORS, shoult return status code 201 ", async() => { 

    const res=await request(app)
    .post(URL_ACTORS)
    .send(actor)

    actorId=res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
 })


 test("Get All-> URL_ACTORS, should return status code 200, res.body to be defined and res.body.length === 1", async () => {

    const res = await request(app)
      .get(URL_ACTORS);
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body.length).toBe(1)
  });


  test("Get ONE -> '/api/v1/genres/:id', should return status code 200, res.body to be defined and res.body.name === actor.name", async () => {

    const res = await request(app)
      .get(`${URL_ACTORS}/${actorId}`);
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body.name).toBe(actor.name);
  }); 

  test("PUT -> URL_ACTORS, should return status code 200, res.body to be defined and res.body.name === actorUpdate.name", async () => {

    const actorUpdate={
    firstName:"Julieta"
}
    const res = await request(app)
      .put(`${URL_ACTORS}/${actorId}`)
      .send(actorUpdate)
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body.name).toBe(actorUpdate.name);
  }); 


  test("DELETE-> 'URL_ACTORS/:id', should return status code 204", async () => {

    const res = await request(app)
      .delete(`${URL_ACTORS}/${actorId}`);
  
    expect(res.status).toBe(204);
  
  }); 

  