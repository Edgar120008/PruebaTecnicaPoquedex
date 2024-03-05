import { Router } from 'express';
import { listaPokemons, pokemonPorNombre, pokemonAleatorio } from '../controllers/pokemons.controller.js';

const router = Router();

router.get('/pokemonPorNombre/:nombre', pokemonPorNombre);

router.get('/lista/:id/:limite', listaPokemons);

router.get('/aleatorio', pokemonAleatorio);

export default router;
