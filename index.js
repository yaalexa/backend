const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Rutas
const personRoutes = require('./routes/persona.route');
const moduloRoutes = require('./routes/modulo.route');
const bitacoraRoutes = require('./routes/bitacora.route');

dotenv.config();
const app = express();

// Configuración de CORS
const allowedOrigins = [
    'http://localhost:3001',
    'https://backmejorado.onrender.com',
    'https://calm-squirrel-f7b586.netlify.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS no permitido para este origen'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/api/users', personRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/bitacora', bitacoraRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err.message);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Exportar `app` para despliegue en Vercel
module.exports = app;
