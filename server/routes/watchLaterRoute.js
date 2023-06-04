const express = require('express');
const router = express.Router();
const WatchLater = require('../models/watchLaterModel');
const userAuth = require('../middleware/userAuth');

// Add movie to watch later list
router.post('/movie', userAuth, async (req, res) => {
  try {
    const { itemId, mediatype } = req.body;
    const watchLater = await WatchLater.findOne({ user: req.userId });

    if (!watchLater) {
      return res.status(404).json({ message: 'Watch later list not found' });
    }

    const existingMovie = watchLater.movie.find(
      (movie) => movie.itemId === itemId && movie.mediatype === mediatype
    );

    if (existingMovie) {
      return res.status(400).json({ message: 'Movie already exists in watch later list' });
    }

    watchLater.movie.push({ itemId, mediatype });
    await watchLater.save();

    res.json({ message: 'Movie added to watch later list', status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Remove movie from watch later list
router.delete('/movie', userAuth, async (req, res) => {
  try {
    const { itemId, mediatype } = req.body;
    const watchLater = await WatchLater.findOne({ user: req.userId });

    if (!watchLater) {
      return res.status(404).json({ message: 'Watch later list not found' });
    }

    const movieIndex = watchLater.movie.findIndex(
      (movie) => movie.itemId === itemId && movie.mediatype === mediatype
    );

    if (movieIndex === -1) {
      return res.status(400).json({ message: 'Movie does not exist in watch later list' });
    }

    watchLater.movie.splice(movieIndex, 1);
    await watchLater.save();

    res.json({ message: 'Movie removed from watch later list', status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get watch later list
router.get('/', userAuth, async (req, res) => {
  try {
    const watchLater = await WatchLater.findOne({ user: req.userId }).populate('movie.itemId');

    if (!watchLater) {
      return res.status(404).json({ message: 'Watch later list not found' });
    }

    res.json(watchLater.movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Check if item exists in watch later list
router.get('/movie/check', userAuth, async (req, res) => {
  try {
    const { itemId, mediatype } = req.query;
    const watchLater = await WatchLater.findOne({ user: req.userId });

    if (!watchLater) {
      return res.status(404).json({ message: 'Watch later list not found' });
    }

    const itemExists = watchLater.movie.some(
      (movie) => movie.itemId == itemId && movie.mediatype == mediatype
    );

    res.json({ exists: itemExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
