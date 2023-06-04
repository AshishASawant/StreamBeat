const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movie: [
    {
      itemId: { type: Number, },
      mediatype: { type: String }
    }
  ],
  music: [
    {
      itemId: { type: String, },
      mediatype: { type: String }
    }
  ]
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
