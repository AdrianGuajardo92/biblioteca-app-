'use client';

import BookCard from './BookCard';

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

interface BookCardsGridProps {
  libros: Libro[];
  librosFiltrados: Libro[];
}

export default function BookCardsGrid({ libros, librosFiltrados }: BookCardsGridProps) {
  return (
    <div className="cards-grid">
      {librosFiltrados.length === 0 ? (
        <div className="empty-state-cards">
          <div className="empty-state-icon">📖</div>
          <h3>{libros.length === 0 ? 'No hay libros en la biblioteca' : 'No se encontraron libros'}</h3>
          <p>{libros.length === 0 ? 'Comienza agregando libros desde la barra lateral' : 'Intenta ajustar los filtros de búsqueda'}</p>
        </div>
      ) : (
        librosFiltrados.map((libro, i) => (
          <BookCard key={i} libro={libro} />
        ))
      )}
    </div>
  );
}
