'use client';

import { useState } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  onHomeClick: () => void;
  onTitulosClick: () => void;
  onSearchClick: () => void;
  onImportClick: () => void;
  onPromptClick: () => void;
  onMercadolibreClick: () => void;
  titulosCount: number;
  searchCount: number;
  activePanel: 'home' | 'titulos' | 'search' | 'import' | null;
}

export default function Sidebar({
  onHomeClick,
  onTitulosClick,
  onSearchClick,
  onImportClick,
  onPromptClick,
  onMercadolibreClick,
  titulosCount,
  searchCount,
  activePanel,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarLogo}>
          <span className={styles.sidebarLogoIcon}>📚</span>
          {!isCollapsed && <span className={styles.sidebarLogoText}>Mi Librería</span>}
        </div>
        <button
          className={styles.sidebarCollapseBtn}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Divider */}
      <div className={styles.sidebarDivider}></div>

      {/* Navigation Section */}
      <div className={styles.sidebarSection}>
        {!isCollapsed && <div className={styles.sidebarSectionTitle}>NAVEGACIÓN</div>}

        <button
          className={`${styles.sidebarItem} ${activePanel === 'home' ? styles.active : ''}`}
          onClick={onHomeClick}
          title="Volver a Biblioteca Principal"
        >
          <span className={styles.sidebarItemIcon}>🏠</span>
          {!isCollapsed && <span className={styles.sidebarItemText}>Inicio</span>}
        </button>

        <button
          className={`${styles.sidebarItem} ${activePanel === 'titulos' ? styles.active : ''}`}
          onClick={onTitulosClick}
          title="Títulos Grabados"
        >
          <span className={styles.sidebarItemIcon}>📝</span>
          {!isCollapsed && <span className={styles.sidebarItemText}>Títulos Grabados</span>}
          {titulosCount > 0 && (
            <span className={styles.sidebarBadge}>{titulosCount}</span>
          )}
        </button>

        <button
          className={`${styles.sidebarItem} ${activePanel === 'search' ? styles.active : ''}`}
          onClick={onSearchClick}
          title="Lista de Búsqueda"
        >
          <span className={styles.sidebarItemIcon}>🔍</span>
          {!isCollapsed && <span className={styles.sidebarItemText}>Lista de Búsqueda</span>}
          {searchCount > 0 && (
            <span className={styles.sidebarBadge}>{searchCount}</span>
          )}
        </button>
      </div>

      {/* Actions Section */}
      <div className={styles.sidebarSection}>
        {!isCollapsed && <div className={styles.sidebarSectionTitle}>ACCIONES</div>}

        <button
          className={`${styles.sidebarItem} ${activePanel === 'import' ? styles.active : ''}`}
          onClick={onImportClick}
          title="Importar Libros desde JSON"
        >
          <span className={styles.sidebarItemIcon}>📥</span>
          {!isCollapsed && <span className={styles.sidebarItemText}>Importar JSON</span>}
        </button>

        <button
          className={styles.sidebarItem}
          onClick={onPromptClick}
          title="Copiar Prompt de Búsqueda"
        >
          <span className={styles.sidebarItemIcon}>📋</span>
          {!isCollapsed && <span className={styles.sidebarItemText}>Copiar Prompt</span>}
        </button>
      </div>

      {/* Tools Section */}
      <div className={styles.sidebarSection}>
        {!isCollapsed && <div className={styles.sidebarSectionTitle}>HERRAMIENTAS</div>}

        <button
          className={styles.sidebarItem}
          onClick={onMercadolibreClick}
          title="Títulos para Mercadolibre"
        >
          <span className={styles.sidebarItemIcon}>🏷️</span>
          {!isCollapsed && <span className={styles.sidebarItemText}>Mercadolibre</span>}
        </button>
      </div>
    </div>
  );
}
