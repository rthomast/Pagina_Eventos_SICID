// Filtro de busqueda
function llenarSelect(select, inicio, fin) {
    for (let i = inicio; i <= fin; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
}

// Obtener elementos correctamente
const desdeAnio = document.getElementById("desdeAnio");
const desdeMes = document.getElementById("desdeMes");
const desdeDia = document.getElementById("desdeDia");

const hastaAnio = document.getElementById("hastaAnio");
const hastaMes = document.getElementById("hastaMes");
const hastaDia = document.getElementById("hastaDia");

// Año actual
const anioActual = new Date().getFullYear();

// llenar Select
llenarSelect(desdeAnio, 2017, anioActual);
llenarSelect(hastaAnio, 2017, anioActual);

llenarSelect(desdeMes, 1, 12);
llenarSelect(hastaMes, 1, 12);

llenarSelect(desdeDia, 1, 31);
llenarSelect(hastaDia, 1, 31);

// Evento submit
document.getElementById("filtroEventos").addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = {
        texto: document.getElementById("busqueda").value,
        desde: `${desdeAnio.value}-${desdeMes.value}-${desdeDia.value}`,
        hasta: `${hastaAnio.value}-${hastaMes.value}-${hastaDia.value}`
    };

    console.log("Filtro aplicado:", datos);
});



// Envio al backend, verificacion
const form = document.getElementById("formInscripcion");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 1. Validación nativa de HTML5
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // 2. Recolección de datos (asegúrate de que los 'name' en el HTML coincidan)
    const formData = new FormData(form);
    const datos = {
        nombre: formData.get('nombre'),
        correo: formData.get('correo'),
        profesion: formData.get('profesion'),
        entidadTrabaja: formData.get('entidadTrabaja'),
        razon: formData.get('razon'),
        aceptaNotif: form.querySelector('[name="aceptaNotif"]').checked
    };

    try {
        // 3. Envío al backend
        const respuesta = await fetch('http://localhost:3000/inscribirme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            // 4. Si el backend responde OK, mostramos TU alerta de SweetAlert
            Swal.fire({
                title: "Inscripción Enviada",
                html: "<strong>Se envió la solicitud de inscripción con éxito.</strong> Los encargados de administrar NOTICIAS se estarán comunicando con usted, por medio del correo electrónico para notificar la aprobación de su inscripción al módulo.",
                icon: "success",
                confirmButtonText: "Continuar"
            }).then(() => {
                form.reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalInscripcion'));
                if (modal) modal.hide();
            });
        } else {
            // Caso de error (ej: correo duplicado o error de validación en el modelo)
            Swal.fire("Error", "No se pudo registrar: " + (resultado.detalle || "Error desconocido"), "error");
        }

    } catch (error) {
        console.error("Error de conexión:", error);
        Swal.fire("Error de red", "No se pudo conectar con el servidor. ¿Está encendido el backend?", "error");
    }
});
