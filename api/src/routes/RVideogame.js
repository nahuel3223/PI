const { Router } = require('express');
const axios = require('axios')
//require('dotenv').config()
const URL = `https://api.rawg.io/api/games/`;
const router = Router();
const {YOUR_API_KEY} = process.env;
const apiKey = `?key=${YOUR_API_KEY}`
const { Videogame, Genre } = require("../db.js")
var validate = require("uuid-validate");


router.get("/:id", async (req, res)=>{

    try {
        const { id } = req.params;

        if (!validate(id)){
            try {
                let apiGame = (await axios.get(URL+`${req.params.id}`+apiKey)).data;

            const { id, background_image, name, genres, description_raw, released, rating, platforms } = apiGame;
            const platformsNames = (platforms.map((p) => p.platform.name)).join(", ");

            const gameFinal = {
                id: id,
                name: name,
                image: background_image,
                genres: genres.map((g) => g.name),
                description: description_raw,
                released: released,
                rating: Math.round(rating),
                platforms: platformsNames,
            }
            res.send(gameFinal)
            } catch (error) {
                res.send("El id solicitado no existe")
            }
            

        } else if(validate(id)){
            try {
                const videogameDb = await Videogame.findByPk(id, {
                include: Genre,
            });

            if(videogameDb.length == 0){
                res.send("El id solicitado no existe")
            }else{
                res.send(videogameDb)
            }
            } catch (error) {
                res.send(error)
            }
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;