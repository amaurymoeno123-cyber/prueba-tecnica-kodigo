import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { agentService } from '../../services/api';
import { X, Trash2, UserPlus } from 'lucide-react';

export default function AgentManager({ agents, onClose, onRefresh, onError }: any) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      onError(t('Error de validación: Nombre y email son requeridos'));
      return;
    }

    setIsSubmitting(true);
    try {
      await agentService.createAgent(formData);
      setFormData({ name: '', email: '' });
      onRefresh();
    } catch (err: any) {
      onError(err.response?.data?.message ? t(err.response.data.message) : t('No se pudo guardar el agente'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('¿Estás seguro de que quieres eliminar este agente?'))) return;
    try {
      await agentService.deleteAgent(id);
      onRefresh();
    } catch (err: any) {
      onError(err.response?.data?.message ? t(err.response.data.message) : t('No se pudo eliminar el agente'));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserPlus /> {t('Gestionar Agentes')}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', alignItems: 'end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">{t('Nombre del Agente')}</label>
              <input 
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Juan Perez"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">{t('Email del Agente')}</label>
              <input 
                className="form-input"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan@kodigo.com"
              />
            </div>
            <button type="submit" className="btn" disabled={isSubmitting} style={{ height: '42px' }}>
              {t('Agregar')}
            </button>
          </form>
        </div>

        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--card-bg)', position: 'sticky', top: 0 }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem' }}>{t('Nombre')}</th>
                <th style={{ textAlign: 'left', padding: '0.75rem' }}>{t('Email')}</th>
                <th style={{ textAlign: 'center', padding: '0.75rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {agents.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    {t('No hay agentes registrados')}
                  </td>
                </tr>
              ) : (
                agents.map((agent: any) => (
                  <tr key={agent.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem' }}>{agent.name}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.8125rem' }}>{agent.email}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDelete(agent.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--priority-critical)', cursor: 'pointer' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
