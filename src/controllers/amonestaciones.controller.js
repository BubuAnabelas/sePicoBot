import { CONSTANTS } from "../constants/constants";
import { Amonestaciones } from "../models/amonestaciones";

export const amonestacion = (client, args, channel, tags, message, self) => {
  console.log(args)
  try {
    if (args[0] && args[0].startsWith('@')) {
      args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
      let amonestacionesDadas = args[1] || 5;
      if (isNaN(amonestacionesDadas) || amonestacionesDadas < 0) return;
      if (amonestacionesDadas > CONSTANTS.AMONESTACIONES_PARA_TIMEOUT) {
        amonestacionesDadas = CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT;
      }
      let user = args[0].toLowerCase();
      Amonestaciones.find({ user: user }, (err, amonestaciones) => {
        if (err) throw new Error(err);
        if (user != tags.username) return
        if (amonestaciones) {
          const amonestacionesPasadas = amonestaciones.reduce((acc, a => acc + a), 0);
          const timeoutsDados = parseInt(amonestacionesPasadas / CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT, 10);
          const total = amonestacionesPasadas + amonestacionesPasadas;
          const totalActuales = total - timeoutsDados * CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT;

          const amonestacion = new Amonestaciones({ user, givenBy: tags.username, quantity: amonestacionesDadas });
          amonestacion.save();
          if (parseInt(total / CONSTANTS.AMONESTACIONES_PARA_TIMEOUT, 10) > timeoutsDados) {
            client.say(
              channel,
              `/timeout @${user} 300`
            );
            client.say(
              channel,
              `${user} se fue timeouteado por amonestaciones`
            );
          } else {
            client.say(
              channel,
              `${user} tenes un total de ${totalActuales} amonestaciones`
            );
          }
        } else {
          const amonestacion = new Amonestaciones({ user, givenBy: tags.username, quantity: amonestacionesDadas });
          amonestacion.save();
          if (amonestacionesDadas === CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT) {
            client.say(
              channel,
              `/timeout @${user} 300`
            );
            client.say(
              channel,
              `${user} se fue timeouteado por amonestaciones`
            );
          } else {
            client.say(
              channel,
              `${user} tenes un total de ${total} amonestaciones`
            );
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}