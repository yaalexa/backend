// routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Importa la conexión a la base de datos
const router = express.Router();
const {RegisterPersonaC, BuscarpersonaPorIdC, ListarPersonasC, LoginC, ListarUsuariosC, ListarIntructoresC, cerrarSesionC, EditarPersonaC, EliminarPersonaC} = require('../controllers/persona.controller')
const validarTokenMiddleware = require('../middleware/VerificadorToken')
//endpoints con el patron models, services, controller a routes
//rutas de persona, usuario
router.post('/registerMVC', RegisterPersonaC );
router.get('/personaidMVC/:id', validarTokenMiddleware, BuscarpersonaPorIdC);
router.get('/listarpersonasMVC', validarTokenMiddleware, ListarPersonasC );
router.get('/listarusuariosMVC', validarTokenMiddleware, ListarUsuariosC);
router.get('/listarinstructoresMVC', validarTokenMiddleware, ListarIntructoresC);
router.post('/loginMVC', LoginC);
router.post('/cerrarSecionMVC', cerrarSesionC);
router.put('/:id', EditarPersonaC);
router.delete('/:id', EliminarPersonaC);

// Registro de persona
router.post('/register', async (req, res) => {
    console.log("Datos recibidos REGISTER:", req.body);
    try {
        const { nombre, email, password, n_documento_identidad, sede, rol, n_ficha, jornada, nombre_del_programa } = req.body;

        // Verificar si la persona ya existe
        const [existingPerson] = await pool.query('SELECT * FROM persona WHERE email = ?', [email]);
        if (existingPerson.length > 0) {
            return res.status(400).json({ message: 'La persona ya está registrada' });
        }

        // Validar que todos los campos esenciales están presentes
        if (!nombre || !email || !password || !n_documento_identidad || !sede || !rol ) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar en la tabla base "persona"
        const [result] = await pool.query(
            'INSERT INTO persona (nombre, email, password, n_documento_identidad, sede, id_rol) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, email, hashedPassword, n_documento_identidad, sede, rol]
        );

        const id_persona = result.insertId; // Obtener el ID de la persona insertada

        // Insertar en la tabla correspondiente según el rol
        if (rol === 3) { // Rol "usuario"
            if (!n_ficha || !jornada || !nombre_del_programa) {
                return res.status(400).json({ message: 'Datos adicionales necesarios para usuarios: n_ficha, jornada, nombre_del_programa' });
            }
            await pool.query(
                'INSERT INTO usuario (id_persona, n_ficha, jornada, nombre_del_programa) VALUES (?, ?, ?, ?)',
                [id_persona, n_ficha, jornada, nombre_del_programa]
            );
        } else if (rol === 2) { // Rol "administrador_instructor"
            if (!n_ficha || !nombre_del_programa) {
                return res.status(400).json({ message: 'Datos adicionales necesarios para instructores: n_ficha, nombre_del_programa' });
            }
            await pool.query(
                'INSERT INTO administrador_instructor (id_persona, n_ficha, nombre_del_programa) VALUES (?, ?, ?)',
                [id_persona, n_ficha, nombre_del_programa]
            );
        } else {
            return res.status(400).json({ message: 'Rol no válido' });
        }

        res.status(201).json({ message: 'Persona registrada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la persona' });
    }
});
// Login de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Datos recibidos LOGIN:", req.body);

    try {
        // Verificar si la persona existe
        const [personaResult] = await pool.query(
            `SELECT p.id_persona, p.nombre, p.email, p.password, r.nombre AS rol 
             FROM persona p 
             INNER JOIN rol r ON p.id_rol = r.id_rol 
             WHERE p.email = ?`,
            [email]
        );

        if (personaResult.length === 0) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const user = personaResult[0];

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id_persona: user.id_persona, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Vigencia del token
        );

        res.status(200).json({ message: 'Login exitoso', token, user: { id: user.id_persona, nombre: user.nombre, email: user.email, rol: user.rol } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});
// Obtener lista de personas con roles
router.get('/personas', async (req, res) => {
    console.log("GET RECIBIDO");
    try {
        const [rows] = await pool.query(
            `SELECT p.id_persona, p.nombre, p.email, p.n_documento_identidad, p.sede, r.nombre AS rol, 
                    u.n_ficha AS usuario_ficha, u.jornada, u.nombre_del_programa AS usuario_programa, 
                    ai.n_ficha AS instructor_ficha, ai.nombre_del_programa AS instructor_programa
             FROM persona p
             JOIN rol r ON p.id_rol = r.id_rol
             LEFT JOIN usuario u ON p.id_persona = u.id_persona
             LEFT JOIN administrador_instructor ai ON p.id_persona = ai.id_persona`
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la lista de personas' });
    }
});
// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});
// Obtener todos los usuarios
router.get('/instructores', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM administrador_instructor');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});
module.exports = router;