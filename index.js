const express = require("express");
var mysql = require('mysql');
let port = process.env.PORT || 3000;
require('dotenv').config()
const app = express()

const host = process.env.MYHOST;
const user = process.env.MYUSER;
const password = process.env.MYPASSWORD;
const database = process.env.MYDATABASE;



// const db = mysql.createConnection({
//     host: host,
//     user: user,
//     password: password,
//     database: database,
// });

const pool = mysql.createPool({ 
    connectionLimit: 5, 
    host: host,
    user: user,
    password: password,
    database: database,
    }); 

    pool.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
      });



app.get('/', (req, res) => {
    pool.getConnection((err,conn) =>{
        if(err){
            res.send('Error Occured')
        }
        else {
            conn.query("SELECT * FROM Songs", (err2, records, fields) =>{
                if(!err2){
                    res.send(records)
                }
                conn.release()
            })
        }
    })
        });

    
app.get("/2", (req,res) => {
    res.send("This is the other page!")
})
app.listen(port,() =>{
    console.log(`app is listening on port ${port}`);
})