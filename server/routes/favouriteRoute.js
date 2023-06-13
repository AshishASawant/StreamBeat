const express = require("express");
const router = express.Router();
const Favourite = require("../models/favouriteModel");
const userAuth = require("../middleware/userAuth");

// Add movie or music to favourite playlist
router.post("/:type", userAuth, async (req, res) => {
  try {
    const favourite = await Favourite.findOne({ user: req.userId });

    if (!favourite) {
      return res.status(404).json({ message: "Favourite playlist not found" });
    }

    const type = req.params.type; // Type can be 'movies' or 'music'
    const { itemId, mediatype } = req.body; // Object containing itemId and mediatype

    // Check if the item is already in the playlist
    const existingItem = favourite[type].find(
      (item) => item.itemId === itemId && item.mediatype === mediatype
    );
    if (existingItem) {
      return res.status(400).json({
        message: "Item already exists in the favourite playlist",
      });
    }

    // Add the item to the playlist
    favourite[type].push({ itemId, mediatype });
    await favourite.save();

    res.json({ message: "Item added to the favourite playlist", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Remove movie or music from favourite playlist
router.delete("/:type", userAuth, async (req, res) => {
  try {
    const favourite = await Favourite.findOne({ user: req.userId });

    if (!favourite) {
      return res.status(404).json({ message: "Favourite playlist not found" });
    }

    const type = req.params.type; // Type can be 'movies' or 'music'
    const { itemId, mediatype } = req.body; // Object containing itemId and mediatype

    // Check if the item exists in the playlist
    const itemIndex = favourite[type].findIndex(
      (item) => item.itemId === itemId && item.mediatype === mediatype
    );
    if (itemIndex === -1) {
      return res.status(400).json({
        message: "Item does not exist in the favourite playlist",
      });
    }

    // Remove the item from the playlist
    favourite[type].splice(itemIndex, 1);
    await favourite.save();

    res.json({ message: "Item removed from the favourite playlist", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch favourite playlist by type
router.get("/:type", userAuth, async (req, res) => {
  try {
    const { type } = req.params;
    const favourite = await Favourite.findOne({ user: req.userId }).populate(type);

    if (!favourite) {
      return res.status(404).json({ message: "Favourite playlist not found" });
    }

    res.json(favourite[type]);
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
    const favourite = await Favourite.findOne({ user: req.userId });

    if (!favourite) {
      return res.status(404).json({ message: "Favourite playlist not found" });
    }

    const itemExists = favourite[type].some(item => item.itemId == itemId && item.mediatype == mediatype);
    res.json({ exists: itemExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
