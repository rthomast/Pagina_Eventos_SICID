const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario.model"); // Asegúrate de que la ruta a tu modelo sea correcta

// 1. GET: Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    }
});

// 2. POST: Crear un nuevo usuario
router.post("/", async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (error) {
        // Manejo de errores
        res.status(400).json({ 
            mensaje: "Error al crear usuario", 
            detalle: error.message 
        });
    }
});

module.exports = router;
