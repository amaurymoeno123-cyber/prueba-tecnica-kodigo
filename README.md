# Sistema de Gestión de Incidencias - Kódigo Fuente

¡Hola! Esta es mi propuesta para el Módulo de Gestión de Incidencias. He construido esta aplicación pensando no solo en cumplir los requisitos técnicos, sino en entregar una herramienta que sea realmente útil, escalable y con una experiencia de usuario fluida.

---

## Mi Stack Tecnológico

Para este proyecto elegí herramientas modernas que garantizan velocidad de desarrollo y robustez:

*   **Frontend**: React (Vite) + TypeScript. Decidí usar CSS Vanilla para demostrar mi dominio de las bases de diseño web sin depender de frameworks de utilidades.
*   **Backend**: Node.js con Express, estructurado en capas para mantener el código limpio.
*   **Base de Datos**: PostgreSQL, gestionado con Prisma ORM por su excelente tipado y facilidad de migraciones.
*   **Infraestructura**: Todo el proyecto está orquestado con Docker Compose para que puedas levantarlo con un solo comando.
*   **Automatización**: Configuré GitHub Actions para que se encargue del Linting, las pruebas y el empaquetado automático de imágenes.

---

## Lo que hace especial a esta App (Plus)

Además de lo solicitado, me tomé la libertad de añadir algunas funcionalidades extras que considero vitales en una herramienta real:

1.  **Internacionalización (i18n)**: La interfaz puede cambiar entre Español e Inglés al instante.
2.  **Buscador Inteligente**: Implementé un filtro en tiempo real para localizar tickets por título o cliente rápidamente.
3.  **Identidad Visual**: Integré el logo oficial y un diseño basado en Glassmorphism que le da un toque premium y moderno.
4.  **Dashboard de Métricas**: Un vistazo rápido al estado actual de todas las incidencias.

---

## Inicio Rápido (Con Docker)

Si tienes Docker instalado, esto será muy rápido:

1.  Clona el repositorio.
2.  Ejecuta el siguiente comando en la raíz:
    ```bash
    docker-compose up --build -d
    ```
3.  **¡Listo!** Abre tu navegador en:
    *   **Frontend**: http://localhost:5173
    *   **API**: http://localhost:3000/api

---

## Desarrollo Local (Sin Docker)

Si prefieres correrlo manualmente:

### Backend
1.  Entra a `cd backend` e instala con `npm install`.
2.  Configura tu `.env` (usa el `.env.example` como base).
3.  Sincroniza la DB y los datos iniciales: `npx prisma db push && npx prisma db seed`.
4.  Arranca con `npm run dev`.

### Frontend
1.  Entra a `cd frontend` e instala con `npm install`.
2.  Corre el servidor de desarrollo: `npm run dev`.

---

## Pruebas y Calidad
Puedes ejecutar las pruebas unitarias del backend entrando a la carpeta `backend` y corriendo:
```bash
npm run test
```

¡Espero que disfruten revisando este proyecto tanto como yo disfruté construyéndolo!
