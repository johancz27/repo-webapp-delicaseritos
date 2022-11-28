const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err)=>{
    if (err) {
        console.log("Error en la base de datos: " + err)
        return;
    }
    console.log("Conexión exitosa a la DB");
});

module.exports = connection;