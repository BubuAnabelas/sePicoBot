import { Puntos } from '../models/punto';
import * as activeChatters from '../helpers/activeChannelUsers.helper';

function saveAndGetTotalPoints(puntos, user, tags) {
  const total = puntos ? puntos.length + 1 : 1;
  const punto = new Puntos({ user, givenBy: tags.username });
  punto.save();
  return total;
}

export const punto = (client, args, channel, tags, message, self) => {
  try {
    if (args[0] && args[0].startsWith('@')) {
      args[0] = args[0].substring(1);
      let user = args[0].toLowerCase();
      activeChatters.getActiveUsers(channel).then(viewers => {
        if (viewers && viewers.find(u => u === user)) {
          Puntos.find({ user: user }, (err, puntos) => {
            if (err) throw new Error(err);
            if (puntos && user != tags.username) {
              const total = saveAndGetTotalPoints(puntos, user, tags);
              if (user !== 'menem91') {
                client.say(channel, `punto punto punto para la ${user} army! @${user} tiene ${total} puntos!`);
              } else {
                client.say(channel, `punto punto punto para la ${user} army! @${user} tiene -${total} puntos!`);
              }
            } else {
              client.say(channel, `No seas corrupto @${tags.username}!`);
            }
          });
        } else {
          client.say(channel, `${user} no esta en el chat, no se le puede dar los puntitos.`);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const puntos = (client, args, channel, tags, message, self) => {
  try {
    let user;
    if (args[0]) {
      args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
      user = args[0].toLowerCase();
    } else {
      user = tags.username;
    }
    Puntos.find({ user: user }, (err, puntos) => {
      if (err) throw new Error(err);
      if (puntos) {
        const total = puntos.length;
        if (user !== 'menem91') {
          client.say(channel, `@${user} tiene ${total} puntos!`);
        } else {
          client.say(channel, `@${user} tiene -${total} puntos!`);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const puntoyban = (client, args, channel, tags, message, self) => {
  try {
    if (args[0] && args[0].startsWith('@')) {
      args[0] = args[0].substring(1);
      let user = args[0].toLowerCase();
      activeChatters.getActiveUsers(channel).then(viewers => {
        if (viewers && viewers.find(u => u === user)) {
          Puntos.find({ user: user }, (err, puntos) => {
            if (err) throw new Error(err);
            if (puntos && user != tags.username) {
              const total = saveAndGetTotalPoints(puntos, user, tags);
              client.say(channel, `punto punto punto para la ${user} army! @${user} tiene ${total} puntos! Y UN BAN TAMBIEN`);
              client.timeout(channel, user, 120, `punto y ban`);
            } else {
              client.say(channel, `No seas corrupto @${tags.username}!`);
            }
          });
        } else {
          client.say(channel, `${user} no esta en el chat, no se le puede dar los puntitos.`);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

}
