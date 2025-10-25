'use client';

interface Libro {
  titulo: string;
  sinopsis: string;
  tituloCompleto: string;
  autor: string;
  idioma: string;
  editorial: string;
  tapa: string;
  año: string;
  paginas: string;
  genero: string;
  isbn: string;
  precio: string;
}

interface BookCardProps {
  libro: Libro;
}

export default function BookCard({ libro }: BookCardProps) {
  return (
    <div className="book-card">
      <div className="book-card-header">
        <div className="book-icon">📖</div>
        <div className="book-card-title">
          <h3>{libro.titulo || libro.tituloCompleto || 'Sin título'}</h3>
          <p className="book-author">{libro.autor || 'Autor desconocido'}</p>
        </div>
      </div>

      <div className="book-card-body">
        {libro.sinopsis && (
          <p className="book-sinopsis">
            {libro.sinopsis.substring(0, 150)}
            {libro.sinopsis.length > 150 ? '...' : ''}
          </p>
        )}

        <div className="book-details">
          <div className="book-detail-row">
            <span className="detail-label">Editorial:</span>
            <span className="detail-value">{libro.editorial || '—'}</span>
          </div>
          <div className="book-detail-row">
            <span className="detail-label">Año:</span>
            <span className="detail-value">{libro.año || '—'}</span>
          </div>
          <div className="book-detail-row">
            <span className="detail-label">Páginas:</span>
            <span className="detail-value">{libro.paginas || '—'}</span>
          </div>
          <div className="book-detail-row">
            <span className="detail-label">ISBN:</span>
            <code className="detail-value isbn-code">{libro.isbn || '—'}</code>
          </div>
        </div>
      </div>

      <div className="book-card-footer">
        <div className="book-badges">
          {libro.idioma && <span className="badge-lang">{libro.idioma}</span>}
          {libro.tapa && <span className="badge-cover">{libro.tapa}</span>}
          {libro.genero && <span className="badge-genre">{libro.genero}</span>}
        </div>
        {libro.precio && <div className="book-precio">{libro.precio}</div>}
      </div>
    </div>
  );
}
