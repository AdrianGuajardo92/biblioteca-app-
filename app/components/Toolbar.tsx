'use client';

interface ToolbarProps {
  // Filtros
  filtroGenero: string;
  filtroIdioma: string;
  filtroAno: string;
  onGeneroChange: (genero: string) => void;
  onIdiomaChange: (idioma: string) => void;
  onAnoChange: (ano: string) => void;

  // Opciones disponibles
  generosDisponibles: string[];
  idiomasDisponibles: string[];
  anosDisponibles: string[];

  // Vista
  vistaActual: 'tabla' | 'tarjetas';
  onVistaChange: (vista: 'tabla' | 'tarjetas') => void;

  // Resultados
  librosFiltrados: number;
  totalLibros: number;

  // Acciones
  onCopiarTabla: () => void;
  onCopiarEnFila: () => void;
  onLimpiarBiblioteca: () => void;

  // Estado de búsqueda
  searchQuery: string;
  onLimpiarFiltros: () => void;
}

export default function Toolbar({
  filtroGenero,
  filtroIdioma,
  filtroAno,
  onGeneroChange,
  onIdiomaChange,
  onAnoChange,
  generosDisponibles,
  idiomasDisponibles,
  anosDisponibles,
  vistaActual,
  onVistaChange,
  librosFiltrados,
  totalLibros,
  onCopiarTabla,
  onCopiarEnFila,
  onLimpiarBiblioteca,
  searchQuery,
  onLimpiarFiltros
}: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-section toolbar-filters">
        <div className="filter-group">
          <label className="filter-label">Género</label>
          <select
            className="filter-select"
            value={filtroGenero}
            onChange={(e) => onGeneroChange(e.target.value)}
          >
            <option value="">Todos los géneros</option>
            {generosDisponibles.map(genero => (
              <option key={genero} value={genero}>{genero}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Idioma</label>
          <select
            className="filter-select"
            value={filtroIdioma}
            onChange={(e) => onIdiomaChange(e.target.value)}
          >
            <option value="">Todos los idiomas</option>
            {idiomasDisponibles.map(idioma => (
              <option key={idioma} value={idioma}>{idioma}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Año</label>
          <select
            className="filter-select"
            value={filtroAno}
            onChange={(e) => onAnoChange(e.target.value)}
          >
            <option value="">Todos los años</option>
            {anosDisponibles.map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>

        {(filtroGenero || filtroIdioma || filtroAno || searchQuery) && (
          <button
            className="btn-secondary btn-sm"
            onClick={onLimpiarFiltros}
          >
            ✕ Limpiar filtros
          </button>
        )}

        <div className="results-count">
          {librosFiltrados} de {totalLibros} libros
        </div>
      </div>

      <div className="toolbar-section toolbar-actions">
        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${vistaActual === 'tabla' ? 'active' : ''}`}
            onClick={() => onVistaChange('tabla')}
            title="Vista de tabla"
          >
            ☰
          </button>
          <button
            className={`view-toggle-btn ${vistaActual === 'tarjetas' ? 'active' : ''}`}
            onClick={() => onVistaChange('tarjetas')}
            title="Vista de tarjetas"
          >
            ⊞
          </button>
        </div>

        <button onClick={onCopiarTabla} className="btn-success btn-sm">
          📋 Copiar
        </button>
        <button onClick={onCopiarEnFila} className="btn-success btn-sm">
          📊 Excel
        </button>
        <button onClick={onLimpiarBiblioteca} className="btn-danger btn-sm">
          🗑️ Limpiar
        </button>
      </div>
    </div>
  );
}
