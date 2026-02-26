# Requerimientos no funcionales

- RNF1 - Accesibilidad Sensorial: Dado que se solicita información sobre deficiencias y apoyos (LESCO), el sitio debe cumplir con el estándar WCAG 2.1 Nivel AA, permitiendo que personas con discapacidad visual o motriz completen el formulario sin barreras.
- RNF2 - Manejo de Archivos: El sistema debe validar que el tamaño de los adjuntos no exceda los 10 MB.
- RNF3 - Persistencia de Datos: En el formulario de dos pasos, el sistema debe permitir "Ir atrás" manteniendo los datos ingresados previamente en la sesión del usuario.
- RNF4 - Protección de Datos Sensibles: Debido a que se solicita información sobre salud (alergias y tipos de deficiencia), los datos deben ser tratados bajo la Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales.
- RNF5 - Usabilidad (Feedback): El sistema debe notificar claramente al usuario cuando una acción ha sido completada con éxito o si existen errores de validación en el formulario.

- RNF6 - Persistencia de Borradores: El sistema debe asegurar que los datos ingresados en un evento en estado "Borrador" no se pierdan al cerrar la sesión.
- RNF7 - Validación de Integridad: El sistema debe validar que todos los campos obligatorios estén completos antes de permitir el cambio de estado de "Borrador" a "Publicado", mostrando un mensaje de "Evento incompleto" en caso contrario.
- RNF8 - Gestión de Navegación (Sidebar): La interfaz administrativa debe utilizar una barra lateral persistente para permitir el cambio rápido entre las categorías de Eventos y Usuarios.
- RNF9 - Seguridad de Sesión: Tras 30 minutos de inactividad (o el tiempo que definas), el sistema debe cerrar la sesión del editor automáticamente para proteger la información de la Política Nacional.
- RNF10 - Control de Cupos: El sistema debe llevar un conteo en tiempo real de las inscripciones frente al "Cupo del evento" definido para evitar sobrecupos.