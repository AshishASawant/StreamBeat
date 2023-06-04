const express = require("express");
const router = express.Router();
const Favorite = require("../models/favouriteModel");
const userAuth = require("../middleware/userAuth");

// Add movie or music to favorite playlist
router.post("/:type", userAuth, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ user: req.userId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite playlist not found" });
    }

    const type = req.params.type; // Type can be 'movies' or 'music'
    const { itemId, mediatype } = req.body; // Object containing itemId and mediatype

    // Check if the item is already in the playlist
    const existingItem = favorite[type].find(
      (item) => item.itemId === itemId && item.mediatype === mediatype
    );
    if (existingItem) {
      return res.status(400).json({
        message: "Item already exists in the favorite playlist",
      });
    }

    // Add the item to the playlist
    favorite[type].push({ itemId, mediatype });
    await favorite.save();

    res.json({ message: "Item added to the favorite playlist", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Remove movie or music from favorite playlist
router.delete("/:type", userAuth, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ user: req.userId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite playlist not found" });
    }

    const type = req.params.type; // Type can be 'movies' or 'music'
    const { itemId, mediatype } = req.body; // Object containing itemId and mediatype

    // Check if the item exists in the playlist
    const itemIndex = favorite[type].findIndex(
      (item) => item.itemId === itemId && item.mediatype === mediatype
    );
    if (itemIndex === -1) {
      return res.status(400).json({
        message: "Item does not exist in the favorite playlist",
      });
    }

    // Remove the item from the playlist
    favorite[type].splice(itemIndex, 1);
    await favorite.save();

    res.json({ message: "Item removed from the favorite playlist", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch favorite playlist by type
router.get("/:type", userAuth, async (req, res) => {
  try {
    const { type } = req.params;
    const favorite = await Favorite.findOne({ user: req.userId }).populate(type);

    if (!favorite) {
      return res.status(404).json({ message: "Favorite playlist not found" });
    }

    res.json(favorite[type]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// to chech if a favourite exists  
router.get("/:type/check", userAuth, async (req, res) => {
  try {
    const { type } = req.params;
    const { itemId, mediatype } = req.query;
    const favorite = await Favorite.findOne({ user: req.userId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite playlist not found" });
    }

    const itemExists = favorite[type].some(item => item.itemId == itemId && item.mediatype == mediatype);
    res.json({ exists: itemExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
