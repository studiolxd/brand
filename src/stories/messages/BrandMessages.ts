import type { PaginationMessages } from '../molecules/Pagination/Pagination';
import type { TableMessages } from '../molecules/Table/Table';
import type { DataTableMessages } from '../organisms/DataTable/DataTable';
import type { InputFieldMessages } from '../molecules/InputField/InputField';
import type { PasswordFieldMessages } from '../molecules/PasswordField/PasswordField';
import type { SelectMessages } from '../atoms/Select/Select';
import type { MultiSelectMessages } from '../atoms/MultiSelect/MultiSelect';
import type { NumberInputMessages } from '../atoms/NumberInput/NumberInput';
import type { OtpInputMessages } from '../atoms/OtpInput/OtpInput';
import type { InputPhoneMessages } from '../atoms/InputPhone/InputPhone';
import type { AsyncSelectMessages } from '../atoms/AsyncSelect/AsyncSelect';
import type { AsyncMultiSelectMessages } from '../atoms/AsyncMultiSelect/AsyncMultiSelect';
import type { DocsSearchMessages } from '../molecules/DocsSearch/DocsSearch';
import type { SearchFormMessages } from '../molecules/SearchForm/SearchForm';
import type { FilterBarMessages } from '../molecules/FilterBar/FilterBar';
import type { CalendarMessages } from '../molecules/Calendar/Calendar';
import type { DatePickerMessages } from '../molecules/DatePicker/DatePicker';
import type { TimeSelectMessages } from '../atoms/TimeSelect/TimeSelect';
import type { FileUploadMessages } from '../atoms/FileUpload/FileUpload';
import type { ImageCropDialogMessages } from '../molecules/ImageCropDialog/ImageCropDialog';
import type { AvatarUploadMessages } from '../molecules/AvatarUpload/AvatarUpload';
import type { ModalMessages } from '../molecules/Modal/Modal';
import type { SheetMessages } from '../molecules/Sheet/Sheet';
import type { ConfirmDialogMessages } from '../molecules/ConfirmDialog/ConfirmDialog';
import type { AlertMessages } from '../molecules/Alert/Alert';
import type { BannerMessages } from '../molecules/Banner/Banner';
import type { ToasterMessages } from '../molecules/Toast/Toaster';
import type { ConsentMessages } from '../molecules/Consent/Consent';
import type { CommandPaletteMessages } from '../molecules/CommandPalette/CommandPalette';
import type { AppLauncherMessages } from '../molecules/AppLauncher/AppLauncher';
import type { FloatingDockMessages } from '../sections/FloatingDock/FloatingDock';
import type { NotificationButtonMessages } from '../molecules/NotificationButton/NotificationButton';
import type { NotificationPanelMessages } from '../molecules/NotificationPanel/NotificationPanel';
import type { MenuButtonMessages } from '../atoms/MenuButton/MenuButton';
import type { AppRootMessages } from '../sections/AppRoot/AppRoot';
import type { AppShellMessages } from '../sections/AppShell/AppShell';
import type { SidebarMessages } from '../sections/Sidebar/Sidebar';
import type { SidebarNavMessages } from '../molecules/SidebarNav/SidebarNav';
import type { SiteNavMessages } from '../molecules/SiteNav/SiteNav';
import type { SiteHeaderMessages } from '../sections/SiteHeader/SiteHeader';
import type { UserMenuMessages } from '../molecules/UserMenu/UserMenu';
import type { OrgSwitcherMessages } from '../molecules/OrgSwitcher/OrgSwitcher';
import type { BreadcrumbMessages } from '../molecules/Breadcrumb/Breadcrumb';
import type { TableOfContentsMessages } from '../molecules/TableOfContents/TableOfContents';
import type { PrevNextNavMessages } from '../molecules/PrevNextNav/PrevNextNav';
import type { PublicPageShellMessages } from '../templates/PublicPageShell/PublicPageShell';
import type { OnboardingShellMessages } from '../templates/OnboardingShell/OnboardingShell';
import type { CopyMessages } from '../constants/copy-to-clipboard';
import type { CodeBlockMessages } from '../molecules/CodeBlock/CodeBlock';
import type { DotsButtonMessages } from '../atoms/DotsButton/DotsButton';
import type { ProgressBarMessages } from '../atoms/ProgressBar/ProgressBar';
import type { SpinnerMessages } from '../atoms/Spinner/Spinner';
import type { SliderMessages } from '../atoms/Slider/Slider';
import type { TreeViewMessages } from '../molecules/TreeView/TreeView';
import type { UptimeBarsMessages } from '../molecules/UptimeBars/UptimeBars';
import type { ChartMessages } from '../organisms/Chart/Chart';
import type { StepperMessages } from '../molecules/Stepper/Stepper';
import type { CarouselMessages } from '../molecules/Carousel/Carousel';
import type { LanguageSwitcherMessages } from '../molecules/LanguageSwitcher/LanguageSwitcher';
import type { ProjectCardMessages } from '../molecules/ProjectCard/ProjectCard';
import type { LegalFooterMessages } from '../sections/LegalFooter/LegalFooter';
import type { CalendarRosterMessages } from '../molecules/CalendarRoster/CalendarRoster';
import type { CalendarPlannerMessages } from '../molecules/CalendarPlanner/CalendarPlanner';
import type { NotificationListMessages } from '../molecules/NotificationList/NotificationList';
import type { MessageComposerMessages } from '../molecules/MessageComposer/MessageComposer';
import type { ConversationListMessages } from '../molecules/ConversationList/ConversationList';
import type { ConversationThreadMessages } from '../organisms/ConversationThread/ConversationThread';
import type { TypingIndicatorMessages } from '../atoms/TypingIndicator/TypingIndicator';
import type { AnnotationThreadMessages } from '../organisms/AnnotationThread/AnnotationThread';
import type { ChatShellMessages } from '../templates/ChatShell/ChatShell';
import type { UntrustedTextMessages } from '../templates/ConnectorAuth/UntrustedText';
import type { ConnectorRequestSummaryMessages } from '../templates/ConnectorAuth/ConnectorRequestSummary';
import type { ConnectorConsentMessages } from '../templates/ConnectorAuth/ConnectorConsentPage';
import type { ConnectorSignInMessages } from '../templates/ConnectorAuth/ConnectorSignInPage';
import type { ConnectorExternalSignInMessages } from '../templates/ConnectorAuth/ConnectorExternalSignInPage';
import type { ConnectorRejectionMessages } from '../templates/ConnectorAuth/ConnectorRejectionPage';

/**
 * El contrato de textos de la librería: un espacio por componente, y dentro
 * de cada espacio **todas las claves obligatorias**.
 *
 * El tipo nace aquí, en el DS, y es el catálogo de la aplicación el que lo
 * satisface — nunca al revés. Si el tipo se generase desde el JSON de una
 * suite concreta, el DS pasaría a depender de un paquete de producto para
 * declarar su propio contrato y dejaría de sostenerse solo.
 *
 * Anidado por componente, no plano: son 310 textos en 111 componentes, y una
 * lista plana de claves sueltas (`paginationPrevious`, `modalClose`…) no se
 * puede escribir ni revisar. Los espacios calcan además los que el catálogo
 * de la suite ya tiene (`pagination`, `table`, `common`…), así que montar el
 * proveedor es mapear namespaces, no inventarlos.
 *
 * Cada interfaz de espacio vive **junto a su componente** (como
 * `RecoveryCodesLabels`), no aquí: aquí solo se ensamblan. Un componente que
 * gana textos declara su interfaz al lado de sus props y añade una línea a
 * este tipo; a partir de ese momento, una aplicación que no la rellene no
 * compila.
 */
export interface BrandMessages {
  pagination: PaginationMessages;
  table: TableMessages;
  dataTable: DataTableMessages;
  inputField: InputFieldMessages;
  passwordField: PasswordFieldMessages;
  select: SelectMessages;
  multiSelect: MultiSelectMessages;
  numberInput: NumberInputMessages;
  otpInput: OtpInputMessages;
  inputPhone: InputPhoneMessages;
  asyncSelect: AsyncSelectMessages;
  asyncMultiSelect: AsyncMultiSelectMessages;
  docsSearch: DocsSearchMessages;
  searchForm: SearchFormMessages;
  filterBar: FilterBarMessages;
  calendar: CalendarMessages;
  datePicker: DatePickerMessages;
  timeSelect: TimeSelectMessages;
  fileUpload: FileUploadMessages;
  imageCropDialog: ImageCropDialogMessages;
  avatarUpload: AvatarUploadMessages;
  modal: ModalMessages;
  sheet: SheetMessages;
  confirmDialog: ConfirmDialogMessages;
  alert: AlertMessages;
  banner: BannerMessages;
  toaster: ToasterMessages;
  consent: ConsentMessages;
  commandPalette: CommandPaletteMessages;
  appLauncher: AppLauncherMessages;
  floatingDock: FloatingDockMessages;
  notificationButton: NotificationButtonMessages;
  notificationPanel: NotificationPanelMessages;
  menuButton: MenuButtonMessages;
  appRoot: AppRootMessages;
  appShell: AppShellMessages;
  sidebar: SidebarMessages;
  sidebarNav: SidebarNavMessages;
  siteNav: SiteNavMessages;
  siteHeader: SiteHeaderMessages;
  userMenu: UserMenuMessages;
  orgSwitcher: OrgSwitcherMessages;
  breadcrumb: BreadcrumbMessages;
  tableOfContents: TableOfContentsMessages;
  prevNextNav: PrevNextNavMessages;
  publicPageShell: PublicPageShellMessages;
  onboardingShell: OnboardingShellMessages;
  copy: CopyMessages;
  codeBlock: CodeBlockMessages;
  dotsButton: DotsButtonMessages;
  progressBar: ProgressBarMessages;
  spinner: SpinnerMessages;
  slider: SliderMessages;
  treeView: TreeViewMessages;
  uptimeBars: UptimeBarsMessages;
  chart: ChartMessages;
  stepper: StepperMessages;
  carousel: CarouselMessages;
  languageSwitcher: LanguageSwitcherMessages;
  projectCard: ProjectCardMessages;
  legalFooter: LegalFooterMessages;
  calendarRoster: CalendarRosterMessages;
  calendarPlanner: CalendarPlannerMessages;
  notificationList: NotificationListMessages;
  messageComposer: MessageComposerMessages;
  conversationList: ConversationListMessages;
  conversationThread: ConversationThreadMessages;
  typingIndicator: TypingIndicatorMessages;
  annotationThread: AnnotationThreadMessages;
  chatShell: ChatShellMessages;
  untrustedText: UntrustedTextMessages;
  connectorRequestSummary: ConnectorRequestSummaryMessages;
  connectorConsent: ConnectorConsentMessages;
  connectorSignIn: ConnectorSignInMessages;
  connectorExternalSignIn: ConnectorExternalSignInMessages;
  connectorRejection: ConnectorRejectionMessages;
}

export type {
  PaginationMessages,
  TableMessages,
  DataTableMessages,
  InputFieldMessages,
  PasswordFieldMessages,
  SelectMessages,
  MultiSelectMessages,
  NumberInputMessages,
  OtpInputMessages,
  InputPhoneMessages,
  AsyncSelectMessages,
  AsyncMultiSelectMessages,
  DocsSearchMessages,
  SearchFormMessages,
  FilterBarMessages,
  CalendarMessages,
  DatePickerMessages,
  TimeSelectMessages,
  FileUploadMessages,
  ImageCropDialogMessages,
  AvatarUploadMessages,
  ModalMessages,
  SheetMessages,
  ConfirmDialogMessages,
  AlertMessages,
  BannerMessages,
  ToasterMessages,
  ConsentMessages,
  CommandPaletteMessages,
  AppLauncherMessages,
  FloatingDockMessages,
  NotificationButtonMessages,
  NotificationPanelMessages,
  MenuButtonMessages,
  AppRootMessages,
  AppShellMessages,
  SidebarMessages,
  SidebarNavMessages,
  SiteNavMessages,
  SiteHeaderMessages,
  UserMenuMessages,
  OrgSwitcherMessages,
  BreadcrumbMessages,
  TableOfContentsMessages,
  PrevNextNavMessages,
  PublicPageShellMessages,
  OnboardingShellMessages,
  CopyMessages,
  CodeBlockMessages,
  DotsButtonMessages,
  ProgressBarMessages,
  SpinnerMessages,
  SliderMessages,
  TreeViewMessages,
  UptimeBarsMessages,
  ChartMessages,
  StepperMessages,
  CarouselMessages,
  LanguageSwitcherMessages,
  ProjectCardMessages,
  LegalFooterMessages,
  CalendarRosterMessages,
  CalendarPlannerMessages,
  NotificationListMessages,
  MessageComposerMessages,
  ConversationListMessages,
  ConversationThreadMessages,
  TypingIndicatorMessages,
  AnnotationThreadMessages,
  ChatShellMessages,
  UntrustedTextMessages,
  ConnectorRequestSummaryMessages,
  ConnectorConsentMessages,
  ConnectorSignInMessages,
  ConnectorExternalSignInMessages,
  ConnectorRejectionMessages,
};
