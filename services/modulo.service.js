const Modulo = require(`../models/modulo.model`);

const FindAllMod = async function(){
    try {
        const modulo = await Modulo.findAllMod();
        return modulo;
    } catch (error) {
        throw error;
    }
}
const RegisterModulo = async function(data){
    const {nombre, ubicacion, especie_pescados, cantidad_pescados, edad_pescados, dimensiones, id_persona} = data;
    try {
        //verificamos la existencia del modulo
    const [existingMod] = await Modulo.findByName(nombre);
    if (existingMod.length > 0) {
        throw new Error('El modulo ya existe');
    }
    //validamos campos obligatoris
    if (!nombre || !ubicacion || !especie_pescados || !cantidad_pescados || !edad_pescados || !dimensiones || !id_persona) {
        throw new Error('Todos los campos obligatorios deben estar completos');
    }
    const modulo = await Modulo.createModulo(nombre, ubicacion, especie_pescados, cantidad_pescados, edad_pescados, dimensiones, id_persona);
    return `Modulo registrado exitosamente`,modulo;
    } catch (error) {
        throw error;
    }

}
const FindModuloById = async function(id){
    try {
        const modulo = await Modulo.findOneMod(id);
        if (!modulo) {
            throw new Error('Modulo no encontrado');
        }
        return modulo;
    } catch (error) {
        throw error;
    }
}
const EditModulo = async function(id, nuevoModulo){
    try {
        const modulo = await Modulo.editMod(id, nuevoModulo);
        return `Modulo editado exitosamente`, modulo;
    } catch (error) {
        throw error;
    }
}
const DeleteModulo = async function(id){
    try {
        const modulo = await Modulo.deleteMod(id);
        return `Modulo eliminado exitosamente`, modulo;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    FindAllMod,
    RegisterModulo,
    FindModuloById,
    EditModulo,
    DeleteModulo,
 };

