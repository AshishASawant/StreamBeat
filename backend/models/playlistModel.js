const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  music: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
