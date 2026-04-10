import { useTranslation } from 'react-i18next';

export default function TicketDashboard({ counters }: { counters: any }) {
  const { t } = useTranslation();
  const stats = [
    { label: t('Abierto'), value: counters.OPEN || 0, color: 'var(--status-open)' },
    { label: t('En Progreso'), value: counters.IN_PROGRESS || 0, color: 'var(--status-in-progress)' },
    { label: t('Resuelto'), value: counters.RESOLVED || 0, color: 'var(--status-resolved)' },
  ];

  return (
    <div className="dashboard-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="card stat-card" style={{ borderTop: `4px solid ${stat.color}` }}>
          <div style={{ color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', fontSize: '0.875rem' }}>
            {stat.label}
          </div>
          <div className="stat-value" style={{ color: stat.color }}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
