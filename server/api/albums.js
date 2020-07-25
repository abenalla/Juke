const router = require("express").Router();
const { Album, Artist, Song } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    //should respond with all the albums in the database
    // including the artist
    const albums = await Album.findAll({
      include: [Artist],
    });
    res.json(albums);
  } catch (error) {
    next(error);
  }
});

router.get("/:albumId", async (req, res, next) => {
  try {
    //should respond with a single album based on the id in the url
    // including the artist and the songs for that album.
    const albums = await Album.findById(req.params.albumId, {
      include: [Artist, Song],
      //include: [Artist, {model: Song, include: [Artist]}]
    });
    res.json(albums);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
