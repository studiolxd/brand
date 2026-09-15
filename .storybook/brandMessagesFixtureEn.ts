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
};
