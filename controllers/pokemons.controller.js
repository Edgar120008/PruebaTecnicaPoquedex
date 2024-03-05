const { request, response } = require('express');
const axios = require('axios');
const  { generarNumeroRandom }  = require('../helpers/numeroRandom.helper');

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

const listaPokemons = async(req = request, res = response) => {
    
    const id = req.params.id;
    const limite = parseInt(req.params.limite);

    let url = 'https://pokeapi.co/api/v2/pokemon?';

    if (id) {
        if(isNaN(id)){
            return res.status(400).json({message:'Introdusca solo datos numericos para comenzar la busqueda de pokemones desde el id'})
        }
        else if(id==='0'){
            return res.status(400).json({message:'Introdusca solo datos mayores a 0 para realizar el la busqueda de pokemones que se mostraran dsde el id ingresado'})
        }
        else{    
            url += `offset=${id - 1}&`;
        }
    }
    if (limite) {
        if(isNaN(limite)){
            return res.status(400).json({message:'Introdusca solo datos numericos para realizar el limite de pokemones que se mostraran'})
        }
        else if(limite==='0'){
            return res.status(400).json({message:'Introdusca solo datos mayores a 0 para realizar el limite de pokemones que se mostraran'})
        }
        else{    
            url += `limit=${limite + 1}&`;
        }
    }

    await axios.get(url)
    .then(async (response) => {
        const pokemons = response.data.results;
        let detailedPokemons = [];
        let promises = [];

        for (let i = 0; i < pokemons.length; i++) {
            promises.push(
                axios.get(pokemons[i].url)
                .then((response) => {
                    let pokemon = {
                        name: response.data.name,
                        id: response.data.id,
                        front_sprite: response.data.sprites.front_default,
                        back_sprite: response.data.sprites.back_default,
                        move: response.data.moves.length > 0 ? response.data.moves[0].move.name : 'No moves'
                    };
                    detailedPokemons.push(pokemon);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({message: 'Error en el servidor', error});
                })
            );
        }

        await Promise.all(promises);
        return res.status(200).json({pokemons: detailedPokemons});
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: 'Error en el servidor', error});
    });
}

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
    listaPokemons,
    pokemonPorNombre,
    pokemonAleatorio
}