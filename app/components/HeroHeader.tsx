'use client';

interface HeroHeaderProps {
  totalLibros: number;
}

export default function HeroHeader({ totalLibros }: HeroHeaderProps) {
  return (
    <div className="hero-header">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-icon">📚</span>
            Biblioteca de Libros
          </h1>
          <p className="hero-subtitle">
            Gestiona tu colección personal de {totalLibros} {totalLibros === 1 ? 'libro' : 'libros'}
          </p>
        </div>
      </div>
    </div>
  );
}
