const e = require('express');
const pool = require('../db');

const Modulo = {

    findAllMod: async function(){
        return await pool.execute(`
        SELECT 
            m.id_modulo, 
            m.nombre, 
            m.ubicacion, 
            m.especie_pescados, 
            m.cantidad_pescados, 
            m.edad_pescados, 
            m.dimensiones, 
            m.id_persona AS id_persona_modulo,
            p.nombre AS nombre_persona_modulo,
            mu.id_persona AS id_persona_asignada,
            p2.nombre AS nombre_persona_asignada
        FROM 
            modulo m
            JOIN persona p ON m.id_persona = p.id_persona
            LEFT JOIN modulo_usuario mu ON m.id_modulo = mu.id_modulo
            LEFT JOIN persona p2 ON mu.id_persona = p2.id_persona;`);
    },
    createModulo: async function(nombre, ubicacion, especie_pescados, cantidad_pescados, edad_pescados, dimensiones, id_persona){
        const [result] = await pool.query(`INSERT INTO modulo (nombre, ubicacion, especie_pescados, cantidad_pescados, edad_pescados, dimensiones, id_persona) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [nombre, ubicacion, especie_pescados, cantidad_pescados, edad_pescados, dimensiones, id_persona]
);
        return result.insertId;
    },
    findOneMod: async function(id){
        return await pool.execute(`
        SELECT 
            m.id_modulo, 
            m.nombre, 
            m.ubicacion, 
            m.especie_pescados, 
            m.cantidad_pescados, 
            m.edad_pescados, 
            m.dimensiones, 
            m.id_persona AS id_persona_modulo,
            p.nombre AS nombre_persona_modulo,
            mu.id_persona AS id_persona_asignada,
            p2.nombre AS nombre_persona_asignada
        FROM 
            modulo m
            JOIN persona p ON m.id_persona = p.id_persona
            LEFT JOIN modulo_usuario mu ON m.id_modulo = mu.id_modulo
            LEFT JOIN persona p2 ON mu.id_persona = p2.id_persona
        WHERE 
            m.id_modulo = ?`, [id]);
    },
    deleteMod: async function(id){
        try {
            const [result] = await pool.execute(`
                DELETE FROM modulo WHERE id_modulo = ?`, [id]);
            if (result.affectedRows === 0) {
                throw new console.error('Modulo no existe')
            }
            return { message: 'Modulo eliminado existosamente' }  
        } catch (error) {
            throw error
        }
    },
    editMod: async function(id, nuevoModulo){
        try {
            const [result] = await pool.execute(`
                UPDATE modulo SET 
                    nombre = ?, 
                    ubicacion = ?, 
                    especie_pescados = ?, 
                    cantidad_pescados = ?, 
                    edad_pescados = ?, 
                    dimensiones = ?
                WHERE 
                    id_modulo =?`, 
            [nuevoModulo.nombre, nuevoModulo.ubicacion, nuevoModulo.especie_pescados, nuevoModulo.cantidad_pescados, nuevoModulo.edad_pescados, nuevoModulo.dimensiones, id]);
            if (result.affectedRows === 0) {
                throw new console.error('Modulo no existe')
            }
            return { mensaje: 'Modulo actualizado correctamente' }
        } catch (error) {
            throw error;
        }
    },
    findByName: async function (nombre) {
        return await pool.execute(`
            SELECT * FROM modulo WHERE nombre = ?`,
            [nombre]);
    }
}

module.exports = Modulo;