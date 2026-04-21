const express = require("express");
const router = express.Router();
const Inscribirme = require("../models/inscribirme.model");


// Enviar datos del form
router.post("/", async (req, res) => {
    try {
        const nuevoInscribirme = new Inscribirme(req.body);
        const inscribirmeGuardado = await nuevoInscribirme.save();

        res.status(201).json(inscribirmeGuardado);

    } catch (error) {

        // Error por correo duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                msg: "El correo ya está registrado"
            });
        }

        res.status(500).json({ msg: "Error al crear inscripción", error });
    }
});

module.exports = router;