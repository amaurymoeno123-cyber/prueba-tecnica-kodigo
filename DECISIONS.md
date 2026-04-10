# ¿Por qué tomé estas decisiones técnicas?

Al enfrentarme a este desafío, mi objetivo principal fue equilibrar la simplicidad con la profesionalidad. Aquí explico el razonamiento detrás de las piezas clave del sistema.

## 1. Arquitectura de Capas (Sólida y Escalable)
En lugar de poner toda la lógica en los controladores, decidí separar el backend en Rutas -> Controladores -> Servicios -> Repositorios. 
*   **¿La razón?** Quería que las "Reglas de Negocio" (como no poder borrar un ticket resuelto) vivieran en un lugar centralizado (Servicios) y no mezcladas con la lógica de HTTP. Esto hace que el código sea mucho más fácil de testear y mantener si el proyecto crece.

## 2. CSS Vanilla: De vuelta a las bases
Hoy en día es común saltar directo a Tailwind o librerías de componentes. Sin embargo, para esta prueba elegí escribir CSS puro.
*   **¿La razón?** Quería demostrar que entiendo cómo funciona el layout, las variables de CSS y el diseño responsivo desde su raíz. Además, esto me permitió crear un diseño único y "premium" sin que la aplicación se viera como un template genérico de internet.

## 3. Prisma ORM y TypeScript (Paz mental)
Elegí esta combinación porque la seguridad de tipos es innegociable para mí en proyectos modernos.
*   **¿La razón?** Prisma genera tipos automáticamente basados en mi base de datos de PostgreSQL. Esto significa que si intento usar un campo que no existe, el código ni siquiera se compilará. Menos errores en producción, más velocidad al programar.

## 4. Gestión de Errores Profesional
Implementé una clase AppError personalizada y un middleware global.
*   **¿La razón?** No me gusta que los servidores "exploten" o devuelvan errores crípticos. Con este enfoque, el API siempre responde de forma estandarizada y el Frontend puede mostrar mensajes amigables al usuario (y traducirlos) de manera coherente.

## 5. Docker: "En mi máquina sí funciona"
Configuré un docker-compose.yml que no solo levanta los servicios, sino que espera a que la base de datos esté lista antes de arrancar los demás.
*   **¿La razón?** Quería eliminar cualquier fricción para el evaluador. El objetivo es que la persona que revise esto solo tenga que escribir un comando y todo funcione exactamente igual que en mi entorno local.

---

Este proyecto es una muestra de cómo me gusta trabajar: prestando atención a los detalles, priorizando la legibilidad del código y pensando siempre en el usuario final.
