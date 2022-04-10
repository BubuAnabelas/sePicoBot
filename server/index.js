const path = require('path');
const tmi = require('tmi.js');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

import { Puntos } from './models/punto';
import * as commandsHelper from './helpers/commandsHelper.helper';

if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: path.resolve(process.cwd(), './server/config/.env') });

mongoose.connect(process.env.DB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('conectado');
});
mongoose.set('useFindAndModify', false);

const express = require('express');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const canalDeTwitch = process.env.CANAL;

app.use(express.static(path.join(__dirname, '..', 'build')));

app.listen(process.env.PORT, () => console.log('Se pico bot en ' + process.env.PORT || 80));

/* app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
 });*/
require('./apis')(app);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  app.get('/reset', (req, res) => {
    try {
      Puntos.remove({}, (puntos) => {
        res.send('puntos borrados');
      });
    } catch (error) { }
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
    commandsHelper.executeCommand(client, args, channel, tags, message, self, command);
  } catch (error) {
    console.log(error);
  }
});
