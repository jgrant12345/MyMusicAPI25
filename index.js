const express = require("express");
var mysql = require('mysql');
let port = process.env.PORT || 3000;
require('dotenv').config()
const app = express()

const host = process.env.MYHOST;
const user = process.env.MYUSER;
const password = process.env.MYPASSWORD;
const database = process.env.MYDATABASE;



const pool = mysql.createPool({ 
    connectionLimit: 10, 
    host: host,
    user: user,
    password: password,
    database: database,
    }); 

    pool.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
      });

app.get('/', (req,res) => {
    pool.query('SELECT * FROM Bands WHERE BandName = ?', ['Big Mountain'], (err, records) =>{
    if(err){
        res.send(err)
    }
    else {
        res.send(records)
    }

})})



// app.get('/', (req, res) => {
//     pool.getConnection((err,conn) =>{
//         if(err){
//             throw err;
//         }
//         else {
//             conn.query('SELECT * FROM Bands WHERE BandName = ?',['Big Mountain'], (err2, records, fields) =>{
//                 if(err2){
//                     res.send(err2)
//                 }
//                 else{
//                     res.send(records)
//                 }
//             })
//         }
//     })
//         });

    
app.get("/2", (req,res) => {
    res.send("This is the other page!")
})
app.listen(port,() =>{
    console.log(`app is listening on port ${port}`);
})