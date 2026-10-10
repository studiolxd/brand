// Lógica pura del despliegue del Storybook (scripts/deploy-storybook.mjs): qué
// comandos se lanzan y qué guardas hay antes. Sin red ni `git`: todo entra por
// parámetros, así que se prueba con valores fijos.

/** Valores por defecto; cada uno se puede sobrescribir con su variable de entorno. */
export const DEFAULTS = {
  host: 'root@159.195.24.208', // VPS D
  context: 'vps-slxd', // contexto Docker: ssh://root@159.195.24.208 (amd64; el Mac es arm64)
  composeDir: '/root/studiolxd_brand',
  service: 'brand',
  image: 'ghcr.io/studiolxd/studiolxd-brand',
  url: 'https://brand.studiolxd.com',
};

export function configFromEnv(env = process.env) {
  return {
    host: env.STORYBOOK_DEPLOY_HOST ?? DEFAULTS.host,
    context: env.STORYBOOK_DEPLOY_CONTEXT ?? DEFAULTS.context,
    composeDir: env.STORYBOOK_DEPLOY_COMPOSE_DIR ?? DEFAULTS.composeDir,
    service: env.STORYBOOK_DEPLOY_SERVICE ?? DEFAULTS.service,
    image: env.STORYBOOK_DEPLOY_IMAGE ?? DEFAULTS.image,
    url: env.STORYBOOK_DEPLOY_URL ?? DEFAULTS.url,
  };
}

/**
 * Guardas previas a construir. Devuelve la lista de problemas (vacía = vía libre).
 * @param {{ porcelain: string, version: string, tagsAtHead: string[], contexts: string[] }} estado
 * @param {{ context: string }} config
 */
export function checkGuards({ porcelain, version, tagsAtHead, contexts }, config) {
  const problemas = [];
  if (porcelain.trim() !== '') {
    problemas.push('el árbol de trabajo no está limpio (git status --porcelain no está vacío)');
  }
  if (!tagsAtHead.includes(`v${version}`)) {
    problemas.push(
      `HEAD no tiene el tag v${version} (el de package.json): no se despliega un Storybook de algo sin publicar`,
    );
  }
  if (!contexts.includes(config.context)) {
    problemas.push(`no existe el contexto de Docker «${config.context}» (docker context ls)`);
  }
  return problemas;
}

/**
 * Los cuatro pasos como argv (sin shell, para no depender de comillas).
 * @returns {{ titulo: string, cmd: string, args: string[] }[]}
 */
export function planDeploy({ version, sha }, config) {
  const latest = `${config.image}:latest`;
  const tagged = `${config.image}:v${version}`;
  return [
    {
      titulo: 'construir en el VPS (amd64)',
      cmd: 'docker',
      args: [
        '--context', config.context, 'build',
        '-t', latest, '-t', tagged,
        '--label', `org.opencontainers.image.version=${version}`,
        '--label', `org.opencontainers.image.revision=${sha}`,
        '.',
      ],
    },
    { titulo: `subir ${tagged}`, cmd: 'docker', args: ['--context', config.context, 'push', tagged] },
    { titulo: `subir ${latest}`, cmd: 'docker', args: ['--context', config.context, 'push', latest] },
    {
      titulo: 'recrear el contenedor',
      cmd: 'ssh',
      args: [
        config.host,
        `cd ${config.composeDir} && docker compose up -d --no-deps --pull never ${config.service}`,
      ],
    },
  ];
}

/** Línea de comando legible para --dry-run (no se ejecuta). */
export function formatCommand({ cmd, args }) {
  return [cmd, ...args.map((a) => (/^[\w@%+=:,./-]+$/.test(a) ? a : `'${a}'`))].join(' ');
}
