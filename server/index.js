const path = require('path');
const tmi = require('tmi.js');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

import * as puntosController from './controllers/puntos.controller';
import * as sePicoController from './controllers/se-pico.controller';
import * as dadosController from './controllers/dados.controller';
import * as amonestacionesController from './controllers/amonestaciones.controller';
import * as bombaController from './controllers/bomba.controller';
import { Puntos } from './models/punto';
import { CONSTANTS } from './constants/constants';

if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: path.resolve(process.cwd(), './server/config/.env') });

mongoose.connect(process.env.DB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('conectado');
});

const express = require('express');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const canalDeTwitch = 'ieltxu';

app.use(express.static(path.join(__dirname, '..', 'build')));

app.listen(process.env.PORT, () => console.log('Se pico bot en ' + process.env.PORT || 80));

/* app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
 });*/
require('./apis')(app);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  app.get('/reset', (req, res) => {
    try {
      Puntos.remove({}, (err, puntos) => {
        res.send('puntos borrados');
      });
    } catch (error) {}
  });
}

const options = {
  options: {
    debug: false
  },
  connection: {
    cluster: 'aws',
    reconnect: true
  },
  identity: {
    username: 'SePicoBot',
    password: process.env.TWITCH_OAUTH
  },
  channels: [canalDeTwitch]
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
          puntosController.punto(client, args, channel, tags, message, self);
        }
        break;
      }
      case CONSTANTS.COMMANDS.PUNTOS: {
        puntosController.puntos(client, args, channel, tags, message, self);
        break;
      }
      case CONSTANTS.COMMANDS.LIKE: {
        sePicoController.like(client, args, channel, tags, message, self);
        break;
      }
      case CONSTANTS.COMMANDS.AMONESTACION: {
        if (tags.mod || tags.badges.broadcaster === '1') {
          amonestacionesController.amonestacion(client, args, channel, tags, message, self);
        }
        break;
      }
      case CONSTANTS.COMMANDS.DADOS: {
        dadosController.dados(client, args, channel, tags, message, self);
        break;
      }
      case CONSTANTS.COMMANDS.PRENDERBOMBA: {
        if (tags.mod || tags.badges.broadcaster === '1') {
          bombaController.prenderBomba(client, args, channel, tags, message, self);
        }
        break;
      }
      case CONSTANTS.COMMANDS.PASARBOMBA: {
        bombaController.pasarBomba(client, args, channel, tags, message, self);
        break;
      }
      case CONSTANTS.COMMANDS.DESACTIVARBOMBA: {
        if (tags.mod || tags.badges.broadcaster === '1') {
          bombaController.desactivarBomba(client, args, channel, tags, message, self);
        }
        break;
      }
      case CONSTANTS.COMMANDS.CONSULTARBOMBA: {
        bombaController.consultarBomba(client, args, channel, tags, message, self);
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }
});
