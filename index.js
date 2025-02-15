const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const personRoutes = require('./routes/persona.route');
const moduloRoutes = require('./routes/modulo.route');
const bitacoraRoutes = require('./routes/bitacora.route');

dotenv.config();
const app = express();

// 🚀 Configuración CORS optimizada
const allowedOrigins = [
    'http://localhost:3001',
    'https://calm-squirrel-f7b586.netlify.app' // ✅ Frontend en producción
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('🚫 Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // ⚠️ Solo si usas cookies o sesiones
}));

// Middleware
app.use(express.json());

// Rutas
app.use('/api/users', personRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/bitacora', bitacoraRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
