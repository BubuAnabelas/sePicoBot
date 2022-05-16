import { CONSTANTS } from "../constants/constants";
import { Amonestaciones } from "../models/amonestaciones";
import { isMod, isStreamer, normalizeUser } from '../helpers/utils.helper';

export const amonestacion = (client, args, channel, tags, message, self) => {
  if (isMod(tags) || isStreamer(tags)) {
    try {
      if (args[0]) {
        let user = normalizeUser(args[0]);
        let amonestacionesDadas = args[1] ? parseInt(args[1]) : 1;
        if (isNaN(amonestacionesDadas) || amonestacionesDadas < 0) return;
        if (amonestacionesDadas > CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT) {
          amonestacionesDadas = CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT;
        }

        Amonestaciones.find({ user: user }, (err, amonestaciones) => {
          if (err) throw new Error(err);
          if (user == tags.username) return
          if (amonestaciones) {
            const amonestacionesPasadas = amonestaciones.reduce((acc, a) => acc + a.quantity, 0);
            const timeoutsDados = parseInt(amonestacionesPasadas / CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT, 10);
            const total = amonestacionesPasadas + amonestacionesDadas;
            const totalActuales = total - timeoutsDados * CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT;

            const amonestacion = new Amonestaciones({ user, givenBy: tags.username, quantity: amonestacionesDadas });
            amonestacion.save();
            if (parseInt(total / CONSTANTS.AMONESTACIONES.AMONESTACIONES_PARA_TIMEOUT, 10) > timeoutsDados) {
              client.timeout(
                channel,
                user,
                300,
                `strikes`
              );
              client.say(
                channel,
                `${user} se fue timeouteado por strikes`
              );
            } else {
              client.say(
                channel,
                `${user} tenes un total de ${totalActuales} strikes`
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
                `${user} se fue timeouteado por strikes`
              );
            } else {
              client.say(
                channel,
                `${user} tenes un total de ${total} strikes`
              );
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}