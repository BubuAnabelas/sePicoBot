const mongoose = require('mongoose');

const cumpleSchema = new mongoose.Schema(
  {
    user: String,
    birthdayDay: Number,
    birthdayMonth: Number,
    birthdayYear: Number,
  },
  { timestamps: true }
);

export const Cumple = mongoose.model('Cumple', cumpleSchema);
