const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
require('dotenv').config(); // Para cargar las variables de entorno desde el archivo .env


dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // Usar el puerto 3306 como predeterminado si no está definido
});

// Probar la conexión inicial para asegurarse de que la base de datos está disponible
(async () => {
    try {
        const connection = await pool.getConnection(); // Obtener una conexión del pool
        console.log('Conexión a la base de datos establecida exitosamente.');
        connection.release(); // Liberar la conexión al pool
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

module.exports = pool;
