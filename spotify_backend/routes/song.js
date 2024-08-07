const express = require("express");
const passport = require("passport");
const router = express.Router();
// const passport=require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;

    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song " });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);
router.get("/get/mysongs", async (req, res) => {
  try {
    const songs = await Song.find().populate("artist");
    console.log(songs);
    return res.status(200).json({ data: songs });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(
  "/get/artist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.body;
    const artist = await User.find({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist doesnt exists" });
    }

    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;

    const songs = await Song.find({ name: songName }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

module.exports = router;
