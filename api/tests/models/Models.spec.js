const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v4: uuidv4 } = require("uuid");

const videogame ={
  id: uuidv4(),
  name: "Grand Theft Pirulo",
  description: "descripcion",
  releaseDate: "2020-04-04",
  rating: 5,
  platforms: "pc",
  image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Grand_Theft_Auto_Vice_City_logo.svg",
  genres: ["Indie", "Action"]
};

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("nulls", () => {

      it("should throw an error if name is null", (done) => {
        Videogame.create({
          description:"description test",
          platforms:"platforms",
        })
        .then(res => console.log(res))
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should throw an error if description is null", (done) => {
        Videogame.create({
          name:"title",
          platforms:"platforms",
        })
          .then(() => done(new Error("It requires a valid description")))
          .catch(() => done());
      });

      it("should throw an error if platforms is null", (done) => {
        Videogame.create({
          name:"title",
          description:"description test",
        })
        .then((res) => console.log(res))
          .then(() => done(new Error("It requires a valid platform")))
          .catch(() => done());
      });
    })
  })
})
        //   expect(await Videogame.findAll({
        //     where:{ name: "Super Mario Bros" }
        // })).to.have.lengthOf(0);
        // });

