const mongoose = require('mongoose');

const bombaSchema = new mongoose.Schema(
  {
    userSender: String,
    userReceiver: String,
    state: String,
  },
  { timestamps: true }
);

export const Bomba = mongoose.model('Bomba', bombaSchema);
