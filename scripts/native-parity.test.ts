import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
// @ts-expect-error — módulo .mjs sin tipos
import { checkCards } from './native-parity.mjs';

const tmp = mkdtempSync(join(tmpdir(), 'native-parity-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

mkdirSync(join(tmp, 'src'));
writeFileSync(
  join(tmp, 'src/Demo.tsx'),
  `export interface DemoProps {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'lg';
  disabled?: boolean;
  label?: string;
}
`,
);

function cardsDir(name: string, card: unknown) {
  const dir = join(tmp, name);
  mkdirSync(dir);
  writeFileSync(join(dir, 'Demo.json'), JSON.stringify(card));
  return dir;
}

const base = {
  component: 'Demo',
  react: { path: 'src/Demo.tsx', props: 'DemoProps' },
  native: { swift: 'BrandDemo', kotlin: 'BrandDemo' },
  props: {
    variant: { type: 'union', values: ['primary', 'outline'] },
    size: { type: 'union', values: ['sm', 'lg'] },
    disabled: { type: 'boolean' },
  },
  excluded: [{ prop: 'label', reason: 'El texto va como contenido.' }],
};

describe('native:parity', () => {
  it('con cero fichas pasa', () => {
    expect(checkCards(join(tmp, 'no-existe'), tmp)).toEqual({ checked: 0, problems: [] });
  });

  it('una ficha que coincide con React pasa', () => {
    expect(checkCards(cardsDir('ok', base), tmp)).toEqual({ checked: 1, problems: [] });
  });

  it('detecta un valor de más y uno de menos', () => {
    const card = { ...base, props: { ...base.props, variant: { type: 'union', values: ['primary', 'ghost'] } } };
    const { problems } = checkCards(cardsDir('values', card), tmp);
    expect(problems.join('\n')).toContain('faltan valores de React: outline');
    expect(problems.join('\n')).toContain('valores que React no tiene: ghost');
  });

  it('detecta una prop propia sin portar ni excluir', () => {
    const { problems } = checkCards(cardsDir('own', { ...base, excluded: [] }), tmp);
    expect(problems.join('\n')).toContain('label: prop propia de DemoProps');
  });

  it('detecta una prop inexistente y un tipo que no coincide', () => {
    const card = { ...base, props: { ...base.props, ghost: { type: 'boolean' }, size: { type: 'boolean' } } };
    const { problems } = checkCards(cardsDir('types', card), tmp);
    expect(problems.join('\n')).toContain('props.ghost: no existe');
    expect(problems.join('\n')).toContain('props.size: la ficha dice boolean');
  });

  it('rechaza una ficha que no cumple el esquema', () => {
    const { problems } = checkCards(cardsDir('schema', { component: 'Demo' }), tmp);
    expect(problems[0]).toContain('esquema');
  });
});
