function next() {

    if (!validarPaso("paso1")) {

        Swal.fire({
            title: "Evento Incompleto",
            text: "Hay campos obligatorios que no han sido completados, por esta razón no se puede continuar con enviar el evento para revisión. Complete los campos y proceda a enviar el evento.",
            icon: "warning"
        });

        return;
    }

    document.getElementById("paso1").classList.add("d-none");
    document.getElementById("paso2").classList.remove("d-none");

    step1.classList.remove("active");
    step2.classList.add("active");
}

function prev() {
    document.getElementById("paso2").classList.add("d-none");
    document.getElementById("paso1").classList.remove("d-none");

    step2.classList.remove("active");
    step1.classList.add("active");
}

//  Botones añadir otra seccion
document.addEventListener("click", function (e) {

    // FECHAS
    if (e.target.classList.contains("btn-add")) {
        const item = e.target.closest(".fecha-item");
        const clone = item.cloneNode(true);
        document.getElementById("fechasContainer").appendChild(clone);
    }

    if (e.target.classList.contains("btn-remove")) {
        const items = document.querySelectorAll(".fecha-item");
        if (items.length > 1) e.target.closest(".fecha-item").remove();
    }

    // IMÁGENES
    if (e.target.classList.contains("btn-add-img")) {
        const item = e.target.closest(".imagen-item");
        const clone = item.cloneNode(true);
        document.getElementById("imagenesContainer").appendChild(clone);
    }

    if (e.target.classList.contains("btn-remove-img")) {
        const items = document.querySelectorAll(".imagen-item");
        if (items.length > 1) e.target.closest(".imagen-item").remove();
    }

    // REFERENCIAS
    if (e.target.classList.contains("btn-add-ref")) {
        const item = e.target.closest(".referencia-item");
        const clone = item.cloneNode(true);
        document.getElementById("referenciasContainer").appendChild(clone);
    }

    if (e.target.classList.contains("btn-remove-ref")) {
        const items = document.querySelectorAll(".referencia-item");
        if (items.length > 1) e.target.closest(".referencia-item").remove();
    }

})



// Validar inputs
function validarPaso(pasoId) {
    const paso = document.getElementById(pasoId);
    const inputs = paso.querySelectorAll("input, select, textarea");

    let valido = true;

    inputs.forEach(input => {

        // Solo validar los que tienen required
        if (input.hasAttribute("required")) {

            if (!input.checkValidity()) {
                input.classList.add("is-invalid");
                valido = false;
            } else {
                input.classList.remove("is-invalid");
            }
        }
    });

    return valido;
}

// // Validar antes de enviar
// document.getElementById("formEvento").addEventListener("submit", function (e) {

//     e.preventDefault();

//     if (!validarPaso("paso2")) {
//         Swal.fire({
//             title: "Evento Incompleto",
//             text: "Hay campos obligatorios que no han sido completados, por esta razón no se puede continuar con enviar el evento para revisión. Complete los campos y proceda a enviar el evento.",
//             icon: "warning"
//         });
//         return;
//     }

//     Swal.fire({
//         title: "Evento Enviado",
//         text: "Se envió el evento con éxito al administrador. Este debe ser revisado y aprobado por el administrador, para ser publicado en la sección de Eventos. Pronto recibirá una notificación para conocer si el evento fue aprobado o rechazado.",
//         icon: "success"
//     }).then(() => {
//         this.reset();
//         location.reload(); // opcional
//     });

// })


// JS
function llenarSelect(select, inicio, fin) {
    select.innerHTML = '';
    for (let i = inicio; i <= fin; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
}

const anioActual = new Date().getFullYear();

// Año
document.querySelectorAll('.Anio').forEach(el => {
    llenarSelect(el, 2017, anioActual);
});

// Mes
document.querySelectorAll('.Mes').forEach(el => {
    llenarSelect(el, 1, 12);
});

// Dia
document.querySelectorAll('.Dia').forEach(el => {
    llenarSelect(el, 1, 31);
});


// Selector de horas
function llenarHoras() {
    const selectoresHora = document.querySelectorAll('.select-hora');

    selectoresHora.forEach(select => {
        select.innerHTML = '';

        for (let i = 0; i <= 23; i++) {
            let option = document.createElement("option");

            let horaFormateada = i.toString().padStart(2, '0') + ':00';

            option.value = horaFormateada;
            option.text = horaFormateada;
            select.appendChild(option);
        }
    });
}

llenarHoras();



// Redes elegidas
function obtenerRedesSeleccionadas() {
    const seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');

    const valores = Array.from(seleccionados).map(cb => cb.value);

    console.log("Redes elegidas:", valores); // Ejemplo: ["Facebook", "Twitter", "LinkedIn"]
    return valores;
}


document.getElementById("formEvento").addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validarPaso("paso2")) {

        Swal.fire({
            title: "Evento Incompleto",
            text: "Hay campos obligatorios que no han sido completados, por esta razón no se puede continuar con enviar el evento para revisión. Complete los campos y proceda a enviar el evento.",
            icon: "warning"
        });

        return;
    }

    // Capturamos todos los campos del formulario automáticamente
    const formData = new FormData(this);
    const datos = Object.fromEntries(formData.entries());

    // Si tienes checkboxes de redes sociales, agrégalos manualmente como array
    datos.redesSociales = Array.from(document.querySelectorAll('input[name="redesSociales"]:checked'))
                               .map(cb => cb.value);

    try {
        Swal.showLoading();
        const respuesta = await fetch('http://localhost:3000/crearEvento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            // Swal.fire("Éxito", "Evento guardado", "success").then(() => location.reload());
            Swal.fire({
                title: "Evento Enviado",
                text: "Se envió el evento con éxito al administrador. Este debe ser revisado y aprobado por el administrador, para ser publicado en la sección de Eventos. Pronto recibirá una notificación para conocer si el evento fue aprobado o rechazado.",
                icon: "success"
            }).then(() => {
                this.reset();
                location.reload();
            });
        } else {
            // Swal.fire("Error", resultado.msg || resultado.detalle, "error");
            Swal.fire({
                title: "Evento Incompleto",
                text: "Hay campos obligatorios que no han sido completados, por esta razón no se puede continuar con enviar el evento para revisión. Complete los campos y proceda a enviar el evento.",
                icon: "warning"
            });
            return;
        }
    } catch (error) {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
});


// Quill, herrramienta de texto

// let quillObjetivos, quillAgenda, quillLecturaFacil, quillInfoAdicional;

// document.addEventListener("DOMContentLoaded", function () {

//     const quillObjetivos = new Quill('#editorObjetivos', {
//         theme: 'snow',
//         placeholder: 'Ingrese los objetivos...',
//     });

//     const quillAgenda = new Quill('#editorAgenda', {
//         theme: 'snow',
//         placeholder: 'Ingrese la agenda...',
//     });

//     const quillLecturaFacil = new Quill('#editorLecturaFacil', {
//         theme: 'snow',
//         placeholder: 'Ingrese información de lectura facil...',
//     });

//     const quillInfoAdicional = new Quill('#editorInfoAdicional', {
//         theme: 'snow',
//         placeholder: 'Ingrese información adicional...',
//     });

//     // Guardarlos en un objeto (MUY IMPORTANTE para usarlos luego)
//     const editores = {
//         objetivos: quillObjetivos,
//         agenda: quillAgenda,
//         lecturaFacil: quillLecturaFacil,
//         infoAdicional: quillInfoAdicional
//     };

// });





// Envio al backend, verificacion
// const form = document.getElementById("formEvento");

// form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     // Validación nativa de HTML5
//     if (!form.checkValidity()) {
//         form.reportValidity();
//         return;
//     }

//     // Recolección de datos (los 'name' en el HTML coincidan)
//     const formData = new FormData(form);
//     const datos = {
//         anioPub: formData.get('anioPub'),
//         mesPub: formData.get('mesPub'),
//         diaPub: formData.get('diaPub'),
//         nombreEvento: formData.get('nombreEvento'),
//         anioEve: formData.get('anioEve'),
//         mesEve: formData.get('mesEve'),
//         diaEve: formData.get('diaEve'),
//         inicioEve: formData.get('inicioEve'),
//         finEve: formData.get('finEve'),
//         lugarEve: formData.get('lugarEve'),
//         googleCaledar: formData.get('googleCaledar'),
//         descripcion: formData.get('descripcion'),
//         objetivos: formData.get('objetivos'),
//         agenda: formData.get('agenda'),
//         lecturaFacil: formData.get('lecturaFacil'),
//         nombre: formData.get('nombre'),
//         correo: formData.get('correo'),
//         url: formData.get('url'),
//         descripcionImg: formData.get('descripcionImg'),
//         publicoMeta: formData.get('publicoMeta'),
//         cupo: formData.get('cupo'),
//         infoAdicional: formData.get('infoAdicional'),
//         descLink: formData.get('descLink'),
//         link: formData.get('link'),
//         palabrasClave: formData.get('palabrasClave'),
//         fijarImportante: formData.get('fijarImportante'),
//         anioFinVis: formData.get('anioFinVis'),
//         anioFinVis: formData.get('anioFinVis'),
//         mesFinVis: formData.get('mesFinVis'),
//         diaFinVis: formData.get('diaFinVis'),
//         redesSociales: form.querySelector('[name="redesSociales"]').checked
//     };

//     try {
//         // 3. Envío al backend
//         const respuesta = await fetch('http://localhost:3000/crearEvento', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(datos)
//         });

//         const resultado = await respuesta.json();

//         if (respuesta.ok) {
//             // 4. Si el backend responde OK, mostramos TU alerta de SweetAlert
//             Swal.fire({
//                 title: "Inscripción Enviada",
//                 html: "<strong>Se envió la solicitud de inscripción con éxito.</strong> Los encargados de administrar NOTICIAS se estarán comunicando con usted, por medio del correo electrónico para notificar la aprobación de su inscripción al módulo.",
//                 icon: "success",
//                 confirmButtonText: "Continuar"
//             }).then(() => {
//                 form.reset();
//                 const modal = bootstrap.Modal.getInstance(document.getElementById('modalInscripcion'));
//                 if (modal) modal.hide();
//             });
//         } else {
//             // Error
//             Swal.fire("Error", "No se pudo registrar: " + (resultado.detalle || "Error desconocido"), "error");
//         }

//     } catch (error) {
//         console.error("Error de conexión:", error);
//         Swal.fire("Error de red", "No se pudo conectar con el servidor. ¿Está encendido el backend?", "error");
//     }
// });

// const form = document.getElementById("formEvento");

// form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     if (!form.checkValidity()) {
//         form.reportValidity();
//         return;
//     }

//     // 1. CREAR EL FORMDATA
//     // Esto captura automáticamente todos los inputs que tengan el atributo 'name'
//     const formData = new FormData(form);

//     // 2. AGREGAR LAS IMÁGENES DINÁMICAS (Aquí es donde lo agregas)
//     const inputImagenes = document.querySelectorAll(".input-imagen"); 
//     const inputDescripciones = document.querySelectorAll(".input-descripcion");

//     inputImagenes.forEach((input, index) => {
//         if (input.files[0]) {
//             // El nombre "imagenes" debe ser IGUAL al del backend: upload.array("imagenes")
//             formData.append("imagenes", input.files[0]);
//             // El nombre "descripciones" debe ser IGUAL al que procesas en el backend
//             formData.append("descripciones", inputDescripciones[index].value);
//         }
//     });

//     // 3. AGREGAR LAS REDES SOCIALES (Si son varios checkboxes)
//     // Borramos lo que capturó el FormData automáticamente para manejarlo como array
//     formData.delete("redesSociales");
//     const redes = Array.from(document.querySelectorAll('input[name="redes"]:checked'))
//                        .map(cb => cb.value);
//     redes.forEach(red => formData.append("redesSociales", red));

//     try {
//         Swal.showLoading();

//         // 4. ENVÍO AL BACKEND
//         // IMPORTANTE: No pongas 'headers', el navegador configurará el 'multipart/form-data' solo
//         const respuesta = await fetch('http://localhost:3000/crearEvento', {
//             method: 'POST',
//             body: formData // Enviamos el objeto formData directamente
//         });

//         const resultado = await respuesta.json();

//         if (respuesta.ok) {
//             Swal.fire({
//                 title: "Inscripción Enviada",
//                 html: "<strong>Se envió la solicitud de inscripción con éxito.</strong>",
//                 icon: "success",
//                 confirmButtonText: "Continuar"
//             }).then(() => {
//                 form.reset();
//                 location.reload();
//             });
//         } else {
//             Swal.fire("Error", "No se pudo registrar: " + (resultado.msg || "Error desconocido"), "error");
//         }

//     } catch (error) {
//         console.error("Error de conexión:", error);
//         Swal.fire("Error de red", "No se pudo conectar con el servidor.", "error");
//     }
// });





// // Submit
// document.getElementById("formEvento").addEventListener("submit", async function (e) {
//     e.preventDefault();

//     // 1. --- VALIDACIÓN DE PASO 2 (Inputs normales) ---
//     if (!validarPaso("paso2")) {
//         Swal.fire({
//             title: "Evento Incompleto",
//             text: "Hay campos obligatorios pendientes en el paso 2.",
//             icon: "warning"
//         });
//         return;
//     }

//     // 2. --- VALIDACIÓN DE EDITORES QUILL ---
//     // Extraemos el contenido de los 4 editores
//     const htmlObjetivos = quillObjetivos.root.innerHTML;
//     const htmlAgenda = quillAgenda.root.innerHTML;
//     const htmlLecturaFacil = quillLecturaFacil.root.innerHTML;
//     const htmlInfoAdicional = quillInfoAdicional.root.innerHTML;

//     // Función auxiliar para saber si el editor está vacío (Quill por defecto pone <p><br></p>)
//     const estaVacio = (html) => html === "<p><br></p>" || html.trim() === "";

//     if (estaVacio(htmlObjetivos) || estaVacio(htmlAgenda) || estaVacio(htmlLecturaFacil) || estaVacio(htmlInfoAdicional)) {
//         Swal.fire({
//             title: "Campos de texto incompletos",
//             text: "Por favor, complete todos los cuadros de texto (Objetivos, Agenda, Lectura Fácil e Información Adicional).",
//             icon: "warning"
//         });
//         return;
//     }

//     // 3. --- RECOLECCIÓN DE DATOS ---
//     const formData = new FormData(this);

//     // Añadir los contenidos de Quill al FormData
//     formData.append("objetivos", htmlObjetivos);
//     formData.append("agenda", htmlAgenda);
//     formData.append("lecturaFacil", htmlLecturaFacil);
//     formData.append("infoAdicional", htmlInfoAdicional);

//     // Añadir Redes Sociales
//     const redes = obtenerRedesSeleccionadas();
//     redes.forEach(red => formData.append("redesSociales", red));

//     // Añadir Imágenes y sus descripciones dinámicas
//     const inputImagenes = document.querySelectorAll(".input-imagen");
//     const inputDescripciones = document.querySelectorAll(".input-descripcion");

//     inputImagenes.forEach((input, index) => {
//         if (input.files[0]) {
//             // El nombre "imagenes" debe coincidir con upload.array("imagenes") en el backend
//             formData.append("imagenes", input.files[0]);
//             formData.append("descripciones", inputDescripciones[index].value);
//         }
//     });

//     // 4. --- ENVÍO AL BACKEND ---
//     try {
//         Swal.fire({
//             title: 'Enviando...',
//             text: 'Por favor espere mientras procesamos su solicitud',
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });

//         // Asegúrate de que la URL sea la correcta (ej: /api/crear-evento o /usuario)
//         const respuesta = await fetch('http://localhost:3000/usuario', {
//             method: 'POST',
//             body: formData
//         });

//         const resultado = await respuesta.json();

//         if (respuesta.ok) {
//             Swal.fire({
//                 title: "Evento Enviado",
//                 text: "Se envió el evento con éxito al administrador.",
//                 icon: "success"
//             }).then(() => {
//                 this.reset();
//                 location.reload();
//             });
//         } else {
//             Swal.fire("Error", resultado.msg || resultado.detalle || "Error al guardar", "error");
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         Swal.fire("Error de red", "No se pudo conectar con el servidor.", "error");
//     }
// });







// // 1. Declarar variables globales
// let quillObjetivos, quillAgenda, quillLecturaFacil, quillInfoAdicional;

// document.addEventListener("DOMContentLoaded", function () {

//     // 2. Inicializar Quill
//     quillObjetivos = new Quill('#editorObjetivos', { theme: 'snow', placeholder: '...' });
//     quillAgenda = new Quill('#editorAgenda', { theme: 'snow', placeholder: '...' });
//     quillLecturaFacil = new Quill('#editorLecturaFacil', { theme: 'snow', placeholder: '...' });
//     quillInfoAdicional = new Quill('#editorInfoAdicional', { theme: 'snow', placeholder: '...' });

//     // 3. Mover el evento SUBMIT AQUÍ ADENTRO
//     const form = document.getElementById("formEvento");

//     form.addEventListener("submit", async function (e) {
//         e.preventDefault();

//         // Ahora es imposible que sean undefined porque estamos dentro del mismo bloque
//         const htmlObjetivos = quillObjetivos.root.innerHTML;
//         const htmlAgenda = quillAgenda.root.innerHTML;
//         const htmlLecturaFacil = quillLecturaFacil.root.innerHTML;
//         const htmlInfoAdicional = quillInfoAdicional.root.innerHTML;

//         // ... resto de tu lógica de validación y fetch ...


//         // --- VALIDACIÓN DE EDITORES ---
//         const estaVacio = (html) => html === "<p><br></p>" || html.trim() === "";

//         if (estaVacio(htmlObjetivos) || estaVacio(htmlAgenda) || estaVacio(htmlLecturaFacil) || estaVacio(htmlInfoAdicional)) {
//             Swal.fire({
//                 title: "Campos de texto incompletos",
//                 text: "Por favor, complete todos los cuadros de texto.",
//                 icon: "warning"
//             });
//             return;
//         }

//         // --- RECOLECCIÓN Y ENVÍO ---
//         const formData = new FormData(this);
//         formData.append("objetivos", htmlObjetivos);
//         formData.append("agenda", htmlAgenda);
//         formData.append("lecturaFacil", htmlLecturaFacil);
//         formData.append("infoAdicional", htmlInfoAdicional);

//         // ... (añadir los demás campos al formData)

//         try {
//             // Tu código fetch aquí...
//         } catch (error) {
//             console.error(error);
//         }
//     });
// });
