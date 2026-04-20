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

// Validar antes de enviar
document.getElementById("formEvento").addEventListener("submit", function (e) {

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
        title: "Evento Enviado",
        text: "Se envió el evento con éxito al administrador. Este debe ser revisado y aprobado por el administrador, para ser publicad0 en la sección de Eventos. Pronto recibirá una notificación para conocer si el evento fue aprobado o rechazado.",
        icon: "success"
    }).then(() => {
        this.reset();
        location.reload(); // opcional
    });

})


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


// Quill, herrramienta de texto
document.addEventListener("DOMContentLoaded", function () {

    const quillObjetivos = new Quill('#editorObjetivos', {
        theme: 'snow',
        placeholder: 'Ingrese los objetivos...',
    });

    const quillAgenda = new Quill('#editorAgenda', {
        theme: 'snow',
        placeholder: 'Ingrese la agenda...',
    });

    const quillLecturaFacil = new Quill('#editorLecturaFacil', {
        theme: 'snow',
        placeholder: 'Ingrese información de lectura facil...',
    });

    const quillInfoAdicional = new Quill('#editorInfoAdicional', {
        theme: 'snow',
        placeholder: 'Ingrese información adicional...',
    });

    // Guardarlos en un objeto (MUY IMPORTANTE para usarlos luego)
    const editores = {
        objetivos: quillObjetivos,
        agenda: quillAgenda,
        lecturaFacil: quillLecturaFacil,
        infoAdicional: quillInfoAdicional
    };

    // Evento submit del form
    const form = document.getElementById("formEvento");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtener contenido de cada editor
        const objetivos = editores.objetivos.root.innerHTML;
        const agenda = editores.agenda.root.innerHTML;
        const lecturaFacil = editores.lecturaFacil.root.innerHTML;
        const infoAdicional = editores.infoAdicional.root.innerHTML;

        // Validación básica
        if (estaVacio(objetivos) || estaVacio(agenda) || estaVacio(lecturaFacil) || estaVacio(infoAdicional)) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Debe completar todos los campos de cuadros de texto",
                icon: "warning"
            });
            return;
        }

        // Datos separados
        console.log("Objetivos:", objetivos);
        console.log("Agenda:", agenda);
        console.log("Agenda:", lecturaFacil);
        console.log("Info adicional:", infoAdicional);

        // Aquí puedes enviarlos al backend (fetch)

        Swal.fire({
            title: "Enviado",
            text: "Formulario enviado correctamente",
            icon: "success"
        }).then(() => {
            this.reset();
            location.reload(); // opcional
        });

        form.reset();

        // Limpiar editores manualmente
        editores.objetivos.setContents([]);
        editores.descripcion.setContents([]);
        editores.info.setContents([]);


    });

});


// Redes elegidas
function obtenerRedesSeleccionadas() {
    const seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');

    const valores = Array.from(seleccionados).map(cb => cb.value);

    console.log("Redes elegidas:", valores); // Ejemplo: ["Facebook", "Twitter", "LinkedIn"]
    return valores;
}
