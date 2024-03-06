import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import sinon from 'sinon';
import { pokemonPorNombre } from '../controllers/pokemons.controller.js';

describe('pokemonPorNombre', () => {
    let mock;
    let res;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
    });

    afterEach(() => {
        mock.restore();
    });

    it('debería devolver información del pokemon cuando el nombre es válido', async () => {
        const pokemonData = {
            name: 'pikachu',
            id: 25,
            sprites: {
                front_default: 'front_sprite_url',
                back_default: 'back_sprite_url'
            },
            moves: [{ move: { name: 'quick-attack' } }]
        };
        mock.onGet('https://pokeapi.co/api/v2/pokemon/pikachu').reply(200, pokemonData);

        const req = { params: { nombre: 'pikachu' } };
        await pokemonPorNombre(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(sinon.match(pokemonData))).to.be.true;
    });

    it('debería devolver un error 404 cuando el pokemon no existe', async () => {
        mock.onGet('https://pokeapi.co/api/v2/pokemon/invalid').reply(404);

        const req = { params: { nombre: 'invalid' } };
        await pokemonPorNombre(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'Este pokemon no existe, intente con otro nombre o id valido' }))).to.be.true;
    });
});
