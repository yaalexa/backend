const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
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
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // ⚠️ Habilita solo si usas cookies o sesiones
}));

// Middleware para procesar JSON
app.use(express.json());
app.use(bodyParser.json());

// Manejo de solicitudes OPTIONS (preflight request)
app.options('*', cors());

// Rutas
app.use('/api/users', personRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/bitacora', bitacoraRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://192.168.100.7:${PORT}`);
});
