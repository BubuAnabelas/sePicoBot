const mongoose = require('mongoose');

const amonestacionesSchema = new mongoose.Schema(
  {
    user: String,
    givenBy: String,
    quantity: Number,
    timeouts: Number
  },
  { timestamps: true }
);

export const Amonestaciones = mongoose.model('Amonestaciones', amonestacionesSchema);
