import type { CompleteBrandMessages } from './BrandMessages';
import { paginationEs } from './es/pagination';
import { tableEs } from './es/table';
import { dataTableEs } from './es/dataTable';
import { inputFieldEs } from './es/inputField';
import { passwordFieldEs } from './es/passwordField';
import { selectEs } from './es/select';
import { multiSelectEs } from './es/multiSelect';
import { numberInputEs } from './es/numberInput';
import { otpInputEs } from './es/otpInput';
import { inputPhoneEs } from './es/inputPhone';
import { asyncSelectEs } from './es/asyncSelect';
import { asyncMultiSelectEs } from './es/asyncMultiSelect';
import { searchFormEs } from './es/searchForm';
import { siteSearchEs } from './es/siteSearch';
import { docsSearchEs } from './es/docsSearch';
import { filterBarEs } from './es/filterBar';
import { calendarEs } from './es/calendar';
import { datePickerEs } from './es/datePicker';
import { colorPickerEs } from './es/colorPicker';
import { timeSelectEs } from './es/timeSelect';
import { fileUploadEs } from './es/fileUpload';
import { imageCropDialogEs } from './es/imageCropDialog';
import { avatarUploadEs } from './es/avatarUpload';
import { modalEs } from './es/modal';
import { sheetEs } from './es/sheet';
import { confirmDialogEs } from './es/confirmDialog';
import { alertEs } from './es/alert';
import { bannerEs } from './es/banner';
import { toasterEs } from './es/toaster';
import { consentEs } from './es/consent';
import { commandPaletteEs } from './es/commandPalette';
import { appLauncherEs } from './es/appLauncher';
import { floatingDockEs } from './es/floatingDock';
import { notificationButtonEs } from './es/notificationButton';
import { notificationPanelEs } from './es/notificationPanel';
import { menuButtonEs } from './es/menuButton';
import { appRootEs } from './es/appRoot';
import { appShellEs } from './es/appShell';
import { appHeaderEs } from './es/appHeader';
import { sidebarEs } from './es/sidebar';
import { sidebarNavEs } from './es/sidebarNav';
import { siteNavEs } from './es/siteNav';
import { siteHeaderEs } from './es/siteHeader';
import { userMenuEs } from './es/userMenu';
import { orgSwitcherEs } from './es/orgSwitcher';
import { breadcrumbEs } from './es/breadcrumb';
import { tableOfContentsEs } from './es/tableOfContents';
import { prevNextNavEs } from './es/prevNextNav';
import { publicPageShellEs } from './es/publicPageShell';
import { onboardingShellEs } from './es/onboardingShell';
import { copyEs } from './es/copy';
import { codeBlockEs } from './es/codeBlock';
import { dotsButtonEs } from './es/dotsButton';
import { closeButtonEs } from './es/closeButton';
import { themeSwitcherEs } from './es/themeSwitcher';
import { statTileEs } from './es/statTile';
import { progressBarEs } from './es/progressBar';
import { spinnerEs } from './es/spinner';
import { fieldEs } from './es/field';
import { sliderEs } from './es/slider';
import { treeViewEs } from './es/treeView';
import { clockWidgetEs } from './es/clockWidget';
import { heatmapEs } from './es/heatmap';
import { orgChartEs } from './es/orgChart';
import { planningGridEs } from './es/planningGrid';
import { recurrenceFieldEs } from './es/recurrenceField';
import { timelineEs } from './es/timeline';
import { uptimeBarsEs } from './es/uptimeBars';
import { chartEs } from './es/chart';
import { stepperEs } from './es/stepper';
import { carouselEs } from './es/carousel';
import { languageSwitcherEs } from './es/languageSwitcher';
import { projectCardEs } from './es/projectCard';
import { legalFooterEs } from './es/legalFooter';
import { calendarRosterEs } from './es/calendarRoster';
import { calendarPlannerEs } from './es/calendarPlanner';
import { notificationListEs } from './es/notificationList';
import { messageComposerEs } from './es/messageComposer';
import { conversationListEs } from './es/conversationList';
import { conversationThreadEs } from './es/conversationThread';
import { typingIndicatorEs } from './es/typingIndicator';
import { annotationThreadEs } from './es/annotationThread';
import { chatShellEs } from './es/chatShell';
import { untrustedTextEs } from './es/untrustedText';
import { connectorRequestSummaryEs } from './es/connectorRequestSummary';
import { connectorConsentEs } from './es/connectorConsent';
import { connectorSignInEs } from './es/connectorSignIn';
import { connectorExternalSignInEs } from './es/connectorExternalSignIn';
import { connectorRejectionEs } from './es/connectorRejection';

/**
 * El catálogo castellano **entero**, ensamblado desde los espacios de `es/`.
 *
 * Es el respaldo de la librería (D5): cuando un texto no llega ni por prop ni
 * por el catálogo de la app, sale en castellano. Pero ese respaldo no viaja
 * entero: cada componente importa **solo su espacio**
 * (`useBrandMessages('pagination', paginationEs)`), así que el bundle de una
 * app que importa el paginador lleva el castellano del paginador y nada más.
 *
 * Este objeto ensamblado no lo importa ningún componente ni ningún punto de
 * entrada (lo vigila `BrandMessages.test.ts`): si lo hiciera, cada espacio
 * pasaría a compartirse entre dos entradas y el build lo partiría en un chunk
 * por espacio. Lo usan el Storybook (`.storybook/brandMessagesFixture.ts`,
 * que lo reexporta) y los tests. El tipo `CompleteBrandMessages` obliga a
 * que esté entero: un espacio nuevo sin su castellano no compila.
 */
export const brandMessagesEs: CompleteBrandMessages = {
  pagination: paginationEs,
  table: tableEs,
  dataTable: dataTableEs,
  inputField: inputFieldEs,
  passwordField: passwordFieldEs,
  select: selectEs,
  multiSelect: multiSelectEs,
  numberInput: numberInputEs,
  otpInput: otpInputEs,
  inputPhone: inputPhoneEs,
  asyncSelect: asyncSelectEs,
  asyncMultiSelect: asyncMultiSelectEs,
  searchForm: searchFormEs,
  siteSearch: siteSearchEs,
  docsSearch: docsSearchEs,
  filterBar: filterBarEs,
  calendar: calendarEs,
  datePicker: datePickerEs,
  colorPicker: colorPickerEs,
  timeSelect: timeSelectEs,
  fileUpload: fileUploadEs,
  imageCropDialog: imageCropDialogEs,
  avatarUpload: avatarUploadEs,
  modal: modalEs,
  sheet: sheetEs,
  confirmDialog: confirmDialogEs,
  alert: alertEs,
  banner: bannerEs,
  toaster: toasterEs,
  consent: consentEs,
  commandPalette: commandPaletteEs,
  appLauncher: appLauncherEs,
  floatingDock: floatingDockEs,
  notificationButton: notificationButtonEs,
  notificationPanel: notificationPanelEs,
  menuButton: menuButtonEs,
  appRoot: appRootEs,
  appShell: appShellEs,
  appHeader: appHeaderEs,
  sidebar: sidebarEs,
  sidebarNav: sidebarNavEs,
  siteNav: siteNavEs,
  siteHeader: siteHeaderEs,
  userMenu: userMenuEs,
  orgSwitcher: orgSwitcherEs,
  breadcrumb: breadcrumbEs,
  tableOfContents: tableOfContentsEs,
  prevNextNav: prevNextNavEs,
  publicPageShell: publicPageShellEs,
  onboardingShell: onboardingShellEs,
  copy: copyEs,
  codeBlock: codeBlockEs,
  dotsButton: dotsButtonEs,
  closeButton: closeButtonEs,
  themeSwitcher: themeSwitcherEs,
  statTile: statTileEs,
  progressBar: progressBarEs,
  spinner: spinnerEs,
  slider: sliderEs,
  treeView: treeViewEs,
  clockWidget: clockWidgetEs,
  heatmap: heatmapEs,
  orgChart: orgChartEs,
  planningGrid: planningGridEs,
  recurrenceField: recurrenceFieldEs,
  timeline: timelineEs,
  uptimeBars: uptimeBarsEs,
  chart: chartEs,
  stepper: stepperEs,
  carousel: carouselEs,
  languageSwitcher: languageSwitcherEs,
  projectCard: projectCardEs,
  legalFooter: legalFooterEs,
  calendarRoster: calendarRosterEs,
  calendarPlanner: calendarPlannerEs,
  notificationList: notificationListEs,
  messageComposer: messageComposerEs,
  conversationList: conversationListEs,
  conversationThread: conversationThreadEs,
  typingIndicator: typingIndicatorEs,
  annotationThread: annotationThreadEs,
  chatShell: chatShellEs,
  untrustedText: untrustedTextEs,
  connectorRequestSummary: connectorRequestSummaryEs,
  connectorConsent: connectorConsentEs,
  connectorSignIn: connectorSignInEs,
  connectorExternalSignIn: connectorExternalSignInEs,
  connectorRejection: connectorRejectionEs,
  field: fieldEs,
};
