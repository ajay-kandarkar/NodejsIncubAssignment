const mysql = require('mysql2');
require('dotenv').config();

var mysqlConnection = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

 mysqlConnection.connect((err)=>{
    if(err)
    {
        console.log("error in database connection "+JSON.stringify(err));
    }
    else
    {
        console.log("db connected succesfully");
    }
})


module.exports=mysqlConnection;