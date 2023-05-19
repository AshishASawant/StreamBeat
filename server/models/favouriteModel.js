const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  music: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }]
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
