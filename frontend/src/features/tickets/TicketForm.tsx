import { useState, useEffect } from 'react';
import { ticketService } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export default function TicketForm({ ticket, agents, onClose, onSave, onError }: any) {
  const { t } = useTranslation();
  const isEditing = !!ticket;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientName: '',
    priority: 'MEDIUM',
    status: 'OPEN',
    agentId: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        clientName: ticket.clientName,
        priority: ticket.priority,
        status: ticket.status,
        agentId: ticket.agentId || ''
      });
    }
  }, [ticket, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.clientName) {
      onError(t('Por favor completa todos los campos requeridos'));
      return;
    }
    
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        agentId: formData.agentId === '' ? null : formData.agentId
      };
      
      if (isEditing) {
        await ticketService.updateTicket(ticket.id, payload);
      } else {
        await ticketService.createTicket(payload);
      }
      onSave();
    } catch (err: any) {
      onError(err.response?.data?.message ? t(err.response.data.message) : t('No se pudo guardar el ticket'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isEditing ? t('Editar Ticket') : t('Nuevo Ticket')}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t('Título *')}</label>
            <input 
              name="title"
              className="form-input" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder={t("ej., No puedo iniciar sesión en el panel")}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">{t('Nombre del Cliente *')}</label>
            <input 
              name="clientName"
              className="form-input" 
              value={formData.clientName} 
              onChange={handleChange} 
              placeholder={t("Nombre de la empresa o usuario")}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">{t('Descripción *')}</label>
            <textarea 
              name="description"
              className="form-textarea" 
              rows={4}
              value={formData.description} 
              onChange={handleChange} 
              placeholder={t("Explicación detallada de la incidencia")}
              required 
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">{t('Prioridad')}</label>
              <select name="priority" className="form-select" value={formData.priority} onChange={handleChange}>
                <option value="CRITICAL">{t('Crítico')}</option>
                <option value="HIGH">{t('Alto')}</option>
                <option value="MEDIUM">{t('Medio')}</option>
                <option value="LOW">{t('Bajo')}</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Asignar a')}</label>
              <select name="agentId" className="form-select" value={formData.agentId} onChange={handleChange}>
                <option value="">{t('Sin asignar')}</option>
                {agents.map((agent: any) => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
            </div>
          </div>

          {isEditing && (
            <div className="form-group">
              <label className="form-label">{t('Estado')}</label>
              <select 
                name="status" 
                className="form-select" 
                value={formData.status} 
                onChange={handleChange}
                disabled={ticket.status === 'RESOLVED'} // Rule: Cannot modify if resolved
              >
                <option value="OPEN">{t('Abierto')}</option>
                <option value="IN_PROGRESS">{t('En Progreso')}</option>
                <option value="RESOLVED">{t('Resuelto')}</option>
              </select>
              {ticket.status === 'RESOLVED' && (
                <small style={{ color: 'var(--text-secondary)' }}>{t('Los tickets resueltos no pueden cambiar de estado aquí.')}</small>
              )}
            </div>
          )}
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn" style={{ background: 'transparent', border: '1px solid var(--border-color)' }} onClick={onClose}>
              {t('Cancelar')}
            </button>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? t('Guardando...') : t('Guardar Ticket')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
