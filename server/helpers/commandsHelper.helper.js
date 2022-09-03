import { CONSTANTS } from '../constants/constants';
import * as puntosController from '../controllers/puntos.controller';
import * as sePicoController from '../controllers/se-pico.controller';
import * as amonestacionesController from '../controllers/amonestaciones.controller';
import * as dadosController from '../controllers/dados.controller';
import * as bombaController from '../controllers/bomba.controller';
import * as cumpleController from '../controllers/cumple.controller';
import * as gatilloController from '../controllers/gatillos.controller';


var active = true;
export const executeCommand = (client, args, channel, tags, message, self, command) => {
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
    case CONSTANTS.COMMANDS.DISLIKE: {
      sePicoController.dislike(client, args, channel, tags, message, self);
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
    case CONSTANTS.COMMANDS.GATILLAR: {
      //esto es para cooldownear el comando, definitivamente hay que mejorarlo.
      if (active) {
        gatilloController.gatillo(client, args, channel, tags, message, self);
        active = false;
        setTimeout(() => {
            active = true;
        }, 180000); //2 minutos de cooldown
      } else {
        // Do stuff if the command is in cooldown
      }
    break;
    }
    case CONSTANTS.COMMANDS.CUMPLO: {
      cumpleController.cumplo(client, args, channel, tags, message, self);
      break;
    }
    case CONSTANTS.COMMANDS.CUMPLES: {
      cumpleController.cumples(client, args, channel, tags, message, self);
      break;
    }
    case CONSTANTS.COMMANDS.CUANDOCUMPLE: {
      cumpleController.cuandoCumple(client, args, channel, tags, message, self);
      break;
    }
    case CONSTANTS.COMMANDS.PUNTOYBAN: {
      if (tags.mod || tags.badges.broadcaster === '1') {
        puntosController.puntoyban(client, args, channel, tags, message, self);
      }
      break;
    }
  }
};