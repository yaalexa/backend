const express = require('express');
const router = express.Router();
const {ListarModulosC, RegistrarModuloC, BuscarModIdC, EditarMod, EliminarMod} = require('../controllers/modulo.controller')
//rutas de modulo
router.post('/registerModMVC', RegistrarModuloC); 
router.get('/moduloIdMVC/:id', BuscarModIdC); 
router.get('/listarModuloMVC', ListarModulosC); 
router.put('/editarModuloMVC/:id', EditarMod); 
router.delete('/eliminarModuloMVC/:id', EliminarMod); 

module.exports = router;