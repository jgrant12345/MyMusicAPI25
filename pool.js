var mysql = require('mysql');


require('dotenv').config();

const host = process.env.MYHOST;
const user = process.env.MYUSER;
const password = process.env.MYPASSWORD;
const database = process.env.MYDATABASE;

const pool = mysql.createPool({ 
    connectionLimit: 5, 
    host: host,
    user: user,
    password: password,
    database: database,
    }); 
    
exports.pool = pool;
