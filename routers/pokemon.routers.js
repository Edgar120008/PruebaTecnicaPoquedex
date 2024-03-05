const { Router } = require('express');
const { listaPokemons, pokemonPorNombre } = require('../controllers/pokemons.controller');

const router = Router();

router.get('/pokemonPorNombre/:nombre', pokemonPorNombre);

router.get('/lista/:id/:limite', listaPokemons);

module.exports = router;