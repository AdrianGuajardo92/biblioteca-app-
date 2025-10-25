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

export interface FilterOptions {
  searchQuery: string;
  filtroGenero: string;
  filtroIdioma: string;
  filtroAno: string;
}

/**
 * Filtra libros según los criterios de búsqueda y filtros
 */
export function filterBooks(libros: Libro[], filters: FilterOptions): Libro[] {
  return libros.filter(libro => {
    const matchSearch = filters.searchQuery === '' ||
      libro.titulo?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      libro.autor?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      libro.isbn?.includes(filters.searchQuery) ||
      libro.tituloCompleto?.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchGenero = filters.filtroGenero === '' || libro.genero === filters.filtroGenero;
    const matchIdioma = filters.filtroIdioma === '' || libro.idioma === filters.filtroIdioma;
    const matchAno = filters.filtroAno === '' || libro.año === filters.filtroAno;

    return matchSearch && matchGenero && matchIdioma && matchAno;
  });
}
