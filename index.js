const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());

// ✅ Habilita CORS correctamente
const allowedOrigins = [
    'http://localhost:3000', // 🖥️ Para desarrollo local
    'https://tu-frontend.vercel.app' // 🌎 Para producción en Vercel
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // ✅ Permite cookies y autenticación
}));

app.options('*', cors()); // 🔄 Manejo de preflight request (OPTIONS)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
