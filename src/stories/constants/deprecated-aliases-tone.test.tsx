import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactElement } from 'react';
import { resetWarnings } from './env';
import { Tag } from '../atoms/Tag/Tag';
import { NumberBadge } from '../atoms/NumberBadge/NumberBadge';
import { ProgressBar } from '../atoms/ProgressBar/ProgressBar';
import { StepMarker } from '../atoms/StepMarker/StepMarker';
import { Paragraph } from '../atoms/Paragraph/Paragraph';
import { Logo } from '../atoms/Logo/Logo';
import { Alert } from '../molecules/Alert/Alert';
import { Banner } from '../molecules/Banner/Banner';
import { Card } from '../molecules/Card/Card';
import { ProjectCard } from '../molecules/ProjectCard/ProjectCard';

/**
 * Los alias obsoletos de la v51 (D6.1, D6.2, D6.6): el nombre viejo pinta
 * EXACTAMENTE lo mismo que el nuevo y avisa una vez en desarrollo. Se retiran
 * en la v52, y este fichero con ellos.
 */
let warn: MockInstance<typeof console.warn>;

beforeEach(() => {
  resetWarnings();
  warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  warn.mockRestore();
});

const html = (el: ReactElement) => renderToStaticMarkup(el);

/** El viejo pinta como el nuevo, el nuevo no avisa y el viejo avisa con su nombre. */
function expectAlias(nuevo: ReactElement, viejo: ReactElement, aviso: RegExp) {
  expect(html(viejo)).toBe(html(nuevo));
  const avisos = warn.mock.calls.map((c) => String(c[0])).filter((m) => m.includes('obsoleta'));
  expect(avisos.some((m) => aviso.test(m) && /v52/.test(m))).toBe(true);
}

describe('alias obsoletos de la v51', () => {
  it('el nombre nuevo no avisa', () => {
    html(<Tag tone="error">x</Tag>);
    html(<Paragraph size="sm">x</Paragraph>);
    html(<Logo size="2xl" />);
    html(<Card tone="primary" variant="split" />);
    expect(warn.mock.calls.filter((c) => String(c[0]).includes('obsoleta'))).toHaveLength(0);
  });

  it('Tag: variant → tone, y danger → error', () => {
    expectAlias(<Tag tone="success">x</Tag>, <Tag variant="success">x</Tag>, /<Tag variant>/);
    expectAlias(<Tag tone="error">x</Tag>, <Tag variant="danger">x</Tag>, /<Tag variant="danger">.*tone="error"/);
  });

  it('NumberBadge: variant → tone, y danger → error', () => {
    expectAlias(<NumberBadge count={3} tone="error" />, <NumberBadge count={3} variant="danger" />, /<NumberBadge variant="danger">/);
  });

  it('StepMarker: tone="danger" → tone="error"', () => {
    expectAlias(<StepMarker tone="error" count={1} />, <StepMarker tone="danger" count={1} />, /<StepMarker tone="danger">/);
  });

  it('ProgressBar: variant → tone', () => {
    expectAlias(<ProgressBar value={40} tone="accent-2" />, <ProgressBar value={40} variant="accent-2" />, /<ProgressBar variant>/);
  });

  it('Alert y Banner: variant → tone', () => {
    expectAlias(<Alert tone="warning" title="t" />, <Alert variant="warning" title="t" />, /<Alert variant>/);
    expectAlias(<Banner tone="error">m</Banner>, <Banner variant="error">m</Banner>, /<Banner variant>/);
  });

  it('Card: color → tone (variant sigue siendo la maqueta)', () => {
    expectAlias(<Card tone="accent-1" variant="square" />, <Card color="accent-1" variant="square" />, /<Card color>/);
  });

  it('ProjectCard: tags[].variant → tags[].tone', () => {
    expectAlias(
      <ProjectCard title="P" tags={[{ label: 'a', tone: 'error' }]} />,
      <ProjectCard title="P" tags={[{ label: 'a', variant: 'danger' }]} />,
      /<ProjectCard tags\[\]\.variant>/,
    );
  });

  it('Paragraph: small/default/large → sm/md/lg', () => {
    expectAlias(<Paragraph size="sm">x</Paragraph>, <Paragraph size="small">x</Paragraph>, /<Paragraph size="small">.*size="sm"/);
    expectAlias(<Paragraph size="md">x</Paragraph>, <Paragraph size="default">x</Paragraph>, /<Paragraph size="default">/);
    expectAlias(<Paragraph size="lg">x</Paragraph>, <Paragraph size="large">x</Paragraph>, /<Paragraph size="large">/);
  });

  it('Logo: xxl → 2xl', () => {
    expectAlias(<Logo size="2xl" />, <Logo size="xxl" />, /<Logo size="xxl">.*size="2xl"/);
  });

  it('cada aviso sale una sola vez', () => {
    html(<Tag variant="info">a</Tag>);
    html(<Tag variant="info">b</Tag>);
    expect(warn.mock.calls.filter((c) => String(c[0]).includes('obsoleta'))).toHaveLength(1);
  });
});
