// const { Videogame, conn } = require('../../src/db.js');
// const { expect } = require('chai');

// describe('Videogame model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Videogame.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Videogame.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Recipe.create({ name: 'Super Mario Bros' });
//       });
//     });
//   });
// });



const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v4: uuidv4 } = require("uuid");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("title", () => {
      it("should throw an error if title is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Videogame.create({
          id: uuidv4(),
          name: "Super Mario Bros",
          description: "this is a supermario bros videogame",
          image:
            " https://image.api.playstation.com/vulcan/ap/rnd/202010/1220/zoRNQGzwMQRJDpRSKjifE1vu.png",
        });
      });

      it("should receive an object for videogame", () => {
        let videogame = {
          id: uuidv4(),
          name: "Super Mario Bros",
          description: "this is a supermario bros videogame",
          image:
            " https://image.api.playstation.com/vulcan/ap/rnd/202010/1220/zoRNQGzwMQRJDpRSKjifE1vu.png",
        };
        expect(videogame).to.be.a("object");
      });
      it("should receive a number in rating properties", () => {
        let videogame = {
          name: "Super Mario Bros",
          description: "this is a supermario bros videogame",
          image:
            " https://image.api.playstation.com/vulcan/ap/rnd/202010/1220/zoRNQGzwMQRJDpRSKjifE1vu.png",
          rating: "5",
        };
        expect(videogame).to.be.a("object");
        expect(typeof videogame.rating === "number").to.equal(false);
      });
    });
  });
});

