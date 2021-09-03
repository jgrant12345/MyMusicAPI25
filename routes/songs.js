const express = require("express");
const pool = require("../pool").pool;
const router = express.Router();

// Description: Query filters returns all songs
// input: None
// output: object with array of singers in
// band and array of songs and date released
router.get("/", (req, res) => {
  myQuery = `SELECT Name, YearReleased FROM Songs;`;
  pool.query(myQuery, (err, records) => {
    if (err) {
      res.send(err);
    } else {
      array = [];
      for (let index = 0; index < records.length; index++) {
        array.push(records[index]);
      }
      console.log(array);
      res.send(array);
    }
  });
});

// Description: Query songs by year of song released
// input: yearReleased (year the song was released)
// output: object with songs released that year
router.get("/:yearReleased", (req, res) => {
  const { yearReleased } = req.params;
  pool.query(
    `SELECT Name, YearReleased FROM Songs WHERE YearReleased = ?`,
    [yearReleased],
    (err, records) => {
      if (err) {
        res.send(err);
      } else {
        res.send(records);
      }
    }
  );
});

// Description: Query Songs that were released prior to a date
// input: yearReleased (the year the song was released)
// output: object with songs and years that were released
// before date specified by yearReleased

router.get("/releasedBeforeYear/:yearReleased", (req, res) => {
  const { yearReleased } = req.params;
  pool.query(
    `SELECT Name, YearReleased FROM Songs WHERE YearReleased < ?`,
    [yearReleased],
    (err, records) => {
      if (err) {
        res.send(err);
      } else {
        res.send(records);
      }
    }
  );
});

// Description: Query Songs that were released prior to a date
// input: yearReleased (the year the song was released)
// output: object with songs and years that were released
// before date specified by yearReleased

router.get("/releasedAfterYear/:yearReleased", (req, res) => {
  const { yearReleased } = req.params;
  pool.query(
    `SELECT Name, YearReleased FROM Songs WHERE YearReleased > ?`,
    [yearReleased],
    (err, records) => {
      if (err) {
        res.send(err);
      } else {
        res.send(records);
      }
    }
  );
});

module.exports = router;
