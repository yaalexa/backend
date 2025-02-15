const express = require('express');
const router = express.Router();
const {
    findAllBitacorasC,
    findBitacoraByIdC,
    createBitacoraC,
    updateBitacoraC,
    deleteBitacoraC,
} = require('../controllers/bitacora.controller');

router.get('/listarBitacora', findAllBitacorasC);
router.get('/buscarPorId/:id', findBitacoraByIdC);
router.post('/registrar', createBitacoraC);
router.put('/editar/:id', updateBitacoraC);
router.delete('/borrar/:id', deleteBitacoraC);

module.exports = router;