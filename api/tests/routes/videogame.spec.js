/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Videogame, conn } = require('../../src/db.js');

// const agent = session(app);
// const videogame = {
//   name: 'Super Mario Bros',
// };

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Videogame.sync({ force: true })
//     .then(() => Videogame.create(videogame)));
//   describe('GET /videogames', () => {
//     it('should get 200', () =>
//       agent.get('/videogames').expect(200)
//     );
//   });
// });


const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require("uuid");

const agent = session(app);
const videogame = {
  name: "Grand Theft Pirulo",
  description: "descripcion",
  releaseDate: "2020-04-04",
  rating: 5,
  platforms: "pc",
  image: "URLimagen",
  genres: ["Indie", "Action"]
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true }).then(() => Videogame.create(videogame)));
  describe('POST /videogames', () => {
    it('should get 200', () =>  agent.get('/videogames').expect(200).timeout(40000));
      
  });
});

