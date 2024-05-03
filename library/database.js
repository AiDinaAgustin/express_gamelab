let mysql = require('mysql');

// Kofigurasi untuk koneksi
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_mysql'
});

// Kondisi untuk mengecek database berjalan atau ngga
connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('koneksi berhasil');
    }
});

module.exports = connection;