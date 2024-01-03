const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'patient'
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