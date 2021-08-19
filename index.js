const express = require("express");
var mysql = require('mysql');
let port = process.env.PORT || 3000;
require('dotenv').config()
const app = express()

const host = process.env.MYHOST;
const user = process.env.MYUSER;
const password = process.env.MYPASSWORD;
const database = process.env.MYDATABASE;



const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
});

db.connect(function (err) {
    if (err) throw err;
    console.log('MySql Connected...');
});

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM Songs';

        db.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        });

    
});
app.get("/2", (req,res) => {
    res.send("This is the other page!")
})
app.listen(port,() =>{
    console.log(`app is listening on port ${port}`);
})