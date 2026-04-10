import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Incidencias KODIGO": "KODIGO Issues",
      "Nuevo Ticket": "New Ticket",
      "Tickets Activos": "Active Tickets",
      "Abierto": "Open",
      "En Progreso": "In Progress",
      "Resuelto": "Resolved",
      "Error al sincronizar datos": "Failed to sync data",
      "¿Estás seguro de que quieres eliminar este ticket?": "Are you sure you want to delete this ticket?",
      "No se pudo eliminar el ticket": "Could not delete ticket",
      "No se encontraron tickets. ¡Crea tu primera incidencia!": "No tickets found. Create your first issue!",
      "ABIERTO": "OPEN",
      "EN PROGRESO": "IN PROGRESS",
      "RESUELTO": "RESOLVED",
      "Editar Ticket": "Edit Ticket",
      "Eliminar Ticket": "Delete Ticket",
      "Cliente:": "Client:",
      "CRÍTICO": "CRITICAL",
      "ALTO": "HIGH",
      "MEDIO": "MEDIUM",
      "BAJO": "LOW",
      "Agente:": "Agent:",
      "Sin asignar": "Unassigned",
      "Por favor completa todos los campos requeridos": "Please fill in all required fields",
      "No se pudo guardar el ticket": "Failed to save ticket",
      "Buscar ticket por título o cliente...": "Search ticket by title or client...",
      "Título *": "Title *",
      "ej., No puedo iniciar sesión en el panel": "e.g., Cannot login to dashboard",
      "Nombre del Cliente *": "Client Name *",
      "Nombre de la empresa o usuario": "Company or User name",
      "Descripción *": "Description *",
      "Explicación detallada de la incidencia": "Detailed explanation of the issue",
      "Prioridad": "Priority",
      "Crítico": "Critical",
      "Alto": "High",
      "Medio": "Medium",
      "Bajo": "Low",
      "Asignar a": "Assign to",
      "Estado": "Status",
      "Los tickets resueltos no pueden cambiar de estado aquí.": "Resolved tickets cannot change status here.",
      "Cancelar": "Cancel",
      "Guardando...": "Saving...",
      "Guardar Ticket": "Save Ticket",
      "Ticket no encontrado": "Ticket not found",
      "Error de validación: Faltan campos requeridos": "Validation Error: Missing required fields",
      "No se puede modificar un ticket resuelto": "Cannot modify a resolved ticket",
      "No se puede eliminar un ticket que no esté ABIERTO": "Cannot delete a ticket that is not OPEN"
    }
  },
  es: {
    translation: {
      // Spanish is the default language keys, no mapping needed unless we want aliases
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // default language
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
