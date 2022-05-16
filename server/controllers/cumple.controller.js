import { Cumple } from '../models/cumple';
import { normalizeUser } from '../helpers/utils.helper';

export const cumplo = (client, args, channel, tags, message, self) => {
  let user = tags.username;
  if (args[0]) {
    let inputDate = args[0];
    try {
      let updateData = extractDateFromArgs(inputDate);
      Cumple.findOneAndUpdate({user: user}, updateData, { new: true, upsert: true }, function(err, cumple) {
        if (err) throw new Error(err);
        client.say(channel, `@${user} tu cumple fue guardado`)
      });
    } catch (error) {
      client.say(channel, `@${user} ingresa una fecha valida en formato dd/mm o dd/mm/yyyy`)
    }
  }
  else {
    client.say(channel, `@${user} ingresa una fecha valida en formato dd/mm o dd/mm/yyyy`)
  }
}

export const cumples = (client, args, channel, tags, message, self) => {
  try {
    const offset = -8;
    const todayString = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
    const today = new Date(todayString)
    Cumple.find({ birthdayDay: today.getDate(), birthdayMonth: today.getMonth() +1  }, 'user -_id', (err, cumples) => {
      if (err) throw new Error(err);
      if (cumples) {
        const total = cumples.length;
        cumples = cumples.map((cumple) => cumple.user).join(', ')
        let message = ''
        if(cumples.length > 0) {
          message =  `Hoy cumplen ${cumples}`
        }
        else {
          message =  `Hoy no cumple nadie`
        }
        client.say(channel, message);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const cuandoCumple = (client, args, channel, tags, message, self) => {
  try {
    let user = normalizeUser(args[0]);
    Cumple.findOne({ user: user}, 'birthdayDay birthdayMonth -_id', (err, cumple) => {
      if (err) throw new Error(err);
      if (cumple) {
        client.say(channel, `@${user} cumple el ${cumple.birthdayDay}/${cumple.birthdayMonth}`);
      }
      else {
        client.say(channel, `@${user} es un zanganx y no registro su cumpleaños`);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//TODO: change this function to process everything without going through the array twice
function extractDateFromArgs(date) {
  date = date.split('/')
  date.filter(Boolean)
  if(date.length < 2)  throw "error";
  const birthdayDay = date[0]
  const birthdayMonth = date[1]
  const birthdayYear = date[2] ? date[2] : 2000

  return {birthdayDay, birthdayMonth, birthdayYear}
}