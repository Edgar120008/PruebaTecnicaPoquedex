const { Router } = require('express');
const { pokemonAleatorio } = require('../controllers/pokemons.controller');

const router = Router();

router.get('/aleatorio', pokemonAleatorio);

module.exports = router;