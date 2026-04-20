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


// Sweet Alert
const form = document.getElementById("formInscripcion");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    Swal.fire({

        title: "Inscripción Enviada",
        html: "<strong>Se envió la solicitud de inscripción con éxito.</strong> Los encargados de administrar NOTICIAS se estarán comunicando con usted, por medio del correo electrónico para notificar la aprobación de su inscripción al módulo.",
        icon: "success",
        confirmButtonText: "Continuar"

    }).then(() => {
        form.reset();

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalInscripcion'));
        modal.hide();

    });
});