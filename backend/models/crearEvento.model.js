const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaCrearEvento = new mongoose.Schema({
    anioPub: {
        type: Number,
        require: true,
    },
    mesPub: {
        type: Number,
        require: true,
    },
    diaPub: {
        type: Number,
        require: true,
    },
    nombreEvento: {
        type: String,
        required: true
    },
    anioEve: {
        type: Number,
        require: true,
    },
    mesEve: {
        type: Number,
        require: true,
    },
    diaEve: {
        type: Number,
        require: true,
    },
    inicioEve: {
        type: String,
        require: true,
    },
    finEve: {
        type: String,
        require: true,
    },
    lugarEve: {
        type: String,
        required: true
    },
    googleCaledar: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    objetivos: {
        type: String,
        required: true
    },
    agenda: {
        type: String,
        required: true
    },
    lecturaFacil: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        require: true,
    },
    correo: {
        type: String,
        required: true,
        lowercase: true,
        trim: true          // Elimina espacios accidentales
    },
    url: {
        type: String, 
        required: false
    },
    descripcionImg: {
        type: String,
        required: true
    },
    publicoMeta: {
        type: String,
        required: true
    },
    cupo: {
        type: Number,
        required: true
    },
    infoAdicional: {
        type: String,
        required: true
    },
    descLink: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    palabrasClave: {
        type: String,
        required: true
    },
    fijarImportante: {
        type: String,
        required: true
    },
    anioFinVis: {
        type: Number,
        require: true,
    },
    mesFinVis: {
        type: Number,
        require: true,
    },
    diaFinVis: {
        type: Number,
        require: true,
    },
    redesSociales: [{
        type: String,
        enum: ['facebook', 'twitter', 'linkedin']
    }],

});

const CrearEvento = mongoose.model("CrearEvento", schemaCrearEvento);
module.exports = CrearEvento; 