# Pagina de eventos del SICID

# Convenciones de nomenclatura y formato de código

- Principalmente se utilizara camelCase
- Los nombres de los archivos se utilizaran snake_case
- Accesibilidad: Es obligatorio que todo nuevo componente visual incluya etiquetas aria-label, atributos alt descriptivos y que sea navegable mediante el teclado (Tabindex)

# Estrategia de branches y commits.

- main: Rama de producción. Solo contiene código estable y probado.
- develop: Rama de integración para desarrollo.
- feature: Para nuevas funcionalidades.
- fix: Para corrección de errores.

# Tipos de commit

- new: se ha creado un método o recurso en el programa que no existía antes del commit.
- improved: se mejoró la forma en que se hacía un método o como se mostraba algo. No es un problema como tal.
- fixed: se corrigió un problema, algo que estaba mal.
- updated: se reemplazó un recurso o código por otro realizado por alguien más.
- style: cambios de formato (espacios, indentación, punto y coma) que no alteran la lógica del programa.
- docs: cambios en la documentación (comentarios, README, guías) que no afectan el código funcional.
- incomplete: commit especial que indica que se ha respaldado una versión inestable o incompleta de la funcionalidad. Se recomienda usarlo como una forma de indicar un respaldo temporal del trabajo hacia una versión estable de la funcionalidad que se está programando, pero que se tiene que dejar por un momento. 

