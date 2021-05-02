const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    who: String,
    likes: String,
    match: Boolean
  });

export const Match = mongoose.model('Match', matchSchema);
