const tmi = require('tmi.js');
const mongoose = require('mongoose');
import * as puntosController from './controllers/puntos.controller';
import * as sePicoController from './controllers/se-pico.controller';
import * as amonestacionesController from './controllers/amonestaciones.controller';
import { Puntos } from './models/punto';
import { CONSTANTS } from './constants/constants';
mongoose.connect(process.env.DB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('conectado');
});

const express = require('express');
const app = express();
const canalDeTwitch = 'ieltxu';
app.listen(process.env.PORT, () =>
  console.log('Se pico bot en ' + process.env.PORT || 80)
);

app.get('/', (req, res) => {
  try {
    Puntos.find((err, puntos) => {
      if (puntos) {
        res.send(puntos);
      }
    });
  } catch (error) { }
});
app.get('/reset', (req, res) => {
  try {
    Puntos.remove({}, (err, puntos) => {
      res.send('puntos borrados');
    });
  } catch (error) { }
});

const options = {
  options: {
    debug: false,
  },
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: 'SePicoBot',
    password: process.env.TWITCH_OAUTH,
  },
  channels: [canalDeTwitch],
};

const client = new tmi.client(options);

client.connect();

client.on('message', (channel, tags, message, self) => {
  try {
    if (self || !message.startsWith('!')) return;
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    switch (command) {
      case CONSTANTS.COMMANDS.PUNTO: {
        if (tags.mod || tags.badges.broadcaster === '1') {
          puntosController.punto(args, channel, tags, message, self);
        }
        break;
      }
      case CONSTANTS.COMMANDS.PUNTOS: {
        puntosController.puntos(args, channel, tags, message, self);
        break;
      }
      case CONSTANTS.COMMANDS.LIKE: {
        sePicoController.like(args, channel, tags, message, self)
      }
      case CONSTANTS.COMMANDS.LIKE: {
        sePicoController.like(args, channel, tags, message, self)
      }
      case CONSTANTS.COMMANDS.AMONESTACIONES: {
        amonestacionesController.amonestacion(args, channel, tags, message, self)
      }
    }
  } catch (error) {
    console.log(error);
  }
});


