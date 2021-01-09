const mongoose = require('mongoose');

const puntoSchema = new mongoose.Schema(
  {
    user: String,
    givenBy: String,
  },
  { timestamps: true }
);

export const Puntos = mongoose.model('Puntos', puntoSchema);
