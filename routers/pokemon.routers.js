const { Router } = require('express');
const { pokemonPorNombre } = require('../controllers/pokemons.controller');

const router = Router();

router.get('/pokemonPorNombre/:nombre', pokemonPorNombre);

module.exports = router;