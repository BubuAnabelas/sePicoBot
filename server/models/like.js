const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  who: String,
  likes: String
}, { timestamps: { createdAt: 'created_at' } });

export const Like = mongoose.model('Like', likeSchema);
