const songsRoute = require("./routes/songs");
const bandsRoute = require("./routes/bands");
const express = require("express");

let port = process.env.PORT || 3000;

require("dotenv").config();

const app = express();

app.use(express.json());

// Routes

app.use("/v1/songs", songsRoute);

app.use("/v1/bands", bandsRoute);

app.get("/2", (req, res) => {
  res.send("This is the other page!");
});
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
