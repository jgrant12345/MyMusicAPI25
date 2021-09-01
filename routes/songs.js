const express = require("express");
const pool = require("../pool").pool;
const router = express.Router();

router.get("/:bandName", (req, res) => {
  const { bandName } = req.params;

  pool.query(
    "SELECT * FROM Bands WHERE BandName = ?",
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
