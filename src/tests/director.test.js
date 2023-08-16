const request=require("supertest")
const app=require('../app')

require('../models')
let directorId
const URL_DIRECTORS='/api/v1/directors'

const director={
    firstName:"Patty",
    lastName:"Jenkins",
    nationality:"Estadounidense",
    image:"kkkk",
    birthday:1971-7-24
}

test("POST-> URL_DIRECTORS, shoult return status code 201 ", async() => { 

    const res=await request(app)
    .post(URL_DIRECTORS)
    .send(director)

    directorId=res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
 })


 test("Get All-> URL_DIRECTORS, should return status code 200, res.body to be defined and res.body.length === 1", async () => {

    const res = await request(app)
      .get(URL_DIRECTORS);
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body.length).toBe(1)
  });


  test("Get ONE -> '/api/v1/genres/:id', should return status code 200, res.body to be defined and res.body.firstName === director.firstName", async () => {

    const res = await request(app)
      .get(`${URL_DIRECTORS}/${directorId}`);
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
  }); 

  test("PUT -> URL_DIRECTORS, should return status code 200, res.body to be defined and res.body.firstName === directorUpdate.firstName", async () => {

    const directorUpdate={
    firstName:"Julieta"
}
    const res = await request(app)
      .put(`${URL_DIRECTORS}/${directorId}`)
      .send(directorUpdate)
  
    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body.firstName).toBe(directorUpdate.firstName);
  }); 


  test("DELETE-> 'URL_DIRECTORS/:id', should return status code 204", async () => {

    const res = await request(app)
      .delete(`${URL_DIRECTORS}/${directorId}`);
  
    expect(res.status).toBe(204);
  
  }); 

  