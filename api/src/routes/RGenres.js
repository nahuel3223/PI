const { Router } = require('express');
const axios = require('axios')
require('dotenv').config()
const URL = 'https://api.rawg.io/api/genres';
const router = Router();
const {YOUR_API_KEY} = process.env;
const apiKey = `?key=${YOUR_API_KEY}`
const { Genre } = require("../db")
//const genresjson = require("../json/videogames-genres.json");

router.get('/', async (req, res)=>{
        try {
            let genresDb = await Genre.findAll();

            if(!genresDb.length){
                const getGenresApi =(await axios.get(URL + apiKey)).data
                const genresNames = getGenresApi.results
                let apiNames = [];

                genresNames.map((g) =>
                    apiNames.push({
                        id: g.id,
                        name: g.name
                    })
                )

                const genresToDb = await Genre.bulkCreate(apiNames);
                res.send(apiNames)
            }
            else{
                let allGenresMap = genresDb.map((g) =>{
                    return { 
                        id: g.id,
                        name: g.name
                    }
                });
                res.send(allGenresMap)
            }
        } catch (error) {
            res.send(error)
        }
})

module.exports = router;