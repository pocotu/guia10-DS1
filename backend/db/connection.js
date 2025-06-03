const mysql = require('mysql2');
const connention = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'kali',
    database:'tienda'
})
connention.connect((err) => {
    if (err) {
        console.error('Error de conexion:', err);
        return
    }
    console.log('Conectado a MySQL');
});

module.exports = connention;