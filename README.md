# Pagina de eventos del SICID

# Convenciones de nomenclatura y formato de código

- Principalmente se utilizara camelCase
- Accesibilidad: Es obligatorio que todo nuevo componente visual incluya etiquetas aria-label, atributos alt descriptivos.

# Estrategia de branches y commits.

- main: Rama de producción. Solo contiene código estable y probado.
- develop: Rama de integración para desarrollo.
- feature: Para nuevas funcionalidades.
- fix: Para corrección de errores.

# Tipos de commit

- new: se ha creado un método o recurso en el programa que no existía antes del commit.
- improved: se mejoró la forma en que se hacía un método o como se mostraba algo. No es un problema como tal.
- fixed: se corrigió un problema, algo que estaba mal.
- update: se reemplazó un recurso o código por otro realizado por alguien más.
- style: cambios de formato (espacios, indentación, punto y coma) que no alteran la lógica del programa.
- docs: cambios en la documentación (comentarios, README, guías) que no afectan el código funcional.
- incomplete: commit especial que indica que se ha respaldado una versión inestable o incompleta de la funcionalidad. Se recomienda usarlo como una forma de indicar un respaldo temporal del trabajo hacia una versión estable de la funcionalidad que se está programando, pero que se tiene que dejar por un momento. 

# Dependencias

- Se utilizaran las dependencias body-parser, cors, dotenv, express, mongoose y multer.
- Para instalarlas tienes que abrir una terminar en el archivo index.js del backend y colocar el siguiente comando "npm i" y el sistema instalara todas las dependencias.
- Para iniciar el servidos tienes que abrir una terminar en el archivo index.js del backend y colocar el siguiente comando " node .\index.js" y el sistema conectara con MongoDB Atlas, te debera mostrar un mensaje que dice "Servidor corriendo en http://localhost:3000 MongoDB Atlas conectado"

# Descripcion breve del proyecto

- El proyecto se crea a partir de la necesidad de tener un medio de comunicacion para eventos para discapacitados donde en ese se pueda visualizar, inscribirse y consultar sobre todos estos eventos.