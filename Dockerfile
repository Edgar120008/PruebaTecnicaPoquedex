FROM node:20.10.0

WORKDIR /PokedexPrueba
COPY package.json .
RUN npm install

COPY . .
CMD npm run dev