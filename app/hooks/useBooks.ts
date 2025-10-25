import { useState, useEffect } from 'react';

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

interface BooksData {
  libros: Libro[];
  isbnsNoEncontrados: string[];
  enlacesPendientes: string[];
  titulosGrabados: string[];
}

/**
 * Hook para manejar la carga y gestión de libros desde la API
 */
export function useBooks() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [isbnsNoEncontrados, setIsbnsNoEncontrados] = useState<string[]>([]);
  const [enlacesPendientes, setEnlacesPendientes] = useState<string[]>([]);
  const [titulosGrabados, setTitulosGrabados] = useState<string[]>([]);

  // Cargar datos al montar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const response = await fetch('/api/libros');
      const data = await response.json();
      setLibros(data.libros || []);
      setIsbnsNoEncontrados(data.isbnsNoEncontrados || []);
      setEnlacesPendientes(data.enlacesPendientes || []);
      setTitulosGrabados(data.titulosGrabados || []);
    } catch (error) {
      console.error('Error cargando datos:', error);
      throw error;
    }
  };

  const guardarLibros = async (nuevosLibros: Libro[]) => {
    try {
      await fetch('/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ libros: nuevosLibros }),
      });
    } catch (error) {
      console.error('Error guardando libros:', error);
      throw error;
    }
  };

  return {
    libros,
    setLibros,
    isbnsNoEncontrados,
    setIsbnsNoEncontrados,
    enlacesPendientes,
    setEnlacesPendientes,
    titulosGrabados,
    setTitulosGrabados,
    cargarDatos,
    guardarLibros
  };
}
