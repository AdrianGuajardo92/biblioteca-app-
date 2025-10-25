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

interface BookTableProps {
  libros: Libro[];
  librosFiltrados: Libro[];
}

export default function BookTable({ libros, librosFiltrados }: BookTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Sinopsis</th>
            <th>Título del libro</th>
            <th>Autor</th>
            <th>Idioma</th>
            <th>Editorial del libro</th>
            <th>Tapa del libro</th>
            <th>Año de publicación</th>
            <th>Cantidad de páginas</th>
            <th>Género del libro</th>
            <th>ISBN</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {librosFiltrados.length === 0 ? (
            <tr>
              <td colSpan={12} className="empty-state">
                <div className="empty-state-icon">📖</div>
                <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>
                  {libros.length === 0 ? 'No hay libros en la biblioteca' : 'No se encontraron libros con estos filtros'}
                </p>
                <p>
                  {libros.length === 0 ? 'Los libros que busques se añadirán automáticamente aquí' : 'Intenta ajustar los filtros de búsqueda'}
                </p>
              </td>
            </tr>
          ) : (
            librosFiltrados.map((libro, i) => (
              <tr key={i} className="table-row-hover">
                <td><strong>{libro.titulo || ''}</strong></td>
                <td><div className="sinopsis">{libro.sinopsis || ''}</div></td>
                <td>{libro.tituloCompleto || ''}</td>
                <td><span className="autor-name">{libro.autor || ''}</span></td>
                <td><span className="badge-lang">{libro.idioma || ''}</span></td>
                <td>{libro.editorial || ''}</td>
                <td><span className="badge-cover">{libro.tapa || ''}</span></td>
                <td>{libro.año || ''}</td>
                <td>{libro.paginas || ''}</td>
                <td><span className="badge-genre">{libro.genero || ''}</span></td>
                <td><code className="isbn-code">{libro.isbn || ''}</code></td>
                <td><strong className="precio">{libro.precio || ''}</strong></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
