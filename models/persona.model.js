const pool = require('../db');

const Persona = {
    findAllPer: async function() {
        console.log("GET AllPersonas");
        return await pool.execute(`
        SELECT 
            p.id_persona,
            p.nombre, 
            p.email, 
            p.n_documento_identidad, 
            p.sede, 
            r.nombre AS rol, 
            u.n_ficha AS usuario_ficha, 
            u.jornada, 
            u.nombre_del_programa AS usuario_programa, 
            ai.n_ficha AS instructor_ficha, 
            ai.nombre_del_programa AS instructor_programa
        FROM 
            persona p
            JOIN rol r ON p.id_rol = r.id_rol
            LEFT JOIN usuario u ON p.id_persona = u.id_persona
            LEFT JOIN administrador_instructor ai ON p.id_persona = ai.id_persona`);
    },
    findAllUsu: async function() {
        console.log("GET AllUsuarios");
        return await pool.execute(`SELECT * FROM usuario `);
    },
    findAllInstru: async function() {
        console.log("GET AllInstructores");
        return await pool.execute(`SELECT * FROM administrador_instructor `);
    },
    createPersona: async function (nombre, email, hashedPassword, n_documento_identidad, sede, rol) {
        const [result] = await pool.query(
            'INSERT INTO persona (nombre, email, password, n_documento_identidad, sede, id_rol) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, email, hashedPassword, n_documento_identidad, sede, rol]
        );
        return result.insertId;
    },
    createUsuario: async function (id_persona, n_ficha, jornada, nombre_del_programa) {
        return await pool.query(
            `INSERT INTO usuario (id_persona, n_ficha, jornada, nombre_del_programa)
            VALUES (?, ?, ?, ?)`,
            [id_persona, n_ficha, jornada, nombre_del_programa]
        );
    },
    
    findOnePersona: async function (id) { 
        return await pool.execute('SELECT * FROM persona WHERE id_persona = ?',[id]);
    },
    findByEmail: async function (email) {
        return await pool.execute('SELECT * FROM persona WHERE email = ?', [email]);
    },
    editPersona: async function (id_persona, NuevaPersona) {
        try {
            const [result] = await pool.execute(`
                UPDATE persona SET 
                    nombre = ?, 
                    email = ?, 
                    password = ?, 
                    n_documento_identidad = ?, 
                    sede = ?, 
                    id_rol = ? 
                WHERE 
                    id_persona = ?`,
                [NuevaPersona.nombre, NuevaPersona.email, NuevaPersona.password, NuevaPersona.n_documento_identidad, NuevaPersona.sede, NuevaPersona.id_rol, id_persona]
            );
            if (result.affectedRows === 0) {
                throw new Error('No se encontró la persona');
            }
            return { mensaje: 'Persona se actualizó correctamente' };
        } catch (error) {
            throw error;
        }
    },
    deletePersona: async function (id_persona) {
        try {
            const [result] = await pool.execute('DELETE FROM persona WHERE id_persona = ?', [id_persona]);
            if (result.affectedRows === 0) {
                throw new console.error('Persona no existe')
            }
            return { message: 'Persona elimnada existosamente' }
        } catch (error) {
            throw error
        }
    },
    createInstructor: async (id_persona, n_ficha, nombre_del_programa) => {
        return await pool.query(
            'INSERT INTO administrador_instructor (id_persona, n_ficha, nombre_del_programa) VALUES (?, ?, ?)',
            [id_persona, n_ficha, nombre_del_programa]
        );
    }
}

module.exports = Persona;