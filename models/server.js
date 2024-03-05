import express from 'express';
import path from 'path';
import pokemonRouter from '../routers/pokemon.routers.js';

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

        this.app.use(this.rutaPokemon, pokemonRouter);


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor de pruebas a la espera de instrucciones (DEV)...');
        });
    }
}

export default Server;