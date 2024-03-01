const { request, respons } = require('express');
const axios = require('axios');

const getPokemons = async(req = request, res = respons) => {
    
    const limite = parseInt(req.body.limite);
    const busqueda = req.body.busqueda;

    let url = 'https://pokeapi.co/api/v2/pokemon?';

    if (limite) {
        if(isNaN(limite)){
            return res.status(400).json({message:'Introdusca solo datos numericos para realizar el limite de pokemones que se mostraran'})
        }
        else if(limite==='0'){
            return res.status(400).json({message:'Introdusca solo datos mayores a 0 para realizar el limite de pokemones que se mostraran'})
        }
        else{    
            url += `limit=${limite}&`;
        }
    }

}