const Bitacora = require('../models/bitacora.model');

const findAllBitacoras = async function () {
    try {
        const bitacoras = await Bitacora.findAll();
        return bitacoras;
    } catch (error) {
        throw error;
    }
};

const findBitacoraById = async function (id_bitacora) {
    try {
        const bitacora = await Bitacora.findById(id_bitacora);
        return bitacora;
    } catch (error) {
        throw error;
    }
};

const createBitacora = async function (data) {
    try {
        const { id_modulo, fecha, descripcion } = data;
        const id_bitacora = await Bitacora.create(id_modulo, fecha, descripcion);
        return { id_bitacora, message: 'Entrada de bitácora creada exitosamente' };
    } catch (error) {
        throw error;
    }
};


const updateBitacora = async function (id_bitacora, data) {
    try {
        const result = await Bitacora.update(id_bitacora, data);
        return { message: 'Entrada de bitácora actualizada exitosamente' };
    } catch (error) {
        throw error;
    }
};


const deleteBitacora = async function (id_bitacora) {
    try {
        const result = await Bitacora.delete(id_bitacora);
        return { message: 'Entrada de bitácora eliminada exitosamente' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findAllBitacoras,
    findBitacoraById,
    createBitacora,
    updateBitacora,
    deleteBitacora,
};