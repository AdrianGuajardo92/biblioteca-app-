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

export interface BookStats {
  totalLibros: number;
  totalAutores: number;
  totalGeneros: number;
  libroMasReciente: Libro | null;
  librosFiltrados: number;
}

/**
 * Calcula las estadísticas de una colección de libros
 */
export function calculateBookStats(libros: Libro[], librosFiltradosCount: number): BookStats {
  return {
    totalLibros: libros.length,
    totalAutores: new Set(libros.map(l => l.autor).filter(Boolean)).size,
    totalGeneros: new Set(libros.map(l => l.genero).filter(Boolean)).size,
    libroMasReciente: libros.length > 0
      ? libros.reduce((max, libro) =>
          (libro.año && parseInt(libro.año) > parseInt(max.año || '0')) ? libro : max
        , libros[0])
      : null,
    librosFiltrados: librosFiltradosCount
  };
}

/**
 * Obtiene valores únicos de un campo de los libros y los ordena
 */
export function getUniqueValues(libros: Libro[], field: keyof Libro, reverse = false): string[] {
  const values = Array.from(new Set(libros.map(l => l[field]).filter(Boolean) as string[])).sort();
  return reverse ? values.reverse() : values;
}

/**
 * Obtiene los géneros únicos de los libros
 */
export function getUniqueGenres(libros: Libro[]): string[] {
  return getUniqueValues(libros, 'genero');
}

/**
 * Obtiene los idiomas únicos de los libros
 */
export function getUniqueLanguages(libros: Libro[]): string[] {
  return getUniqueValues(libros, 'idioma');
}

/**
 * Obtiene los años únicos de los libros (ordenados del más reciente al más antiguo)
 */
export function getUniqueYears(libros: Libro[]): string[] {
  return getUniqueValues(libros, 'año', true);
}
