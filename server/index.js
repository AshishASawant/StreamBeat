const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const connectTODb = require("./db");
const lyricsFinder = require("lyrics-finder");
let apiRefreshToken

const SpotifyWebApi = require("spotify-web-api-node");
//environment variable
require("dotenv").config();

//connecting to db
connectTODb();

// midelware
app.use(express.json());
app.use(cors());

//Available routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/favourite", require("./routes/favouriteRoute"));
app.use("/api/watchlater", require("./routes/watchLaterRoute"));
app.use("/api/playlist", require("./routes/playlistRoute"));

app.get("/api/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No Lyrics Found!";
  res.json({ lyrics });
});

app.post("/api/musicrefresh", (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken:apiRefreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        tokens: data.body,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.post("/api/musiclogin", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      apiRefreshToken = data.body.refresh_token;
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//listen
app.listen(port, () => {
  console.log(`app successfully running on port ${port}`);
});
