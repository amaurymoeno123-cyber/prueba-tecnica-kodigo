# Prueba Técnica: Módulo de Gestión de Incidencias

### 1. El Desafío

El equipo de soporte de Kódigo Fuente atiende diariamente incidencias de sus clientes POS.
Actualmente el registro se hace de forma manual, lo que dificulta el seguimiento y la priorización.

Se requiere una aplicación web sencilla que permita **registrar y gestionar tickets de soporte**, controlando su estado y prioridad.

---

### 2. Requerimientos Funcionales

**Gestión de Tickets**
- Crear un ticket con: título, descripción, cliente, prioridad (`Crítico`, `Alto`, `Medio`, `Bajo`) y agente asignado.
- Listar todos los tickets con sus datos principales.
- Cambiar el estado de un ticket: `Abierto` → `En progreso` → `Resuelto`.
- Eliminar un ticket (solo si está en estado `Abierto`).

**Validaciones**
- No permitir crear un ticket sin título, cliente ni prioridad.
- Un ticket en estado `Resuelto` no puede modificarse.

**Vista de resumen**
- Mostrar un contador simple por estado: cuántos tickets hay en `Abierto`, `En progreso` y `Resuelto`.

---

### 3. Restricciones Técnicas (Libertad de Elección)

El candidato debe elegir las herramientas, pero debe justificar su elección en un archivo **`DECISIONS.md`**.

**Obligatorio:**
- **Frontend:** React + Vite.
- **Backend:** Node.js **o** Laravel.
- **Base de datos:** PostgreSQL, SQL Server o MongoDB — mínimo 2 tablas/colecciones.
- El proyecto debe levantarse con **`docker-compose up`**.

**GitHub Actions — obligatorio.** Configure un flujo que automatice:
1. Linter y pruebas unitarias.
2. Construcción de imágenes Docker.
3. Publicación en un registro (GitHub Packages).

---

### 4. Entregables

- Repositorio **público en GitHub** con el código fuente.
- Archivo `DECISIONS.md` explicando las decisiones tecnológicas.
- Archivo `README.md` con los pasos para levantar el proyecto localmente.

---

**Envíe el link de su repositorio público al correo direccion@kodigofuente.com antes de las 4 pm del día 11 de abril, indicando en el asunto su nombre completo.**

> *"No importa si el gato es blanco o negro, siempre y cuando cace ratones."*
