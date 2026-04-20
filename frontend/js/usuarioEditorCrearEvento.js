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

// ===== BOTONES DINÁMICOS =====
document.addEventListener("click", function(e) {

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

// Validar antes de enviar
document.getElementById("formEvento").addEventListener("submit", function(e) {

    e.preventDefault();

    if (!validarPaso("paso2")) {
        Swal.fire({
            title: "Evento Incompleto",
            text: "Hay campos obligatorios que no han sido completados, por esta razón no se puede continuar con enviar el evento para revisión. Complete los campos y proceda a enviar el evento.",
            icon: "warning"
        });
        return;
    }

    Swal.fire({
        title: "Enviado",
        text: "El evento fue enviado correctamente",
        icon: "success"
    }).then(() => {
        this.reset();
        location.reload(); // opcional
    });

})


// Fechas
function llenarSelect(select, inicio, fin) {
    for (let i = inicio; i <= fin; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
}


const Anio = document.getElementById("Anio");
const Mes = document.getElementById("Mes");
const Dia = document.getElementById("Dia");

// año actual
const anioActual = new Date().getFullYear();

// Ingresar los select
llenarSelect(Anio, 2017, anioActual);

llenarSelect(Mes, 1, 12);

llenarSelect(Dia, 1, 31);