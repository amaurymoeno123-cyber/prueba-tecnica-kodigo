import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ticketService, agentService } from './services/api';
import { PlusCircle, Ticket as TicketIcon } from 'lucide-react';
import TicketDashboard from './features/tickets/TicketDashboard';
import TicketList from './features/tickets/TicketList';
import TicketForm from './features/tickets/TicketForm';

export default function App() {
  const { t, i18n } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const [counters, setCounters] = useState({ OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0 });
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string, type: 'error' | 'success' } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ticketsRes, countersRes, agentsRes] = await Promise.all([
        ticketService.getAllTickets(),
        ticketService.getDashboardCounters(),
        agentService.getAllAgents()
      ]);
      setTickets(ticketsRes.data);
      setCounters(countersRes.data);
      setAgents(agentsRes.data);
    } catch (error: any) {
      showToast(error.response?.data?.message ? t(error.response.data.message) : t('Error al sincronizar datos'), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const openForm = (ticket = null) => {
    setEditingTicket(ticket);
    setIsFormOpen(true);
  };

  const closeForm = (shouldRefresh = false) => {
    setIsFormOpen(false);
    setEditingTicket(null);
    if (shouldRefresh) fetchData();
  };

  return (
    <div className="app-container">
      {toast && (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100 }} className="error-toast">
          {toast.message}
        </div>
      )}
      
      <header className="header">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/logo.png" alt="Kódigo Fuente" style={{ height: '48px', objectFit: 'contain', background: 'white', padding: '4px', borderRadius: '8px' }} />
          {t('Incidencias KODIGO')}
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ background: 'var(--card-bg)', borderRadius: '20px', display: 'flex', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => i18n.changeLanguage('es')}
              style={{ background: i18n.language === 'es' ? 'var(--accent-color)' : 'transparent', color: i18n.language === 'es' ? 'white' : 'var(--text-secondary)', border: 'none', padding: '0.25rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
            >
              ES
            </button>
            <button 
              onClick={() => i18n.changeLanguage('en')}
              style={{ background: i18n.language === 'en' ? 'var(--accent-color)' : 'transparent', color: i18n.language === 'en' ? 'white' : 'var(--text-secondary)', border: 'none', padding: '0.25rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
            >
              EN
            </button>
          </div>
          <button className="btn" onClick={() => openForm()}>
            <PlusCircle size={20} /> {t('Nuevo Ticket')}
          </button>
        </div>
      </header>
      
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <main>
          <TicketDashboard counters={counters} />
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <TicketIcon size={24} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{t('Tickets Activos')}</h2>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder={t('Buscar ticket por título o cliente...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: '400px' }}
            />
          </div>

          <TicketList 
            tickets={tickets.filter((t: any) => 
              t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              t.clientName.toLowerCase().includes(searchTerm.toLowerCase())
            )} 
            onEdit={openForm} 
            onRefresh={fetchData}
            onError={(msg: string) => showToast(msg, 'error')}
          />
        </main>
      )}

      {isFormOpen && (
        <TicketForm 
          ticket={editingTicket} 
          agents={agents} 
          onClose={() => closeForm()} 
          onSave={() => closeForm(true)}
          onError={(msg: string) => showToast(msg, 'error')}
        />
      )}
    </div>
  );
}
