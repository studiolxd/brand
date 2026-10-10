import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { DEFAULTS, checkGuards, configFromEnv, formatCommand, planDeploy } from './deploy-storybook.mjs';

const sano = {
  porcelain: '',
  version: '52.1.0',
  tagsAtHead: ['v52.1.0'],
  contexts: ['default', 'vps-slxd'],
};

describe('checkGuards', () => {
  it('deja pasar un árbol limpio, con tag y con contexto', () => {
    expect(checkGuards(sano, DEFAULTS)).toEqual([]);
  });

  it('rechaza un árbol sucio', () => {
    const p = checkGuards({ ...sano, porcelain: ' M package.json\n' }, DEFAULTS);
    expect(p).toHaveLength(1);
    expect(p[0]).toMatch(/no está limpio/);
  });

  it('rechaza un HEAD sin el tag de la versión de package.json', () => {
    expect(checkGuards({ ...sano, tagsAtHead: [] }, DEFAULTS)[0]).toMatch(/v52\.1\.0/);
    expect(checkGuards({ ...sano, tagsAtHead: ['v52.0.0'] }, DEFAULTS)).toHaveLength(1);
  });

  it('rechaza un contexto de Docker inexistente', () => {
    expect(checkGuards({ ...sano, contexts: ['default'] }, DEFAULTS)[0]).toMatch(/vps-slxd/);
  });

  it('acumula todos los problemas', () => {
    expect(checkGuards({ porcelain: 'x', version: '1.0.0', tagsAtHead: [], contexts: [] }, DEFAULTS)).toHaveLength(3);
  });
});

describe('planDeploy', () => {
  const pasos = planDeploy({ version: '52.1.0', sha: 'abc123' }, DEFAULTS);
  const lineas = pasos.map(formatCommand);

  it('son los cuatro pasos, en orden', () => {
    expect(lineas).toEqual([
      "docker --context vps-slxd build -t ghcr.io/studiolxd/studiolxd-brand:latest -t ghcr.io/studiolxd/studiolxd-brand:v52.1.0 --label org.opencontainers.image.version=52.1.0 --label org.opencontainers.image.revision=abc123 .",
      'docker --context vps-slxd push ghcr.io/studiolxd/studiolxd-brand:v52.1.0',
      'docker --context vps-slxd push ghcr.io/studiolxd/studiolxd-brand:latest',
      "ssh root@159.195.24.208 'cd /root/studiolxd_brand && docker compose up -d --no-deps --pull never brand'",
    ]);
  });

  it('respeta la configuración sobrescrita por entorno', () => {
    const c = configFromEnv({ STORYBOOK_DEPLOY_CONTEXT: 'otro' });
    expect(planDeploy({ version: '1.0.0', sha: 'x' }, c)[0].args.slice(0, 2)).toEqual(['--context', 'otro']);
  });
});

describe('deploy-storybook --dry-run', () => {
  it('no ejecuta nada y termina bien aunque las guardas fallen', () => {
    const out = execFileSync('node', ['scripts/deploy-storybook.mjs', '--dry-run'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    expect(out).toMatch(/--dry-run: no se ha ejecutado nada/);
    expect(out).toMatch(/\$ docker --context vps-slxd build/);
  });
});
