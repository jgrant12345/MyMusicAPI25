const songsRoute = require("./routes/songs");
const express = require("express");

let port = process.env.PORT || 3000;

require("dotenv").config();

const app = express();

// Routes

app.use("/songs", songsRoute);

app.get("/2", (req, res) => {
  res.send("This is the other page!");
});
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
