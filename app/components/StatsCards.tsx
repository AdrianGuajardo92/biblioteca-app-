'use client';

interface StatsCardsProps {
  totalLibros: number;
  totalAutores: number;
  totalGeneros: number;
  libroMasReciente: string | null;
}

export default function StatsCards({
  totalLibros,
  totalAutores,
  totalGeneros,
  libroMasReciente
}: StatsCardsProps) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📚</div>
        <div className="stat-info">
          <div className="stat-label">Total Libros</div>
          <div className="stat-value">{totalLibros}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✍️</div>
        <div className="stat-info">
          <div className="stat-label">Autores</div>
          <div className="stat-value">{totalAutores}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🎭</div>
        <div className="stat-info">
          <div className="stat-label">Géneros</div>
          <div className="stat-value">{totalGeneros}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🆕</div>
        <div className="stat-info">
          <div className="stat-label">Más Reciente</div>
          <div className="stat-value">{libroMasReciente || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}
