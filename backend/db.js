const mysql  = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"fullstack"
});

db.connect((err)=>{
    console.log(err);
})

 

module.exports = db;

