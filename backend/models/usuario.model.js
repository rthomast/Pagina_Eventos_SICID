const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true          // Elimina espacios accidentales
    },
    contrasenia: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'editor', 'consultante'],
            message: '{VALUE} no es un rol válido'
        },
        default: 'consultante'
    }
});

const Usuario = mongoose.model("Usuario", schemaUsuario);
module.exports = Usuario;


