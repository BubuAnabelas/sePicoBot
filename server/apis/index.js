import * as notasController from '../apis/notas/notas.controller';
import * as puntosController from '../apis/puntos/puntos.controller';

module.exports = function(app){
  app.get('/api/notas', notasController.getAllNotes);
  app.post('/api/notas', notasController.createNote);
  app.put('/api/notas/:id', notasController.updateNote);

  app.get('/api/puntos', puntosController.getAllPoints);
  //other routes..
};