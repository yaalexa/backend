const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const personRoutes = require('./routes/persona.route');
const moduloRoutes = require('./routes/modulo.route');
const bitacoraRoutes = require('./routes/bitacora.route');

dotenv.config();
const app = express();

// ✅ Habilita CORS correctamente
const allowedOrigins = [
    'http://localhost:3000', // 🖥️ Localhost
    'https://tu-frontend.vercel.app' // 🌎 Tu frontend en producción
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS no permitido'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // ⚠️ Importante si usas autenticación
}));

app.use(express.json());
app.use(bodyParser.json());

// 🔄 Manejo de preflight request (OPTIONS)
app.options('*', cors());

// Rutas
app.use('/api/users', personRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/bitacora', bitacoraRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
