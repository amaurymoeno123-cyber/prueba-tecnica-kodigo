import { Edit2, Trash2 } from 'lucide-react';
import { ticketService } from '../../services/api';
import { useTranslation } from 'react-i18next';

export default function TicketList({ tickets, onEdit, onRefresh, onError }: any) {
  const { t } = useTranslation();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'var(--priority-critical)';
      case 'HIGH': return 'var(--priority-high)';
      case 'MEDIUM': return 'var(--priority-medium)';
      case 'LOW': return 'var(--priority-low)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'var(--status-open)';
      case 'IN_PROGRESS': return 'var(--status-in-progress)';
      case 'RESOLVED': return 'var(--status-resolved)';
      default: return 'var(--text-secondary)';
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(t('¿Estás seguro de que quieres eliminar este ticket?'))) return;
    
    try {
      await ticketService.deleteTicket(id);
      onRefresh();
    } catch (err: any) {
      onError(err.response?.data?.message ? t(err.response.data.message) : t('No se pudo eliminar el ticket'));
    }
  };

  const handleEdit = (ticket: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (ticket.status === 'RESOLVED') {
      onError(t('No se puede modificar un ticket resuelto'));
      return;
    }
    onEdit(ticket);
  };

  if (tickets.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
        {t('No se encontraron tickets. ¡Crea tu primera incidencia!')}
      </div>
    );
  }

  return (
    <div className="tickets-grid">
      {tickets.map((ticket: any) => (
        <div key={ticket.id} className="card" style={{ borderLeft: `4px solid ${getPriorityColor(ticket.priority)}` }}>
          <div className="ticket-header">
            <div className="badge" style={{ backgroundColor: `${getStatusColor(ticket.status)}20`, color: getStatusColor(ticket.status) }}>
              {t(ticket.status === 'OPEN' ? 'ABIERTO' : ticket.status === 'IN_PROGRESS' ? 'EN PROGRESO' : 'RESUELTO')}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={(e) => handleEdit(ticket, e)}
                style={{ background: 'none', border: 'none', cursor: ticket.status === 'RESOLVED' ? 'not-allowed' : 'pointer', color: ticket.status === 'RESOLVED' ? 'var(--text-secondary)' : 'var(--accent-color)' }}
                title={t("Editar Ticket")}
              >
                <Edit2 size={18} />
              </button>
              {ticket.status === 'OPEN' && (
                <button 
                  onClick={(e) => handleDelete(ticket.id, e)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--priority-critical)' }}
                  title={t("Eliminar Ticket")}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
          
          <h3 className="ticket-title">{ticket.title}</h3>
          <p className="ticket-desc">{ticket.description}</p>
          
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong>{t('Cliente:')}</strong> {ticket.clientName}
          </div>
          
          <div className="footer-info">
            <div>
              <span className="badge" style={{ border: `1px solid ${getPriorityColor(ticket.priority)}`, color: getPriorityColor(ticket.priority) }}>
                {t(ticket.priority === 'CRITICAL' ? 'CRÍTICO' : ticket.priority === 'HIGH' ? 'ALTO' : ticket.priority === 'MEDIUM' ? 'MEDIO' : 'BAJO')}
              </span>
            </div>
            <div>
              {t('Agente:')} {ticket.agent ? ticket.agent.name : t('Sin asignar')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
