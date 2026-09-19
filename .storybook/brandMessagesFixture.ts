import type { BrandMessages } from '../src/stories/messages/BrandMessages';

/**
 * Los textos del catálogo, en castellano, **para el Storybook y solo para él**.
 *
 * No es el default que se retiró de los componentes, y la diferencia no es de
 * matiz: un default viaja DENTRO del paquete publicado y se alcanza en
 * ejecución desde cualquier app que olvide un texto; este fichero vive fuera
 * de `src/`, no es punto de entrada de la librería, no lo importa ningún
 * componente y `package.json#files` solo publica `dist/`, `src/tokens/` y el
 * `CHANGELOG` — así que ningún código de un consumidor puede caer aquí.
 * Lo vigila `src/stories/messages/BrandMessages.test.ts`.
 *
 * El Storybook necesita un catálogo porque es la aplicación que monta los
 * componentes: sin proveedor, un paginador sin props revienta — que es
 * exactamente lo que queremos que le pase a una app que se deja un texto.
 */
export const brandMessagesFixture: BrandMessages = {
  pagination: {
    label: 'Paginación',
    pagesGroup: 'Páginas',
    previous: 'Página anterior',
    next: 'Página siguiente',
    goToPage: (page) => `Página ${page}`,
    perPage: 'Registros por página',
    total: (total) => `${total} resultados`,
    allOption: 'Todos',
  },
  table: {
    actions: 'Acciones',
    sortable: 'Activar ordenación',
    sortedAscending: 'Ordenado ascendente',
    sortedDescending: 'Ordenado descendente',
  },
  dataTable: {
    empty: 'Sin resultados',
    search: 'Buscar…',
  },
  inputField: {
    clear: 'Borrar',
  },
  passwordField: {
    show: 'Mostrar contraseña',
    hide: 'Ocultar contraseña',
  },
  select: {
    placeholder: 'Seleccionar…',
  },
  multiSelect: {
    placeholder: 'Seleccionar…',
    remove: (label) => `Quitar ${label}`,
  },
  numberInput: {
    decrement: 'Decrementar',
    increment: 'Incrementar',
  },
  otpInput: {
    group: 'Código de verificación',
    digit: (index, length) => `Dígito ${index} de ${length}`,
  },
  inputPhone: {
    country: 'País',
  },
  asyncSelect: {
    placeholder: 'Buscar…',
    empty: 'Sin resultados',
    loading: 'Buscando…',
    clear: 'Limpiar selección',
  },
  asyncMultiSelect: {
    placeholder: 'Buscar…',
    empty: 'Sin resultados',
    loading: 'Buscando…',
    remove: (label) => `Quitar ${label}`,
  },
  searchForm: {
    label: 'Buscar',
    placeholder: 'Buscar…',
    submit: 'Buscar',
  },
  docsSearch: {
    label: 'Buscar en la documentación',
    placeholder: 'Buscar…',
    results: 'Resultados',
    empty: 'Sin resultados.',
    loading: 'Buscando…',
  },
  filterBar: {
    label: 'Filtros',
  },
  calendar: {
    previousMonth: 'Mes anterior',
    nextMonth: 'Mes siguiente',
    previousYears: 'Años anteriores',
    nextYears: 'Años siguientes',
    yearGrid: 'Elegir año',
  },
  datePicker: {
    openCalendar: 'Abrir calendario',
    invalid: 'Escribe una fecha completa, con el día, el mes y el año.',
    calendar: 'Calendario',
    maskLetters: { day: 'dd', month: 'mm', year: 'aaaa' },
  },
  timeSelect: {
    hours: 'Horas',
    minutes: 'Minutos',
    maskHours: 'HH',
    maskMinutes: 'MM',
  },
  fileUpload: {
    dropzone: 'Arrastra archivos aquí',
    dropzoneActive: 'Suelta los archivos aquí',
    dropzoneHint: 'o haz clic para seleccionar',
    // El peso llega ya escrito en el locale («2,5 MB»): la plantilla solo lo
    // envuelve. Escribir aquí la cifra metería el separador decimal de una
    // lengua en la interfaz de otro país.
    maxSize: (max) => `máx. ${max}`,
    maxFiles: (n) => `hasta ${n} archivos`,
    files: 'Archivos seleccionados',
    progress: 'Progreso de subida',
    removeFile: (fileName) => `Eliminar ${fileName}`,
    tooLarge: (max) => `Archivo demasiado grande (máx. ${max})`,
    invalidType: 'Tipo de archivo no permitido',
  },
  imageCropDialog: {
    loading: 'Cargando imagen…',
    error: 'No hemos podido cargar la imagen. Prueba con otro archivo.',
  },
  avatarUpload: {
    button: 'Subir',
    // `buttonFor` CONTIENE a `button`: WCAG 2.5.3 (Label in Name) exige que el
    // nombre accesible incluya el texto visible.
    buttonFor: (subject) => `Subir ${subject}`,
    subject: 'el avatar',
    dropHint: (subject) => `…o arrastra la imagen hasta ${subject}`,
    dropActive: (subject) => `Suelta la imagen sobre ${subject} para subirla`,
    maxSize: (max) => `máx. ${max}`,
    // Los formatos llegan ya unidos con la conjunción del locale.
    invalidType: (formats) => `Formato no admitido. Se aceptan ${formats}.`,
    tooLarge: (max) => `El archivo pesa demasiado. El máximo es ${max}.`,
    cropCancel: 'Cancelar',
    cropConfirm: 'Guardar',
  },
  modal: {
    close: 'Cerrar',
    fallbackTitle: 'Diálogo',
  },
  sheet: {
    close: 'Cerrar',
  },
  confirmDialog: {
    cancel: 'Cancelar',
    pending: 'Confirmando…',
  },
  alert: {
    close: 'Cerrar',
  },
  banner: {
    dismiss: 'Descartar aviso',
  },
  toaster: {
    container: 'Notificaciones',
    close: 'Cerrar',
  },
  consent: {
    title: 'Cookies',
    regionLabel: 'Consentimiento de cookies',
    acceptAll: 'Aceptar todas',
    rejectAll: 'Rechazar',
    preferences: 'Preferencias',
    preferencesTitle: 'Preferencias de cookies',
    alwaysOn: 'Siempre activa',
  },
  commandPalette: {
    title: 'Buscar un comando',
    placeholder: 'Escribe para buscar…',
    empty: 'Sin resultados.',
    list: 'Sugerencias',
  },
  appLauncher: {
    open: 'Abrir el lanzador de aplicaciones',
    new: 'Nuevo',
    title: 'Aplicaciones',
  },
  floatingDock: {
    close: 'Cerrar',
    badge: (count) => `${count} mensajes nuevos`,
  },
  notificationButton: {
    label: 'Notificaciones',
    countLabel: (count) => `Notificaciones: ${count} sin leer`,
  },
  notificationPanel: {
    panel: 'Notificaciones',
    unread: 'Sin leer',
    empty: 'Estás al día',
    all: 'Ver todas las notificaciones',
    preferences: 'Preferencias de notificaciones',
    markAllRead: 'Marcar todas como leídas',
  },
  menuButton: {
    open: 'Menú de navegación',
    close: 'Cerrar menú',
  },
  appRoot: {
    skipToContent: 'Saltar al contenido principal',
  },
  appShell: {
    skipToContent: 'Saltar al contenido principal',
  },
  sidebar: {
    label: 'Barra lateral',
    resizer: 'Ancho de la barra lateral',
    resizerValue: (width) => `${width} píxeles`,
  },
  sidebarNav: {
    label: 'Navegación principal',
    empty: 'sin docs',
  },
  siteNav: {
    label: 'Navegación del sitio',
  },
  siteHeader: {
    logo: 'Studio LXD — ir al inicio',
  },
  userMenu: {
    trigger: (name) => `Cuenta de ${name}`,
    unread: (count) => `${count} notificaciones sin leer`,
  },
  orgSwitcher: {
    trigger: (name) => `Organización: ${name}`,
  },
  breadcrumb: {
    label: 'Migas de pan',
  },
  tableOfContents: {
    label: 'En esta página',
  },
  prevNextNav: {
    previous: 'Anterior',
    next: 'Siguiente',
  },
  publicPageShell: {
    preferences: 'Preferencias',
  },
  onboardingShell: {
    actions: 'Acciones del paso',
  },
  copy: {
    label: 'Copiar',
    copied: 'Copiado',
    error: 'No se pudo copiar',
  },
  codeBlock: {
    copy: 'Copiar código',
    region: (language) => (language ? `Bloque de código ${language}` : 'Bloque de código'),
  },
  dotsButton: {
    label: 'Más opciones',
  },
  progressBar: {
    label: 'Progreso',
  },
  spinner: {
    label: 'Cargando…',
  },
  slider: {
    value: 'Valor',
    min: 'Mínimo',
    max: 'Máximo',
    valueAt: (index) => `Valor ${index}`,
  },
  treeView: {
    label: 'Árbol',
  },
  clockWidget: {
    title: 'Fichaje',
    clockIn: 'Fichar entrada',
    clockOut: 'Fichar salida',
    pending: 'Fichando…',
    elapsed: 'Trabajado hoy',
    entries: 'Fichajes de hoy',
    in: 'Entrada',
    out: 'Salida',
    duration: 'Duración',
    running: 'en curso',
    total: 'Total',
    nonWorking: 'Día no laborable',
    vacation: 'Día de vacaciones',
    absence: 'Día de ausencia',
    durationValue: (hours, minutes) =>
      hours === 0 ? `${minutes} min` : minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`,
  },
  timeline: {
    label: 'Historial',
    current: 'estado actual',
  },
  uptimeBars: {
    label: 'Disponibilidad',
    noData: 'sin datos',
  },
  chart: {
    tableCaption: 'Datos del gráfico',
    tableHint: 'Los datos completos están en la tabla que sigue; flechas para recorrer el gráfico.',
    category: 'Categoría',
    value: 'Valor',
    share: 'Porcentaje',
    empty: 'Sin datos que mostrar',
  },
  stepper: {
    label: 'Progreso',
    compact: (current, total) => `Paso ${current} de ${total}`,
    completed: 'Completado',
    current: 'Paso actual',
    pending: 'Pendiente',
  },
  carousel: {
    label: 'Carrusel',
    roleDescription: 'carrusel',
    track: 'Diapositivas',
    previous: 'Anterior',
    next: 'Siguiente',
    indicator: (index) => `Ir a la diapositiva ${index + 1}`,
    pause: 'Pausar',
    play: 'Reproducir',
    slideStatus: (index, total) => `Diapositiva ${index + 1} de ${total}`,
    slideRoleDescription: 'diapositiva',
  },
  languageSwitcher: {
    label: 'Idioma',
  },
  projectCard: {
    tags: 'Categorías',
  },
  legalFooter: {
    label: 'Legal',
  },
  calendarRoster: {
    name: 'Empleado',
    legend: 'Leyenda',
    holiday: 'Festivo',
    vacation: 'Vacaciones',
    absence: 'Ausencia',
    recovery: 'Recuperación',
    birthday: 'Cumpleaños',
    nonWorking: 'No laborable',
  },
  calendarPlanner: {
    more: (count) => `+${count} más`,
  },
  notificationList: {
    label: 'Notificaciones',
    unread: 'Sin leer',
    markRead: 'Marcar como leída',
  },
  messageComposer: {
    placeholder: 'Escribe un mensaje…',
    send: 'Enviar',
  },
  conversationList: {
    new: 'Nueva conversación',
    nav: 'Conversaciones',
    delete: (label) => `Eliminar la conversación «${label}»`,
    empty: 'Todavía no hay conversaciones',
    error: 'No se pudieron cargar las conversaciones',
  },
  conversationThread: {
    label: 'Conversación',
  },
  typingIndicator: {
    typing: (name) => `${name} está escribiendo…`,
  },
  annotationThread: {
    label: 'Hilo de anotaciones',
    open: 'Abierta',
    acknowledged: 'Atendida',
    resolved: 'Resuelta',
    edited: 'editada',
    replies: (count) => (count === 1 ? '1 respuesta' : `${count} respuestas`),
  },
  chatShell: {
    list: 'Conversaciones',
    listTrigger: 'Abrir conversaciones',
  },
  untrustedText: {
    expand: 'Ver el valor completo',
    collapse: 'Ver menos',
    quotes: ['«', '»'],
  },
  connectorRequestSummary: {
    client: 'Herramienta',
    product: 'Producto',
    account: 'Cuenta',
    scope: 'Permiso',
    redirect: 'Destino',
  },
  connectorConsent: {
    title: 'Conectar una herramienta',
    deny: 'Denegar',
  },
  connectorSignIn: {
    title: 'Inicia sesión para continuar',
    signIn: 'Iniciar sesión',
    fallbackProduct: 'este producto',
  },
  connectorExternalSignIn: {
    title: 'Autorizar la conexión',
    organization: 'Tu organización',
    submit: (platform) => `Iniciar sesión con ${platform}`,
  },
  connectorRejection: {
    code: 'Código',
  },
};
