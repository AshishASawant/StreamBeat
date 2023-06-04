const mongoose = require('mongoose');

const watchLaterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movie: [
    {
      itemId: { type: Number,  },
      mediatype: { type: String }
    }
  ]
});

const WatchLater = mongoose.model('WatchLater', watchLaterSchema);

module.exports = WatchLater;
