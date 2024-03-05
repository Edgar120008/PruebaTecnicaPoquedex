import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { listaPokemons, pokemonPorNombre, pokemonAleatorio } from '../controllers/pokemons.controller.js';

describe('Prueba de pokemonPorNombre', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('debería devolver la información del pokemon cuando el nombre es válido', async () => {
    const nombrePokemon = 'pikachu';
    const infoPokemonMock = {
      name: 'pikachu',
      id: 25,
      front_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      back_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
      move: 'quick-attack'
    };

    mock.onGet(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`).reply(200, infoPokemonMock);

    const req = {
      params: {
        nombre: nombrePokemon
      }
    };
    const res = {
      status: function() {
        return this;
      },
      json: function() {}
    };

    sinon.spy(res, 'json');
    sinon.spy(res, 'status');

    await pokemonPorNombre(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, sinon.match(infoPokemonMock));
  });
});

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