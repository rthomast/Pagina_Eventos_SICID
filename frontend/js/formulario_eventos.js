function nextStep() {
    document.getElementById("content1").classList.add("d-none");
    document.getElementById("content2").classList.remove("d-none");

    document.getElementById("step1").classList.remove("active");
    document.getElementById("step2").classList.add("active");
}

function prevStep() {
    document.getElementById("content2").classList.add("d-none");
    document.getElementById("content1").classList.remove("d-none");

    document.getElementById("step2").classList.remove("active");
    document.getElementById("step1").classList.add("active");
}

// Adjuntar imagenes
document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("contenedorImagenes");

    // Otra fila
    contenedor.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-add")) {

            const item = e.target.closest(".item-imagen");
            const clon = item.cloneNode(true);

            // limpiar inputs
            clon.querySelector("input[type='file']").value = "";
            clon.querySelector("input[type='text']").value = "";

            contenedor.appendChild(clon);
        }
    });

    // Eliminar fila
    contenedor.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-remove")) {

            const items = document.querySelectorAll(".item-imagen");

            // evitar eliminar el último
            if (items.length > 1) {
                e.target.closest(".item-imagen").remove();
            }
        }
    });

    // Validar archivos
    contenedor.addEventListener("change", function (e) {
        if (e.target.classList.contains("input-imagen")) {

            const file = e.target.files[0];

            if (!file) return;

            const tiposPermitidos = ["image/png", "image/jpeg"];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (!tiposPermitidos.includes(file.type)) {
                alert("Solo se permiten imágenes PNG o JPG");
                e.target.value = "";
                return;
            }

            if (file.size > maxSize) {
                alert("El archivo supera los 10MB");
                e.target.value = "";
                return;
            }
        }
    });

});


// Sweet Alert
const formDosPasos = document.getElementById("formMultiStep");

formDosPasos.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!formDosPasos.checkValidity()) {
        formDosPasos.reportValidity();
        return;
    }

    Swal.fire({

        title: "Inscripción Enviada",
        html: "Se envió la inscripción con éxito. Los encargados del evento se estarán comunicando con usted, por medio del correo electrónico y/o teléfono para confirmar su asistencia.",
        icon: "success",
        confirmButtonText: "Continuar"

    }).then(() => {
        formDosPasos.reset();

        const modalMiltiStep = bootstrap.Modal.getInstance(document.getElementById('modalMiltiStep'));
        modalMiltiStep.hide();
        

    });
});