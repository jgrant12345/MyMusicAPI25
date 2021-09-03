const express = require("express");
const pool = require("../pool").pool;
const router = express.Router();

// Description: Query filters band names
// input: Bandname
// output: object with array of singers and array of songs and date released
router.get("/:bandName", (req, res) => {
  const { bandName } = req.params;
  pool.query(
    `SELECT Name, YearReleased, BandName, FirstName, 
    Artists.LastName FROM Songs 
    INNER JOIN Bands ON Songs.BandID = Bands.BandID 
    INNER JOIN Artists ON Bands.BandID = Artists.BandID WHERE BandName = ?;`,
    [bandName],
    (err, records) => {
      if (err) {
        res.send(err);
      } else {
        namesArray = [];
        Uniquesongs = [];
        generalSongsArray = [];

        for (let index = 0; index < records.length; index++) {
          firstName = records[index]["FirstName"];
          lastName = records[index]["LastName"];
          person = firstName + " " + lastName;
          songName = records[index]["Name"];
          releaseDate = records[index]["YearReleased"];

          if (!Uniquesongs.includes(songName)) {
            Uniquesongs.push(songName);
            generalSongsArray.push({
              Name: songName,
              YearReleased: releaseDate,
            });
          }
          if (!namesArray.includes(person)) {
            namesArray.push(firstName + " " + lastName);
          }
        }
        output = { Songs: generalSongsArray, Artists: namesArray };
        res.send(output);
      }
    }
  );
});

module.exports = router;
