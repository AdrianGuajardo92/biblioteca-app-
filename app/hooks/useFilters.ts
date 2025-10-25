import { useState } from 'react';

/**
 * Hook para manejar los estados de búsqueda y filtros
 */
export function useFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroIdioma, setFiltroIdioma] = useState('');
  const [filtroAno, setFiltroAno] = useState('');

  const limpiarFiltros = () => {
    setSearchQuery('');
    setFiltroGenero('');
    setFiltroIdioma('');
    setFiltroAno('');
  };

  return {
    searchQuery,
    setSearchQuery,
    filtroGenero,
    setFiltroGenero,
    filtroIdioma,
    setFiltroIdioma,
    filtroAno,
    setFiltroAno,
    limpiarFiltros
  };
}
