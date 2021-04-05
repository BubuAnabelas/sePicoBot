import { Puntos } from '../models/punto';


export const punto = (client, args, channel, tags, message, self) => {
  try {
    if (args[0] && args[0].startsWith('@')) {
      args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
      let user = args[0].toLowerCase();
      Puntos.find({ user: user }, (err, puntos) => {
        if (err) throw new Error(err);
        if (puntos && user != tags.username) {
          const total = puntos ? puntos.length + 1 : 1;
          const punto = new Puntos({ user, givenBy: tags.username });
          punto.save();
          if (user !== 'menem91') {
            client.say(
              channel,
              `punto punto punto para la ${user} army! @${user} tiene ${total} puntos!`
            );
          } else {
            client.say(
              channel,
              `punto punto punto para la ${user} army! @${user} tiene -${total} puntos!`
            );
          }
        } else {
          client.say(channel, `No seas corrupto @${tags.username}!`);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export const puntos = (client, args, channel, tags, message, self) => {
  try {
    if (args[0] && args[0].startsWith('@')) {
      args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
      let user = args[0].toLowerCase();
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
    }
  } catch (error) {
    console.log(error);
  }
}