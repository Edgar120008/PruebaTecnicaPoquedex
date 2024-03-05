const express = require('express');
const path = require('path');


class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.rutaPokemon = '/pokemon';

        //middlewares() 
        this.middlewares();

        this.routes();

    }

    //middlewares
    middlewares() {

        this.app.use(express.json());

    }

    //Rutas...
    routes() {

        this.app.use(this.rutaPokemon, require('../routers/pokemon.routers')); //1


    }

    listen() {
        this.app.listen(this.port, console.log('Servidor de pruebas a la espera de instrucciones (DEV)...'));

    }
}

module.exports = Server;