// Sweet Alert
const formConsultaEvento = document.getElementById("formConsultaEvento");

formConsultaEvento.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!formConsultaEvento.checkValidity()) {
        formConsultaEvento.reportValidity();
        return;
    }

    Swal.fire({

        title: "Consulta Enviada",
        html: "Se envió la consulta con éxito. Los encargados del evento se estarán comunicando con usted, por medio del correo electrónico para responder su consulta.",
        icon: "success",
        confirmButtonText: "Continuar"

    }).then(() => {
        formConsultaEvento.reset();

        const modalConsultaEvento = bootstrap.Modal.getInstance(document.getElementById('modalConsultaEvento'));
        modalConsultaEvento.hide();

    });
});