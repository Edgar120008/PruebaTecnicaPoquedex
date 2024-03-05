const { request, respons } = require('express');
const axios = require('axios');
const { generarNumeroRandom } = require('../helpers/numeroRandom.helper');

const pokemonAleatorio = async(req = request, res = respons) => {
    
    const idAleatorio = generarNumeroRandom(1, 1015)

    console.log(idAleatorio)

    let url = 'https://pokeapi.co/api/v2/pokemon?';

   
}

module.exports = {
    pokemonAleatorio
}