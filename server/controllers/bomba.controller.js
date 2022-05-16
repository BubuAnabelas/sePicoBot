import { Bomba } from '../models/bomba';
import * as activeChatters from '../helpers/activeChannelUsers.helper';
import { CONSTANTS } from '../constants/constants';

export const prenderBomba = (client, args, channel, tags, message, self) => {
  if (isMod(tags) || isStreamer(tags)) {
    try {
      Bomba.findOne({ state: 'Inactive' }, (err, inactiveBomb) => {
        if (err || !inactiveBomb) {
          client.say(channel, `@${tags.username} ya hay una bomba activa`);
          return;
        }
        activeChatters.getActiveUsers(channel).then(viewers => {
          let user;
          viewers = viewers.filter(user => user !== tags.username && user !== 'nightbot' && user !== 'sepicobot');
          if (args[0] && userInViewersList(args[0], viewers)) {
            user = normalizeUser(args[0]);
          } else {
            user = viewers[Math.floor(Math.random() * viewers.length)];
          }
          inactiveBomb.state = 'Active';
          inactiveBomb.userSender = tags.username;
          inactiveBomb.userReceiver = user;
          inactiveBomb.save();

          // tiempo para que explote (entre 30 segundos y 10 minutos)
          let explotes = Math.floor(Math.random() * CONSTANTS.BOMBA.EXPLOSION) + CONSTANTS.BOMBA.GRACIA;

          setTimeout(() => explodeBomb(client, channel), explotes);
          setTimeout(() => checkInactive(user, client, channel, tags), CONSTANTS.BOMBA.INACTIVO);

          client.say(
            channel,
            `@${tags.username} prendió una 💣 y la recibió @${user}, @${user} pasala escribiendo !pasarbomba @alguien`
          );
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
};

function explodeBomb(client, channel) {
  try {
    Bomba.findOne({ state: 'Active' }, (err, activeBomb) => {
      if (err || !activeBomb) {
        console.log('no se encontró una 💣 activa');
        return;
      }
      activeBomb.state = 'Inactive';
      activeBomb.save();
      client.say(channel, `💥💥💥@${activeBomb.userReceiver} te ESSPLOTÓ la 💣 en todo el oso💥💥💥`);
      client.timeout(channel, activeBomb.userReceiver, 120, `bomba`);
    });
  } catch (error) {
    console.log(error);
  }
}

function checkInactive(user, client, channel, tags) {
  try {
    Bomba.findOne({ state: 'Active' }, (err, activeBomb) => {
      if (err || !activeBomb) {
        console.log('ya no hay bomba activa');
        return;
      }
      if (activeBomb.userReceiver == user) {
        activeChatters.getRandomUser(channel, user).then(user => {
          passBombToUser(channel, client, user, tags, activeBomb, true);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const pasarBomba = (client, args, channel, tags, message, self) => {
  try {
    if (args[0]) {
      let user = normalizeUser(args[0]);
      Bomba.findOne({ state: 'Active' }, (err, activeBomb) => {
        if (err || !activeBomb || user === tags.username || activeBomb.userReceiver !== tags.username) return;
        activeChatters.getActiveUsers(channel).then(viewers => {
          if (viewers.includes(user) && user !== 'nightbot' && user !== 'sepicobot') {
            passBombToUser(channel, client, user, tags, activeBomb);
          } else {
            client.say(
              channel,
              `@${tags.username} bbbbbbboludx, el usuario @${user} no se encuentra en el chat o no existe. No seas pijerx y pasale la bomba a alguien que este en el chat`
            );
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

function passBombToUser(channel, client, user, tags, activeBomb, inactive = false) {
  activeBomb.userSender = activeBomb.userReceiver;
  activeBomb.userReceiver = user;
  activeBomb.save();

  if (inactive) {
    client.say(
      channel,
      `@${activeBomb.userSender} parece estar inactivo. La 💣 pasa a @${user}! pasa la 💣 antes de que te explote en el oso `
    );
  } else {
    client.say(
      channel,
      `@${activeBomb.userSender} Le paso la 💣 a  @${user}. @${user} pasa la 💣 antes de que te explote en el oso `
    );
  }

  //we add 30k seconds to prevent the bot to explode the bomb before the first 30 seconds
  setTimeout(() => checkInactive(user, client, channel, tags), CONSTANTS.BOMBA.INACTIVO);
}

export function desactivarBomba(client, args, channel, tags) {
  if (isMod(tags) || isStreamer(tags)) {
    try {
      Bomba.findOne({ state: 'Active' }, (err, activeBomb) => {
        if (err || !activeBomb) return;

        activeBomb.state = 'Inactive';
        activeBomb.save();
        client.say(channel, `@${tags.username} desactivo la 💣`);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function consultarBomba(client, args, channel, tags) {
  try {
    Bomba.findOne({ state: 'Active' }, (err, activeBomb) => {
      if (err || !activeBomb) {
        client.say(channel, `No hay una 💣 activa`);
      } else {
        client.say(channel, `La 💣 la tiene @${activeBomb.userReceiver}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
