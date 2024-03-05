const { request, respons } = require('express');
const axios = require('axios');

const pokemonPorNombre = async(req = request, res = respons) => {
    
    const nombre = req.params.nombre;

    if(!nombre){
        return res.status(400).json({message: 'Ingresa un nombre de un pokemon valiodo o un id'})
    }

    let url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

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
    pokemonPorNombre
}