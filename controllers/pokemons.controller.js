const { request, respons } = require('express');
const axios = require('axios');
const  { generarNumeroRandom }  = require('../helpers/numeroRandom.helper');

const pokemonAleatorio = async(req = request, res = respons) => {
    
    const idAleatorio = await generarNumeroRandom(1, 1015)

    let url = `https://pokeapi.co/api/v2/pokemon/${idAleatorio}`;

    await axios.get(url)
    .then(respuesta => {
        let pokemon = respuesta.data;

        let name = pokemon.name;
        let id = pokemon.id;
        let front_sprite = pokemon.sprites.front_default;
        let back_sprite = pokemon.sprites.back_default;
        let move = pokemon.moves[0].move.name;

        let infoPokemon = {
            name,
            id,
            front_sprite,
            back_sprite,
            move
        };

        return res.status(200).json(infoPokemon);
    })
    .catch(error => {
        console.log(error)
        return res.status(500).json(error)
    })
}

module.exports = {
    pokemonAleatorio
}