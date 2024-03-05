const { Router } = require('express');
const { listaPokemons } = require('../controllers/pokemons.controller');

const router = Router();

router.get('/lista/:id/:limite', listaPokemons);

module.exports = router;