import { useState } from 'react';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import type { Project } from '../../molecules/ProjectCard/ProjectCard';
import './ProjectGrid.css';

interface ProjectGridProps {
  /** Lista de proyectos. */
  projects: Project[];
  /** Oculta los filtros de tags. */
  hideTags?: boolean;
  /** Clase adicional. */
  className?: string;
}

export function ProjectGrid({ projects, hideTags = false, className }: ProjectGridProps) {
  const [activeTags, setActiveTags] = useState<Set<string>>(
    () => new Set(projects.map((p) => p.tagVariant ?? 'default')),
  );

  const uniqueTags = projects.reduce<Array<{ variant: string; label: string }>>(
    (acc, project) => {
      const variant = project.tagVariant ?? 'default';
      if (!acc.some((tag) => tag.variant === variant)) {
        acc.push({ variant, label: project.category });
      }
      return acc;
    },
    [],
  );

  const allVariants = projects.map((p) => p.tagVariant ?? 'default');

  const toggleTag = (variant: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(variant) ? next.delete(variant) : next.add(variant);
      return next.size === 0 ? new Set(allVariants) : next;
    });
  };

  const filtered = projects.filter((p) => activeTags.has(p.tagVariant ?? 'default'));

  /* Celdas vacías para alinear el grid en distintos breakpoints */
  const mdEmpty = (2 - (filtered.length % 2)) % 2;
  const xlEmpty =
    filtered.length >= 7
      ? (6 - ((filtered.length - 7) % 6)) % 6
      : 7 - filtered.length;
  const totalEmpty = Math.max(mdEmpty, xlEmpty);
  const commonEmpty = Math.min(mdEmpty, xlEmpty);

  return (
    <div className={['project-grid-wrapper', className].filter(Boolean).join(' ')}>
      {!hideTags && (
        <div className="project-grid__filter">
          {uniqueTags.map(({ variant, label }) => (
            <button
              key={variant}
              className={[
                'tag',
                `tag--${variant}`,
                activeTags.has(variant) ? 'project-grid__tag--active' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => toggleTag(variant)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className="project-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {Array.from({ length: totalEmpty }).map((_, i) => {
          const isXlOnly = i >= commonEmpty && xlEmpty > mdEmpty;
          const isMdOnly = i >= commonEmpty && mdEmpty > xlEmpty;
          return (
            <div
              key={`empty-${i}`}
              className={[
                'project-grid__empty',
                isXlOnly && 'project-grid__empty--xl-only',
                isMdOnly && 'project-grid__empty--md-only',
              ].filter(Boolean).join(' ')}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
}
