# Requerimientos funcionales

# Módulo de Consulta de Eventos

- RF1 - Visualización de Cartelera: El sistema debe listar los eventos actuales y futuros, limitando la     visualización inicial a 10 elementos por página.
- RF2 - Filtros de Búsqueda: El usuario podrá filtrar los eventos mediante búsqueda por nombre (texto libre) y por rango de fechas.
- RF3 - Detalle del Evento: Al seleccionar un evento, el sistema debe desplegar:
        Información general: Descripción, fecha, hora, plataforma/lugar, encargado y contacto.
        Contenido: Objetivos, público meta y agenda detallada.
        Multimedia: Información adicional y un carrusel de imágenes relacionadas.
- RF4 - Formulario de Consultas: El sistema debe permitir realizar preguntas sobre un evento específico mediante un formulario que capture el correo electrónico y la duda del usuario.

# Módulo de Inscripción (Proceso en dos pasos)

- RF5 - Inscripción - Paso 1 (Datos Personales y Ubicación): El formulario debe capturar nombre, identificación (tipo y número), dirección completa (provincia, cantón, distrito, señas), contacto, profesión, entidad, tipo de deficiencia y necesidad de transporte.
- RF6 - Inscripción - Paso 2 (Logística y Accesibilidad): El sistema debe capturar:
        Costos estimados (transporte/hospedaje) y requerimiento de hospedaje.
        Información de salud (alergias a alimentos/medicamentos).
- RF7 - Carga de Archivos: El sistema debe permitir adjuntar imágenes y videos (máximo 10 MB por archivo) incluyendo obligatoriamente una descripción textual de las imágenes (para accesibilidad).
- RF8 - Suscripción y Notificaciones: El usuario podrá autorizar mediante un checkbox el envío de notificaciones sobre el evento vía correo electrónico y teléfono.
- RF9 - Confirmación de Registro: Tras completar el proceso, el sistema debe mostrar un mensaje de éxito ("Inscripción enviada").


# Módulo de Autenticación

- RF10 - Control de Acceso: El sistema debe permitir el inicio de sesión mediante credenciales (usuario/correo y contraseña).
- RF11 - Gestión de Cuentas: El sistema debe proporcionar opciones para la creación de nuevas cuentas de editor, recuperación de contraseña y flujo de registro.

# Módulo de Gestión de Eventos

- RF12 - Creación de Eventos: El editor debe poder registrar un evento completando:
        Datos Básicos: Nombre, fecha de publicación, fecha/horario del evento, lugar y enlace a Google Calendar.
        Contenido Inclusivo: Descripción, objetivos, agenda y agenda en formato de Lectura Fácil.
        Multimedia y Logística: Contacto, imágenes, video (opcional), público meta, cupo limitado e información adicional.
        Metadatos: Referencias, palabras clave (SEO), fecha de finalización de visualización y redes sociales.
- RF13 - Configuración de Visibilidad: El sistema debe permitir fijar eventos como "Importantes" y vincularlos a una lista de difusión específica.
- RF14 - Estados del Evento:
        Borrador: Guardado parcial de la información para completarla posteriormente.
        Publicados: Eventos activos donde se permite la edición, revisión o eliminación.
        Finalizados: Repositorio histórico de eventos concluidos para consulta futura.

# Módulo de Usuarios y Difusión

- RF15 - Gestión de Difusión: El editor podrá crear y administrar listas de difusión para el envío masivo de información a los suscriptores.
- RF16 - Gestión de Suscriptores: El sistema debe permitir listar y consultar la base de datos de usuarios suscritos para seguimiento.