const { request, response } = require('express');
const axios = require('axios');

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



module.exports = {
    listaPokemons
}