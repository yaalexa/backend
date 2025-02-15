const {
    findAllBitacoras,
    findBitacoraById,
    createBitacora,
    updateBitacora,
    deleteBitacora,
} = require('../services/bitacora.service');

const controller = {};


controller.findAllBitacorasC = async function (req, res) {
    try {
        const bitacoras = await findAllBitacoras();
        res.status(200).json(bitacoras);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


controller.findBitacoraByIdC = async function (req, res) {
    try {
        const id_bitacora = req.params.id;
        const bitacora = await findBitacoraById(id_bitacora);
        res.status(200).json(bitacora);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

controller.createBitacoraC = async function (req, res) {
    try {
        const data = req.body;
        const result = await createBitacora(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

controller.updateBitacoraC = async function (req, res) {
    try {
        const id_bitacora = req.params.id;
        const data = req.body;
        const result = await updateBitacora(id_bitacora, data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

controller.deleteBitacoraC = async function (req, res) {
    try {
        const id_bitacora = req.params.id;
        const result = await deleteBitacora(id_bitacora);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = controller;