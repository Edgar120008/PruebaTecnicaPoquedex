const { Router } = require('express');
const { listaPokemons, pokemonPorNombre, pokemonAleatorio } = require('../controllers/pokemons.controller');

const router = Router();

router.get('/pokemonPorNombre/:nombre', pokemonPorNombre);

router.get('/lista/:id/:limite', listaPokemons);

router.get('/aleatorio', pokemonAleatorio);

module.exports = router;