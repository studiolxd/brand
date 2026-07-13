// Tokens & base styles — importado como side-effect para que Vite lo incluya en el CSS bundle
import './index.css';

// ─── Atoms ───────────────────────────────────────────────────
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './stories/atoms/Accordion/Accordion';
export { AsyncMultiSelect } from './stories/atoms/AsyncMultiSelect/AsyncMultiSelect';
export type { AsyncMultiSelectOption, AsyncMultiSelectProps } from './stories/atoms/AsyncMultiSelect/AsyncMultiSelect';
export { AsyncSelect } from './stories/atoms/AsyncSelect/AsyncSelect';
export type { AsyncSelectOption, AsyncSelectProps } from './stories/atoms/AsyncSelect/AsyncSelect';
export { Arrow } from './stories/atoms/Arrow/Arrow';
export { DescriptionList } from './stories/atoms/DescriptionList/DescriptionList';
export type { DescriptionListProps } from './stories/atoms/DescriptionList/DescriptionList';
export { Avatar } from './stories/atoms/Avatar/Avatar';
export { Button } from './stories/atoms/Button/Button';
export type { ButtonProps } from './stories/atoms/Button/Button';
export { Carousel } from './stories/atoms/Carousel/Carousel';
export { Checkbox } from './stories/atoms/Checkbox/Checkbox';
export type { CheckboxProps } from './stories/atoms/Checkbox/Checkbox';
export { Icon } from './stories/atoms/Icon/Icon';
export type { IconName, IconProps } from './stories/atoms/Icon/Icon';
export { DotsButton } from './stories/atoms/DotsButton/DotsButton';
export type { DotsButtonProps } from './stories/atoms/DotsButton/DotsButton';
export { Hamburger } from './stories/atoms/Hamburger/Hamburger';
export { Fieldset } from './stories/atoms/Fieldset/Fieldset';
export type { FieldsetProps } from './stories/atoms/Fieldset/Fieldset';
export { Heading } from './stories/atoms/Heading/Heading';
export { HeroVideo } from './stories/atoms/HeroVideo/HeroVideo';
export { Highlight } from './stories/atoms/Highlight/Highlight';
export { Input } from './stories/atoms/Input/Input';
export type { InputProps } from './stories/atoms/Input/Input';
export { NumberInput } from './stories/atoms/NumberInput/NumberInput';
export type { NumberInputProps } from './stories/atoms/NumberInput/NumberInput';
export { FileUpload } from './stories/atoms/FileUpload/FileUpload';
export type { FileUploadProps } from './stories/atoms/FileUpload/FileUpload';
export { InputPhone } from './stories/atoms/InputPhone/InputPhone';
export { OtpInput } from './stories/atoms/OtpInput/OtpInput';
export type { OtpInputProps } from './stories/atoms/OtpInput/OtpInput';
export { Label } from './stories/atoms/Label/Label';
export type { LabelProps } from './stories/atoms/Label/Label';
export { Link } from './stories/atoms/Link/Link';
export { List } from './stories/atoms/List/List';
export { Logo } from './stories/atoms/Logo/Logo';
export { Paragraph } from './stories/atoms/Paragraph/Paragraph';
export { ProgressBar } from './stories/atoms/ProgressBar/ProgressBar';
export type { ProgressBarProps, ProgressBarVariant, ProgressBarSize } from './stories/atoms/ProgressBar/ProgressBar';
export { Popover } from './stories/atoms/Popover/Popover';
export type { PopoverProps } from './stories/atoms/Popover/Popover';
export { MultiSelect } from './stories/atoms/MultiSelect/MultiSelect';
export type { MultiSelectOption, MultiSelectProps } from './stories/atoms/MultiSelect/MultiSelect';
export { Radio } from './stories/atoms/Radio/Radio';
export type { RadioProps } from './stories/atoms/Radio/Radio';
export {
  Select, SelectRoot, SelectTrigger, SelectValue, SelectContent,
  SelectGroup, SelectLabel, SelectItem, SelectSeparator,
} from './stories/atoms/Select/Select';
export type {
  SelectProps, SelectOption, SelectTriggerProps, SelectContentProps,
  SelectItemProps, SelectLabelProps, SelectSeparatorProps,
} from './stories/atoms/Select/Select';
export { TimeSelect } from './stories/atoms/TimeSelect/TimeSelect';
export type { TimeSelectProps, TimeValue } from './stories/atoms/TimeSelect/TimeSelect';
export { SkipLink } from './stories/atoms/SkipLink/SkipLink';
export { Spinner } from './stories/atoms/Spinner/Spinner';
export type { SpinnerProps, SpinnerSize } from './stories/atoms/Spinner/Spinner';
export { Switcher } from './stories/atoms/Switcher/Switcher';
export type { SwitcherProps } from './stories/atoms/Switcher/Switcher';
export { Tag } from './stories/atoms/Tag/Tag';
export type { TagProps, TagVariant } from './stories/atoms/Tag/Tag';
export { Kbd } from './stories/atoms/Kbd/Kbd';
export type { KbdProps } from './stories/atoms/Kbd/Kbd';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './stories/atoms/Tabs/Tabs';
export { NumberBadge } from './stories/atoms/NumberBadge/NumberBadge';
export type { NumberBadgeProps, NumberBadgeVariant } from './stories/atoms/NumberBadge/NumberBadge';
export { MessageBubble } from './stories/atoms/MessageBubble/MessageBubble';
export type { MessageBubbleProps } from './stories/atoms/MessageBubble/MessageBubble';
export { TypingIndicator } from './stories/atoms/TypingIndicator/TypingIndicator';
export type { TypingIndicatorProps } from './stories/atoms/TypingIndicator/TypingIndicator';
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './stories/atoms/Tabs/Tabs';
export { Textarea } from './stories/atoms/Textarea/Textarea';
export type { TextareaProps } from './stories/atoms/Textarea/Textarea';
export { VisuallyHidden } from './stories/atoms/VisuallyHidden/VisuallyHidden';

// ─── Molecules ───────────────────────────────────────────────
export { Alert, AlertTitle, AlertDescription } from './stories/molecules/Alert/Alert';
export type { AlertProps, AlertTitleProps, AlertDescriptionProps } from './stories/molecules/Alert/Alert';
export { AsyncMultiSelectField } from './stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField';
export type { AsyncMultiSelectFieldProps } from './stories/molecules/AsyncMultiSelectField/AsyncMultiSelectField';
export { AsyncSelectField } from './stories/molecules/AsyncSelectField/AsyncSelectField';
export type { AsyncSelectFieldProps } from './stories/molecules/AsyncSelectField/AsyncSelectField';
export { Breadcrumb } from './stories/molecules/Breadcrumb/Breadcrumb';
export type { BreadcrumbItem, BreadcrumbProps, BreadcrumbRenderLinkProps } from './stories/molecules/Breadcrumb/Breadcrumb';
export { EmptyState } from './stories/molecules/EmptyState/EmptyState';
export type { EmptyStateProps, EmptyStateAction } from './stories/molecules/EmptyState/EmptyState';
export { DatePicker } from './stories/molecules/DatePicker/DatePicker';
export type { DatePickerProps } from './stories/molecules/DatePicker/DatePicker';
export { DatePickerField } from './stories/molecules/DatePickerField/DatePickerField';
export type { DatePickerFieldProps } from './stories/molecules/DatePickerField/DatePickerField';
export { DateTimeField } from './stories/molecules/DateTimeField/DateTimeField';
export type { DateTimeFieldProps } from './stories/molecules/DateTimeField/DateTimeField';
export { Calendar } from './stories/molecules/Calendar/Calendar';
export type { CalendarProps } from './stories/molecules/Calendar/Calendar';
export { CalendarPlanner } from './stories/molecules/CalendarPlanner/CalendarPlanner';
export type { CalendarPlannerProps, PlannerEvent } from './stories/molecules/CalendarPlanner/CalendarPlanner';
export { CalendarRoster } from './stories/molecules/CalendarRoster/CalendarRoster';
export type { CalendarRosterProps, RosterRow, RosterCell, RosterCellType } from './stories/molecules/CalendarRoster/CalendarRoster';
export { ContextMenu } from './stories/molecules/ContextMenu/ContextMenu';
export type { ContextMenuItem, ContextMenuButtonItem, ContextMenuLinkItem, ContextMenuSeparator, ContextMenuProps, ContextMenuRenderLinkProps } from './stories/molecules/ContextMenu/ContextMenu';
export { Card } from './stories/molecules/Card/Card';
export type { CardProps, CardColor } from './stories/molecules/Card/Card';
export { ProjectCard } from './stories/molecules/ProjectCard/ProjectCard';
export { CardSplit } from './stories/molecules/CardSplit/CardSplit';
export { CardSquare } from './stories/molecules/CardSquare/CardSquare';
export { CheckboxField } from './stories/molecules/CheckboxField/CheckboxField';
export { Form } from './stories/molecules/Form/Form';
export { InputField } from './stories/molecules/InputField/InputField';
export { NumberInputField } from './stories/molecules/NumberInputField/NumberInputField';
export type { NumberInputFieldProps } from './stories/molecules/NumberInputField/NumberInputField';
export { FileUploadField } from './stories/molecules/FileUploadField/FileUploadField';
export type { FileUploadFieldProps } from './stories/molecules/FileUploadField/FileUploadField';
export { OtpField } from './stories/molecules/OtpField/OtpField';
export type { OtpFieldProps } from './stories/molecules/OtpField/OtpField';
export { PasswordField } from './stories/molecules/PasswordField/PasswordField';
export type { PasswordFieldProps } from './stories/molecules/PasswordField/PasswordField';
export { Modal } from './stories/molecules/Modal/Modal';
export type { ModalProps } from './stories/molecules/Modal/Modal';
export { InputPhoneField } from './stories/molecules/InputPhoneField/InputPhoneField';
export { Pagination } from './stories/molecules/Pagination/Pagination';
export type { PaginationProps } from './stories/molecules/Pagination/Pagination';
export { PrevNextNav } from './stories/molecules/PrevNextNav/PrevNextNav';
export type { PrevNextNavProps } from './stories/molecules/PrevNextNav/PrevNextNav';
export { OrgSwitcher } from './stories/molecules/OrgSwitcher/OrgSwitcher';
export type { OrgSwitcherProps, OrgOption } from './stories/molecules/OrgSwitcher/OrgSwitcher';
export { RadioField } from './stories/molecules/RadioField/RadioField';
export { SwitcherField } from './stories/molecules/SwitcherField/SwitcherField';
export type { SwitcherFieldProps } from './stories/molecules/SwitcherField/SwitcherField';
export { MultiSelectField } from './stories/molecules/MultiSelectField/MultiSelectField';
export type { MultiSelectFieldProps } from './stories/molecules/MultiSelectField/MultiSelectField';
export { SelectField } from './stories/molecules/SelectField/SelectField';
export type { SelectFieldProps } from './stories/molecules/SelectField/SelectField';
export { SidebarNav } from './stories/molecules/SidebarNav/SidebarNav';
export type { SidebarNavProps, SidebarNavEntry, SidebarNavLinkEntry, SidebarNavGroupEntry, SidebarNavItem, SidebarNavRenderLinkProps } from './stories/molecules/SidebarNav/SidebarNav';
export {
  Table, TableHead, TableBody, TableFooter, TableHeader, TableRow, TableCell,
} from './stories/molecules/Table/Table';
export type { TableProps, TableHeaderProps, TableRowProps, TableCellProps } from './stories/molecules/Table/Table';
export { TextareaField } from './stories/molecules/TextareaField/TextareaField';
export { Toaster } from './stories/molecules/Toast/Toaster';
export type { ToasterProps } from './stories/molecules/Toast/Toaster';
export { toast } from 'sonner';
export { TimeField } from './stories/molecules/TimeField/TimeField';
export type { TimeFieldProps } from './stories/molecules/TimeField/TimeField';
export { UserMenu } from './stories/molecules/UserMenu/UserMenu';
export type { UserMenuProps } from './stories/molecules/UserMenu/UserMenu';
export { AssistantMessage } from './stories/molecules/AssistantMessage/AssistantMessage';
export type { AssistantMessageProps } from './stories/molecules/AssistantMessage/AssistantMessage';
export { ConversationList } from './stories/molecules/ConversationList/ConversationList';
export type { ConversationListProps, ConversationItem } from './stories/molecules/ConversationList/ConversationList';
export { MessageComposer } from './stories/molecules/MessageComposer/MessageComposer';
export type { MessageComposerProps } from './stories/molecules/MessageComposer/MessageComposer';
export { UserMessage } from './stories/molecules/UserMessage/UserMessage';
export type { UserMessageProps } from './stories/molecules/UserMessage/UserMessage';

// ─── Sections ───────────────────────────────────────────────
export { AppShell } from './stories/sections/AppShell/AppShell';
export type { AppShellProps } from './stories/sections/AppShell/AppShell';
export { useSidebar } from './stories/sections/AppShell/SidebarContext';
export type { SidebarContextValue } from './stories/sections/AppShell/SidebarContext';
export { Sidebar } from './stories/sections/Sidebar/Sidebar';
export type { SidebarProps } from './stories/sections/Sidebar/Sidebar';

// ─── Organisms ──────────────────────────────────────────────
export { LoginForm } from './stories/organisms/LoginForm/LoginForm';
export type { LoginFormProps } from './stories/organisms/LoginForm/LoginForm';
export { ProjectCarousel } from './stories/organisms/ProjectCarousel/ProjectCarousel';
export { ProjectGrid } from './stories/organisms/ProjectGrid/ProjectGrid';
export { ReviewCarousel } from './stories/organisms/ReviewCarousel/ReviewCarousel';
export type { Review } from './stories/organisms/ReviewCarousel/ReviewCarousel';
export { Steps } from './stories/organisms/Steps/Steps';
