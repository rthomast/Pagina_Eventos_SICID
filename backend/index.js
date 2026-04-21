const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
require('dotenv').config(); 

const app = express(); 
const PORT = process.env.PORT || 3000; 

// Importación de rutas
const usuarioRoute = require("./routes/usuario.route");
const inscripcionRoute = require("./routes/inscribirme.route");
const crearEventoRoute = require("./routes/crearEvento.route");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]); // Para el error querySrv ECONNREFUSED  

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('MongoDB Atlas conectado'))
.catch(error => console.log('Ocurrió un error al conectarse con MongoDB: ', error));

// Rutas
app.use("/usuario", usuarioRoute);
app.use("/inscribirme", inscripcionRoute);
app.use("/crearEvento", crearEventoRoute);

app.get('/', (req,res)=> {
    res.send('Servidor en funcionamiento');
});

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:' + PORT);
});