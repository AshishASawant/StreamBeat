const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlistModel');
const userAuth = require('../middleware/userAuth');

// Create a new playlist
router.post('/create', userAuth, async (req, res) => {
  try {
    const { type } = req.body;
    const name=req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    const user = req.userId;

    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required' });
    }

    const playlist = new Playlist({
      name,
      user,
      type,
      musicPlaylist: [],
    });

    const savedPlaylist = await playlist.save();

    res.json(savedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a music item to a playlist
router.post('/:playlistId/add', userAuth, async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { musicId } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const existingMusic = playlist.musicPlaylist.includes(musicId);
    if (existingMusic) {
      return res.status(400).json({ message: 'Music already exists in the playlist' });
    }

    playlist.musicPlaylist.push(musicId);
    await playlist.save();

    res.json({ message: 'Music added to playlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Remove a music item from a playlist
router.delete('/:playlistId/remove', userAuth, async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { musicId } = req.body;

    if (!musicId) {
      return res.status(400).json({ message: 'Music ID is required' });
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const musicIndex = playlist.musicPlaylist.indexOf(musicId);
    if (musicIndex === -1) {
      return res.status(400).json({ message: 'Music item not found in playlist' });
    }

    playlist.musicPlaylist.splice(musicIndex, 1);
    await playlist.save();

    res.json({ message: 'Music removed from playlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a playlist
router.delete('/:playlistId', userAuth, async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update playlist name
router.put('/:playlistId', userAuth, async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { name },
      { new: true }
    );
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all playlists of a user
router.get('/', userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const playlists = await Playlist.find({ user: userId });

    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
