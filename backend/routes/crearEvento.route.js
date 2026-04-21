const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const CrearEvento = require("../models/crearEvento.model");

// Post
router.post("/", async (req, res) => {
    try {
        const nuevoEvento = new CrearEvento(req.body);
        const eventoGuardado = await nuevoEvento.save();
        res.status(201).json({ mensaje: "Evento guardado con éxito", evento: eventoGuardado });
    } catch (error) {
        console.error("Error en servidor:", error);
        if (error.code === 11000) {
            return res.status(400).json({ msg: "El evento ya está registrado" });
        }
        res.status(500).json({ msg: "Error al crear el evento", detalle: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const eventos = await CrearEvento.find();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los eventos" });
    }
});

module.exports = router;




// // Configuración guardar fotos
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Los archivos se guardarán en esta carpeta
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // RUTA POST: 'upload.array("imagenes")' debe coincidir con el nombre en el frontend
// router.post("/", upload.array("url"), async (req, res) => {
//     try {
//         // Los textos (incluyendo Quill) llegan en req.body
//         // Los archivos llegan en req.files

//         const datos = {
//             ...req.body,
//             // Procesamos las imágenes para guardarlas en el array del modelo
//             imagenes: req.files.map((file, index) => ({
//                 url: `/uploads/${file.filename}`,
//                 // Las descripciones llegan como un array desde el frontend
//                 descripcion: Array.isArray(req.body.descripciones) 
//                              ? req.body.descripciones[index] 
//                              : req.body.descripciones
//             }))
//         };

//         const nuevoUsuario = new Usuario(datos);
//         await nuevoUsuario.save();

//         res.status(201).json({ mensaje: "Evento guardado con éxito" });
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ mensaje: "Error al guardar", detalle: error.message });
//     }
// });


// module.exports = router;




// 1. Configuración de almacenamiento de Multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // 2. RUTA POST: Crear evento con imágenes y campos de Quill
// // Usamos upload.array("imagenes") porque así los agrupamos en el frontend
// router.post("/", upload.array("imagenes"), async (req, res) => {
//     try {
//         // Usamos la variable 'archivos' que definimos con el respaldo de []
//         const archivos = req.files || [];
        
//         const datos = {
//             ...req.body,
//             // IMPORTANTE: Usar 'archivos.map' en lugar de 'req.files.map'
//             imagenes: archivos.map((file, index) => {
//                 const desc = Array.isArray(req.body.descripciones) 
//                              ? req.body.descripciones[index] 
//                              : req.body.descripciones;
//                 return {
//                     url: `/uploads/${file.filename}`,
//                     descripcion: desc || "" // Evita nulos
//                 };
//             })
//         };

//         const nuevoEvento = new CrearEvento(datos);
//         const eventoGuardado = await nuevoEvento.save();

//         res.status(201).json({ mensaje: "Evento guardado con éxito", evento: eventoGuardado });

//     } catch (error) {
//         console.error("Error en el servidor:", error);
//         res.status(500).json({ msg: "Error al crear el evento", detalle: error.message });
//     }
// });