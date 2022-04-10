import { Cumple } from '../models/cumple';

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
    const today = new Date()
    Cumple.find({ birthdayDay: today.getDate(), birthdayMonth: today.getMonth() +1  }, 'user -_id', (err, cumples) => {
      if (err) throw new Error(err);
      if (cumples) {
        const total = cumples.length;
        cumples = cumples.map((cumple) => cumple.user).join(', ')
        client.say(channel, `Hoy cumplen ${cumples}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const cuandoCumple = (client, args, channel, tags, message, self) => {
  try {
    args[0] = args[0].substring(1);
    let user = args[0].toLowerCase();
    Cumple.findOne({ user: user}, 'birthdayDay birthdayMonth -_id', (err, cumple) => {
      if (err) throw new Error(err);
      if (cumple) {
        client.say(channel, `@${user} cumple el ${cumple.birthdayDay}/${cumple.birthdayMonth}`);
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