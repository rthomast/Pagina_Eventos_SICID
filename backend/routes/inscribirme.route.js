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


// Ver todas las inscripciones
router.get("/", async (req, res) => {
    try {
        const usuarios = await Inscribirme.find();
        res.json(usuarios);

    } catch (error) {
        res.status(500).json({ msg: "Error al obtener inscripciones" });
    }
});


// Ver por ID
router.get("/:id", async (req, res) => {
    try {
        const inscribirme = await Inscribirme.findById(req.params.id);

        if (!inscribirme) {
            return res.status(404).json({ msg: "Inscripcion no encontrado" });
        }

        res.json(inscribirme);

    } catch (error) {
        res.status(500).json({ msg: "Error al buscar inscripcion" });
    }
});


// PUT
router.put("/:id", async (req, res) => {
    try {
        const inscripcionActualizado = await Inscribirme.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!inscripcionActualizado) {
            return res.status(404).json({ msg: "Inscripción no encontrado" });
        }

        res.json(inscripcionActualizado);

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar inscripción" });
    }
});


// Actualizar estado
router.patch("/:id/estado", async (req, res) => {
    try {
        const { role } = req.body;

        const inscribirme = await Inscribirme.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        );

        if (!inscribirme) {
            return res.status(404).json({ msg: "Inscripción no encontrada" });
        }

        res.json(inscribirme);

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar estado de inscripción" });
    }
});


// Eliminar
router.delete("/:id", async (req, res) => {
    try {
        const inscripcionEliminada = await Inscribirme.findByIdAndDelete(req.params.id);

        if (!inscripcionEliminada) {
            return res.status(404).json({ msg: "Inscripción no encontrada" });
        }

        res.json({ msg: "Inscripcion eliminada correctamente" });

    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar inscripción" });
    }
});


module.exports = router;