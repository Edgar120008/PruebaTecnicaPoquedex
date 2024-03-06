import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { listaPokemons } from '../controllers/pokemons.controller.js';
import sinon from 'sinon';

describe('Pruebas para listaPokemons', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('debería devolver una lista de pokemons', async () => {
        const fakeData = {
            results: [
                { url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { url: 'https://pokeapi.co/api/v2/pokemon/2/' }
            ]
        };
        const pokemonData = {
            name: 'bulbasaur',
            id: 1,
            sprites: { front_default: 'url', back_default: 'url' },
            moves: [{ move: { name: 'tackle' } }]
        };
        const req = { params: { id: '1', limite: '2' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

        mock.onGet('https://pokeapi.co/api/v2/pokemon?offset=0&limit=3&').reply(200, fakeData);
        mock.onGet('https://pokeapi.co/api/v2/pokemon/1/').reply(200, pokemonData);
        mock.onGet('https://pokeapi.co/api/v2/pokemon/2/').reply(200, pokemonData);

        await listaPokemons(req, res);
        expect(res.json.calledWith({ pokemons: [{ name: 'bulbasaur', id: 1, front_sprite: 'url', back_sprite: 'url', move: 'tackle' }, { name: 'bulbasaur', id: 1, front_sprite: 'url', back_sprite: 'url', move: 'tackle' }] })).to.be.true;
    });
});