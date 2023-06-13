const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
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

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;
