const Persona = require('../models/persona.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { listaNegraService } = require('../services/ListaNegra.service')
const { CrearToken } = require('../utils/tokenUtils'); // Importar función de creación de token
require('dotenv').config();

const CrearToken =  async function (user){
    const {id_persona, n_documento_identidad} = user;
    const payload = {id_persona, n_documento_identidad};
    console.log(payload);
    const secret = process.env.JWT_SECRET;
    const options = {expiresIn: '3m'};
    const token = jwt.sign(payload, secret, options);//toma tres parámetros: el payload (información sobre el usuario), la clave secreta utilizada para firmar el token y las opciones de configuración del token.
    return token
}



const LoginM = async function (req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: '⚠️ Email y contraseña son obligatorios.' });
        }

        // Buscar usuario en la base de datos
        const [users] = await Persona.findByEmail(email);
        if (!users || users.length === 0) {
            return res.status(404).json({ error: '❌ Usuario no encontrado' });
        }

        const user = users[0];

        // Validar contraseña
        if (!user.password) {
            return res.status(500).json({ error: '⚠️ Error en la cuenta del usuario' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: '🔒 Contraseña incorrecta' });
        }

        // Generar Token
        const token = await CrearToken(user);

        return res.status(200).json({
            message: '✅ Inicio de sesión exitoso',
            token,
            user: { id: user.id_persona, identificacion: user.identificacion }
        });
    } catch (error) {
        console.error('❌ Error en login:', error.message || error);
        return res.status(500).json({ error: '🚨 Error interno del servidor' });
    }
};



const FindPersonsById = async function (id_persona) {
    try {
        const person = await Persona.findOnePersona(id_persona);
        if (!person) {
            throw new Error('No se encontró la persona.');
        }
        return person;
    } catch (error) {
        throw error;
    }
}
const FindAllPersons = async function (){
    try {
        const persons = await Persona.findAllPer({});
        return persons;
    } catch (error) {
        throw error;
    }
}
const FindAllUsuarios = async function () {
    try {
        const usuarios = await Persona.findAllUsu({});
        return usuarios;
    } catch (error) {
        throw error;
    }
}
const FindAllInstructores = async function () {
    try {
        const instructor = await Persona.findAllInstru({});
        return instructor;
    } catch (error) {
        throw error;
    }
}
const RegisterPerson = async function (data) {
    const { nombre, email, password, n_documento_identidad, sede, rol, n_ficha, jornada, nombre_del_programa } = data;

    // Verificar si la persona ya existe
    const [existingPerson] = await Persona.findByEmail(email);
    if (existingPerson.length > 0) {
        throw new Error('La persona ya está registrada');
    }

    // Validar campos obligatorios
    if (!nombre || !email || !password || !n_documento_identidad || !sede || !rol) {
        throw new Error('Todos los campos obligatorios deben estar completos');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear persona base
    const id_persona = await Persona.createPersona(nombre, email, hashedPassword, n_documento_identidad, sede, rol);

    // Insertar en tabla correspondiente según el rol
    if (rol === 3) {
        if (!n_ficha || !jornada || !nombre_del_programa) {
            throw new Error('Datos adicionales necesarios para usuarios: n_ficha, jornada, nombre_del_programa');
        }
        await Persona.createUsuario(id_persona, n_ficha, jornada, nombre_del_programa);
    } else if (rol === 2) {
        if (!n_ficha || !nombre_del_programa) {
            throw new Error('Datos adicionales necesarios para instructores: n_ficha, nombre_del_programa');
        }
        await Persona.createInstructor(id_persona, n_ficha, nombre_del_programa);
    } else {
        throw new Error('Rol no válido');
    }

    return 'Persona registrada exitosamente';
};
const EditarPersona = async function (id_persona, nuevaPersona) {
    try {
        const result = await Persona.editPersona(id_persona, nuevaPersona);
        return result;
    } catch (error) {
        throw error;
    }
};
const EliminarPersona = async function (id_persona) {
    try {
        const result = await Persona.deletePersona(id_persona);
        return result;
    } catch (error) {
        throw error;
    }
};
const cerrarSesion = async (token) => {
    try {
      await listaNegraService.agregarToken(token);
      return { message: 'Sesión cerrada exitosamente' };
    } catch (error) {
      throw error;
    }
  };
module.exports = {
    FindPersonsById,
    FindAllPersons,
    RegisterPerson,
    FindAllUsuarios,
    FindAllInstructores,
    LoginM,
    cerrarSesion,
    EditarPersona,
    EliminarPersona
}
    