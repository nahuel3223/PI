/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);
const videogame = {
  name: "Grand Theft Pirulo",
  description: "descripcion",
  releaseDate: "2020-04-04",
  rating: 5,
  platforms: "pc",
  image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Grand_Theft_Auto_Vice_City_logo.svg",
  genres: ["Indie", "Action"]
};

describe('RoutesTest', () => {
  describe('POST /videogames', async () => {
    it('should create videogame', async () => {
      const res = await agent
      .post('/videogames')
      .send(videogame);;
      expect(res.body).to.be.a("object");
    });
  })
  describe('GET / videogames', () =>{
    it('query name', async () => {
      const res = await agent
      .get('/videogames?name=mario')
      expect(res.body.every(g => g.name.toLowerCase().includes("mario"))).to.equal(true)
    })
    it('no query name', async () => {
      const res = await agent
      .get('/videogames')
      expect(res.body.length > 0).to.equal(true)
    }).timeout(20000)
  })
})



