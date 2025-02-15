const pool = require('../db');

const Bitacora = {

    findAll: async function () {
        const [rows] = await pool.execute('SELECT * FROM bitacora');
        return rows;
    },

    findById: async function (id_bitacora) {
        const [rows] = await pool.execute('SELECT * FROM bitacora WHERE id_bitacora = ?', [id_bitacora]);
        return rows[0];
    },

    create: async function (id_modulo, fecha, descripcion) {
        const [result] = await pool.execute(
            'INSERT INTO bitacora (id_modulo, fecha, descripcion) VALUES (?, ?, ?)',
            [id_modulo, fecha, descripcion]
        );
        return result.insertId;
    },

    update: async function (id_bitacora, nuevaBitacora) {
        const [result] = await pool.execute(
            'UPDATE bitacora SET id_modulo = ?, fecha = ?, descripcion = ? WHERE id_bitacora = ?',
            [nuevaBitacora.id_modulo, nuevaBitacora.fecha, nuevaBitacora.descripcion, id_bitacora]
        );
        return result;
    },

    delete: async function (id_bitacora) {
        const [result] = await pool.execute('DELETE FROM bitacora WHERE id_bitacora = ?', [id_bitacora]);
        return result;
    },
};

module.exports = Bitacora;