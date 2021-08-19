const express = require("express");
const app = express()
let port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("Hello World")

})
app.get("/2", (req,res) => {
    res.send("This is the other page!")
})
app.listen(port,() =>{
    console.log(`app is listening on port ${port}`);
})