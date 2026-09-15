import type { BrandMessages } from '../src/stories/messages/BrandMessages';

/**
 * El mismo catálogo que `brandMessagesFixture`, **en inglés**, para las
 * stories «Textos desde el proveedor (otro idioma)».
 *
 * Existe por economía, no por capricho: cada ola de la campaña del proveedor
 * añade espacios al tipo `BrandMessages`, y con el literal copiado dentro de
 * cada story eso obligaba a completar a mano el mismo objeto en una docena de
 * ficheros. Aquí se escribe una vez; el tipo obliga a que esté entero, así que
 * una ola que se deje un espacio no compila.
 *
 * Vale lo mismo que para el castellano: vive **fuera de `src/`**, no es punto
 * de entrada de la librería, no lo importa ningún componente y
 * `package.json#files` no publica `.storybook/`. Ningún código de un
 * consumidor puede caer aquí. Lo vigila
 * `src/stories/messages/BrandMessages.test.ts`.
 *
 * Solo lo importan `.stories.tsx` —que tampoco viajan en el paquete—, nunca un
 * componente.
 */
export const brandMessagesFixtureEn: BrandMessages = {
  pagination: {
    label: 'Pagination',
    pagesGroup: 'Pages',
    previous: 'Previous page',
    next: 'Next page',
    goToPage: (page) => `Page ${page}`,
    perPage: 'Rows per page',
    total: (total) => `${total} results`,
    allOption: 'All',
  },
  table: {
    actions: 'Actions',
    sortable: 'Activate sorting',
    sortedAscending: 'Sorted ascending',
    sortedDescending: 'Sorted descending',
  },
  dataTable: {
    empty: 'No results.',
    search: 'Search…',
  },
  inputField: {
    clear: 'Clear',
  },
  passwordField: {
    show: 'Show password',
    hide: 'Hide password',
  },
  select: {
    placeholder: 'Select…',
  },
  multiSelect: {
    placeholder: 'Select…',
    remove: (label) => `Remove ${label}`,
  },
  numberInput: {
    decrement: 'Decrease',
    increment: 'Increase',
  },
  otpInput: {
    group: 'Verification code',
    digit: (index, length) => `Digit ${index} of ${length}`,
  },
  inputPhone: {
    country: 'Country',
  },
  asyncSelect: {
    placeholder: 'Search…',
    empty: 'No results',
    loading: 'Searching…',
    clear: 'Clear selection',
  },
  asyncMultiSelect: {
    placeholder: 'Search…',
    empty: 'No results',
    loading: 'Searching…',
    remove: (label) => `Remove ${label}`,
  },
  searchForm: {
    label: 'Search',
    placeholder: 'Search…',
    submit: 'Search',
  },
  docsSearch: {
    label: 'Search the documentation',
    placeholder: 'Search…',
    results: 'Results',
    empty: 'No results.',
    loading: 'Searching…',
  },
  filterBar: {
    label: 'Filters',
  },
  calendar: {
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    previousYears: 'Previous years',
    nextYears: 'Next years',
    yearGrid: 'Choose year',
  },
  datePicker: {
    openCalendar: 'Open calendar',
    invalid: 'Enter a complete, valid date.',
    calendar: 'Calendar',
    // Las letras cambian con el idioma; el orden y el separador, con el
    // `locale`: en `en-GB` esto se pinta `dd/mm/yyyy`, y en `en-US`,
    // `mm/dd/yyyy`, sin tocar el catálogo.
    maskLetters: { day: 'dd', month: 'mm', year: 'yyyy' },
  },
  timeSelect: {
    hours: 'Hours',
    minutes: 'Minutes',
    maskHours: 'HH',
    maskMinutes: 'MM',
  },
  fileUpload: {
    dropzone: 'Drag files here',
    dropzoneActive: 'Drop the files here',
    dropzoneHint: 'or click to browse',
    // El peso llega ya escrito en el locale: con este mismo catálogo inglés,
    // «2,5 MB» en `es-ES` y «2.5 MB» en `en-US`.
    maxSize: (max) => `max. ${max}`,
    maxFiles: (n) => `up to ${n} files`,
    files: 'Selected files',
    progress: 'Upload progress',
    removeFile: (fileName) => `Remove ${fileName}`,
    tooLarge: (max) => `File too large (max. ${max})`,
    invalidType: 'File type not allowed',
  },
  imageCropDialog: {
    loading: 'Loading image…',
    error: 'We could not load the image. Try another file.',
  },
  avatarUpload: {
    button: 'Upload',
    // Contiene a `button`, como exige WCAG 2.5.3.
    buttonFor: (subject) => `Upload ${subject}`,
    subject: 'the avatar',
    dropHint: (subject) => `…or drag the image onto ${subject}`,
    dropActive: (subject) => `Drop the image onto ${subject} to upload it`,
    maxSize: (max) => `max. ${max}`,
    invalidType: (formats) => `Format not supported. We accept ${formats}.`,
    tooLarge: (max) => `The file is too heavy. The maximum is ${max}.`,
    cropCancel: 'Cancel',
    cropConfirm: 'Save',
  },
  modal: {
    close: 'Close',
    fallbackTitle: 'Dialog',
  },
  sheet: {
    close: 'Close',
  },
  confirmDialog: {
    cancel: 'Cancel',
    pending: 'Confirming…',
  },
  alert: {
    close: 'Close',
  },
  banner: {
    dismiss: 'Dismiss notice',
  },
  toaster: {
    container: 'Notifications',
    close: 'Close',
  },
  consent: {
    title: 'Cookies',
    regionLabel: 'Cookie consent',
    acceptAll: 'Accept all',
    rejectAll: 'Reject',
    preferences: 'Preferences',
    preferencesTitle: 'Cookie preferences',
    alwaysOn: 'Always on',
  },
  commandPalette: {
    title: 'Search for a command',
    placeholder: 'Type to search…',
    empty: 'No results.',
    list: 'Suggestions',
  },
  appLauncher: {
    open: 'Open the app launcher',
    new: 'New',
    title: 'Applications',
  },
  floatingDock: {
    close: 'Close',
    badge: (count) => `${count} new messages`,
  },
  notificationButton: {
    label: 'Notifications',
    countLabel: (count) => `Notifications: ${count} unread`,
  },
  notificationPanel: {
    panel: 'Notifications',
    unread: 'Unread',
    empty: "You're all caught up",
    all: 'See all notifications',
    preferences: 'Notification preferences',
    markAllRead: 'Mark all as read',
  },
  menuButton: {
    open: 'Navigation menu',
    close: 'Close menu',
  },
  appRoot: {
    skipToContent: 'Skip to main content',
  },
  appShell: {
    skipToContent: 'Skip to main content',
  },
  sidebar: {
    label: 'Sidebar',
    resizer: 'Sidebar width',
    resizerValue: (width) => `${width} pixels`,
  },
  sidebarNav: {
    label: 'Main',
    empty: 'no docs',
  },
  siteNav: {
    label: 'Site navigation',
  },
  siteHeader: {
    logo: 'Studio LXD — go to the home page',
  },
  userMenu: {
    trigger: (name) => `${name}'s account`,
    unread: (count) => `${count} unread notifications`,
  },
  orgSwitcher: {
    trigger: (name) => `Organisation: ${name}`,
  },
  breadcrumb: {
    label: 'Breadcrumb',
  },
  tableOfContents: {
    label: 'On this page',
  },
  prevNextNav: {
    previous: 'Previous',
    next: 'Next',
  },
  publicPageShell: {
    preferences: 'Preferences',
  },
  onboardingShell: {
    actions: 'Step actions',
  },
  copy: {
    label: 'Copy',
    copied: 'Copied',
    error: 'Could not copy',
  },
  codeBlock: {
    copy: 'Copy code',
    region: (language) => (language ? `${language} code block` : 'Code block'),
  },
  dotsButton: {
    label: 'More options',
  },
  progressBar: {
    label: 'Progress',
  },
  spinner: {
    label: 'Loading…',
  },
  slider: {
    value: 'Value',
    min: 'Minimum',
    max: 'Maximum',
    valueAt: (index) => `Value ${index}`,
  },
  treeView: {
    label: 'Tree',
  },
  uptimeBars: {
    label: 'Uptime',
    noData: 'no data',
  },
  chart: {
    tableCaption: 'Chart data',
    tableHint: 'The full data is in the table that follows; use the arrow keys to walk the chart.',
    category: 'Category',
    value: 'Value',
    share: 'Share',
    empty: 'No data to show',
  },
  stepper: {
    label: 'Progress',
    compact: (current, total) => `Step ${current} of ${total}`,
    completed: 'Completed',
    current: 'Current step',
    pending: 'Pending',
  },
  carousel: {
    label: 'Carousel',
    roleDescription: 'carousel',
    track: 'Slides',
    previous: 'Previous',
    next: 'Next',
    indicator: (index) => `Go to slide ${index + 1}`,
    pause: 'Pause',
    play: 'Play',
    slideStatus: (index, total) => `Slide ${index + 1} of ${total}`,
    slideRoleDescription: 'slide',
  },
  languageSwitcher: {
    label: 'Language',
  },
  projectCard: {
    tags: 'Categories',
  },
  legalFooter: {
    label: 'Legal',
  },
  calendarRoster: {
    name: 'Employee',
    legend: 'Legend',
    holiday: 'Public holiday',
    vacation: 'Holiday',
    absence: 'Absence',
    recovery: 'Time off in lieu',
    birthday: 'Birthday',
    nonWorking: 'Non-working day',
  },
  calendarPlanner: {
    more: (count) => `+${count} more`,
  },
  notificationList: {
    label: 'Notifications',
    unread: 'Unread',
    markRead: 'Mark as read',
  },
};
