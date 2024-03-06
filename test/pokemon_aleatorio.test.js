import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { pokemonAleatorio } from '../controllers/pokemons.controller.js';
import sinon from 'sinon';

describe('Pruebas para pokemonAleatorio', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('debería devolver un pokemon aleatorio', async () => {
        const pokemonData = {
            name: 'bulbasaur',
            id: 1,
            sprites: { front_default: 'url', back_default: 'url' },
            moves: [{ move: { name: 'tackle' } }]
        };
        const req = { params: {} };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

        mock.onGet('https://pokeapi.co/api/v2/pokemon/1').reply(200, pokemonData);

        await pokemonAleatorio(req, res);
        expect(res.json.calledWith({ name: 'bulbasaur', id: 1, front_sprite: 'url', back_sprite: 'url', move: 'tackle' })).to.be.true;
    });
});