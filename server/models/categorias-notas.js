const mongoose = require('mongoose');

const categoriaNotaSchema = new mongoose.Schema(
  {
    categoria: String, 
    color: String
  },
  { timestamps: true }
);

export const CategoriaNota = mongoose.model('CategoriaNota', categoriaNotaSchema);
