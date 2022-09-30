const { Router } = require('express');
const axios = require('axios')
//require('dotenv').config()
const URL = 'https://api.rawg.io/api/games';
const router = Router();
const {YOUR_API_KEY} = process.env;
const apiKey = `?key=${YOUR_API_KEY}`
const { Videogame, Genre } = require("../db.js")
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");


router.get('/', async (req, res)=>{

    if(req.query.name){
        const { name } = req.query;
        
        let responseDb = await Videogame.findAll({
            include: Genre,
            where:{
                name:{[Op.iLike]: `%${name}%`}
            }
        });

        let responseApi = (await axios.get(URL + apiKey + `&search={${name}}`)).data;

        if(responseApi.count == 0 && responseDb.length == 0) return res.status(404).send(`El Juego "${name}" no existe`);

        const apiFound = responseApi.results.map((g) =>{
            return{
                id: g.id,
                name: g.name,
                image: g.background_image,
                rating: Math.round(g.rating),
                platforms: (g.platforms.map((p) => p.platform.name)).join(", "),
                genres: g.genres.map(g => g.name),
                released: g.released,
            }
        })

        const totalFound = [...responseDb, ...apiFound].splice(0, 15);

        try {
            res.send(totalFound)
        } catch (error) {
            res.send(error)
        }

    } else {

        let responseDb = await Videogame.findAll({
            include: Genre
        });

        let responseAPI = (await axios.get(`${URL + apiKey}`)).data;
        let allGames =  [...responseDb]
    
        while(responseAPI.next.slice(-1) <= 6){
        let gamesApi = responseAPI.results.map(g => {
            return{
                id: g.id,
                name: g.name,
                image: g.background_image,
                rating: g.rating,
                platforms: (g.platforms.map((p) => p.platform.name)).join(", "),
                genres: g.genres.map(g => g.name),
            }
        })

        allGames = [...allGames, ... gamesApi];
        responseAPI = (await axios.get(responseAPI.next)).data;
        }

        try {
            res.send(allGames)
        } catch (error) {
            res.send(error)
        }
    }
})

//------------------------------------------------------------------------------------------------------

router.post('/', async (req, res)=>{
    const { name, description, releaseDate, rating, platforms, genres, image } = req.body;

    try {
        let newGame = await Videogame.create({
            id: uuidv4(), 
            name, 
            description, 
            releaseDate, 
            rating, 
            platforms,
            image
        })

        let findGenreDb = await Genre.findAll({
            where: {
            name: genres,
            }
        })

        let findIdDb = findGenreDb.map((g) => {
            return g.id
        })

        await newGame.addGenre(findIdDb);
        res.status(200).send(newGame);
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;