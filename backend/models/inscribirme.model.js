const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaInscribirme = new mongoose.Schema({
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
    profesion: {
        type: String,
        required: true
    },
    entidadTrabaja: {
        type: String,
        required: true
    },
    razon: {
        type: String,
        required: true
    },
    aceptaNotif: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ['aprobado', 'rechazado', 'pendiente'],
            message: '{VALUE} no es un estado válido'
        },
        default: 'pendiente'
    }
});

const Inscribirme = mongoose.model("Inscribirme", schemaInscribirme);
module.exports = Inscribirme; 