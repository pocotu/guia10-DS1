const connection = require('./connection');

// Intentar hacer una consulta simple para probar la conexión
connection.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return;
    }
    console.log('Conexión exitosa! Resultado de la prueba:', results);
    
    // Cerrar la conexión después de la prueba
    connection.end((err) => {
        if (err) {
            console.error('Error al cerrar la conexión:', err);
            return;
        }
        console.log('Conexión cerrada correctamente');
    });
}); 