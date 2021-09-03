const express = require("express");
const pool = require("../pool").pool;
const router = express.Router();


router.get("/", (req, res) => {
  myQuery = `SELECT Name, YearReleased, BandName, FirstName, 
  Artists.LastName FROM Songs 
  INNER JOIN Bands ON Songs.BandID = Bands.BandID 
  INNER JOIN Artists ON Bands.BandID = Artists.BandID WHERE  ;`;
  pool.query(myQuery, (err,records) => {
    if (err){
     res.send("Sorry dude")
    } 
    else{
      array = []
      for(let index = 0; index < records.length; index++) {
        array.push(records[index])
      }
      console.log(array)
      res.send(array)
    }
  });

});

// Filtering
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
        res.send(records);
      }
    }
  );
});

module.exports = router;
