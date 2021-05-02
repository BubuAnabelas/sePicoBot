const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema(
  {
    titulo: String,
    nota: String,
    archivada: { type: Boolean, default: false },
    orden: Number,
    layout: { type: mongoose.Schema.Types.Mixed },
    color: String,
  },
  { timestamps: true }
);

export const Nota = mongoose.model('Nota', notaSchema);
