const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genres = require('./RGenres');
const videogame = require('./RVideogame');
const videogames = require('./RVideogames.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogame', videogame);
router.use('/videogames', videogames);
router.use('/genres', genres);

module.exports = router;
