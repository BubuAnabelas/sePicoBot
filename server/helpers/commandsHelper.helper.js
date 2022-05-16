import { match } from 'ts-pattern';
import { CONSTANTS } from '../constants/constants';
import {
  puntosController,
  sePicoController,
  amonestacionesController,
  dadosController,
  bombaController,
  cumpleController
} from '../controllers/puntos.controller';

export const executeCommand = (client, args, channel, tags, message, self, command) => {
  match(command)
    .with(CONSTANTS.COMMANDS.PUNTO, () => puntosController.punto(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.PUNTOS, () => puntosController.puntos(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.LIKE, () => sePicoController.like(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.DISLIKE, () => sePicoController.dislike(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.AMONESTACION, () => amonestacionesController.amonestacion(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.DADOS, () => dadosController.dados(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.PRENDERBOMBA, () => bombaController.prenderBomba(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.PASARBOMBA, () => bombaController.pasarBomba(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.DESACTIVARBOMBA, () => bombaController.desactivarBomba(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.CONSULTARBOMBA, () => bombaController.consultarBomba(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.CUMPLO, () => cumpleController.cumplo(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.CUMPLES, () => cumpleController.cumples(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.CUANDOCUMPLE, () => cumpleController.cuandoCumple(client, args, channel, tags, message, self))
    .with(CONSTANTS.COMMANDS.PUNTOYBAN, () => puntosController.puntoyban(client, args, channel, tags, message, self))
    .otherwise(() => null)
};