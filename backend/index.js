// Importa el módulo express para crear la aplicación web
const express = require('express'); 
// Importa el módulo cors para permitir solicitudes de origen cruzado
const cors = require('cors'); 
// Crea una instancia de la aplicación express
const app = express(); 
const productosRoutes = require('./routes/productos.routes');

// Usa el middleware cors para habilitar CORS
app.use(cors()); 
// Usa el middleware express.json() para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json()); 

app.use('/api/productos', productosRoutes);

// Define una ruta GET en la raíz ('/')
app.get('/',(req, res) => { 
    // Envía la respuesta de texto 'API Sistemas de Ventas' cuando se accede a la ruta
    res.send('API Sistemas de Ventas');
});

// Inicia el servidor en el puerto 3001
app.listen(3001, () => { 
    // Imprime un mensaje en la consola indicando que el servidor está corriendo y en qué dirección
    console.log('Servidor corriendo en http://localhost:3001') 
});     