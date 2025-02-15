const { FindAllMod, RegisterModulo, FindModuloById, EditModulo, DeleteModulo}= require(`../services/modulo.service`)
const controller = {};
const validarCamposRequeridos = require(`../middleware/camposRequeridos`);
const { editMod } = require("../models/modulo.model");

controller.ListarModulosC = async function (req, res) {
    try {
        const modulo = await FindAllMod();
        res.json(modulo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
controller.RegistrarModuloC = async function (req, res) {
    try {
        //validar campos
        const validacion = validarCamposRequeridos(['nombre', 'ubicacion', 'especie_pescados', 'cantidad_pescados', 'edad_pescados', 'dimensiones', 'id_persona']);
        if (!validacion) {
            return res.status(400).json({ error: 'Campos requeridos faltantes' });
        }
        const moduloData = req.body;
        const insertId = await RegisterModulo(moduloData);
        res.status(201).json({ message: 'Módulo creado con éxito', id: insertId });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
controller.BuscarModIdC = async function (req, res) {
    try {
        const id_mod = req.params.id;
        const modulo = await FindModuloById(id_mod);
        return res.status(201).json(modulo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
controller.EditarMod = async function (req, res){
    try {
        const id = req.params.id;
        const nuevoModulo = await req.body;
        const result = await EditModulo(id, nuevoModulo);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
controller.EliminarMod = async function (req, res){
    try {
        const id = req.params.id;
        const result = await DeleteModulo(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = controller;