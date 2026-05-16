// Tokens & base styles — importado como side-effect para que Vite lo incluya en el CSS bundle
import './index.css';

// ─── Atoms ───────────────────────────────────────────────────
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './stories/atoms/Accordion/Accordion';
export { Arrow } from './stories/atoms/Arrow/Arrow';
export { Avatar } from './stories/atoms/Avatar/Avatar';
export { Button } from './stories/atoms/Button/Button';
export type { ButtonProps } from './stories/atoms/Button/Button';
export { Carousel } from './stories/atoms/Carousel/Carousel';
export { Checkbox } from './stories/atoms/Checkbox/Checkbox';
export { Chevron } from './stories/atoms/Chevron/Chevron';
export { DotsButton } from './stories/atoms/DotsButton/DotsButton';
export type { DotsButtonProps } from './stories/atoms/DotsButton/DotsButton';
export { Hamburger } from './stories/atoms/Hamburger/Hamburger';
export { Heading } from './stories/atoms/Heading/Heading';
export { HeroVideo } from './stories/atoms/HeroVideo/HeroVideo';
export { Highlight } from './stories/atoms/Highlight/Highlight';
export { Input } from './stories/atoms/Input/Input';
export { InputPhone } from './stories/atoms/InputPhone/InputPhone';
export { Label } from './stories/atoms/Label/Label';
export { Link } from './stories/atoms/Link/Link';
export { List } from './stories/atoms/List/List';
export { Logo } from './stories/atoms/Logo/Logo';
export { Paragraph } from './stories/atoms/Paragraph/Paragraph';
export { Popover } from './stories/atoms/Popover/Popover';
export type { PopoverProps } from './stories/atoms/Popover/Popover';
export { Radio } from './stories/atoms/Radio/Radio';
export { Select } from './stories/atoms/Select/Select';
export { SkipLink } from './stories/atoms/SkipLink/SkipLink';
export { Tag } from './stories/atoms/Tag/Tag';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './stories/atoms/Tabs/Tabs';
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './stories/atoms/Tabs/Tabs';
export { Textarea } from './stories/atoms/Textarea/Textarea';
export { VisuallyHidden } from './stories/atoms/VisuallyHidden/VisuallyHidden';

// ─── Molecules ───────────────────────────────────────────────
export { Breadcrumb } from './stories/molecules/Breadcrumb/Breadcrumb';
export type { BreadcrumbItem, BreadcrumbProps, BreadcrumbRenderLinkProps } from './stories/molecules/Breadcrumb/Breadcrumb';
export { ContextMenu } from './stories/molecules/ContextMenu/ContextMenu';
export type { ContextMenuItem, ContextMenuButtonItem, ContextMenuLinkItem, ContextMenuSeparator, ContextMenuProps, ContextMenuRenderLinkProps } from './stories/molecules/ContextMenu/ContextMenu';
export { Card } from './stories/molecules/Card/Card';
export { ProjectCard } from './stories/molecules/ProjectCard/ProjectCard';
export { CardSplit } from './stories/molecules/CardSplit/CardSplit';
export { CardSquare } from './stories/molecules/CardSquare/CardSquare';
export { CheckboxField } from './stories/molecules/CheckboxField/CheckboxField';
export { Form } from './stories/molecules/Form/Form';
export { InputField } from './stories/molecules/InputField/InputField';
export { Modal } from './stories/molecules/Modal/Modal';
export type { ModalProps } from './stories/molecules/Modal/Modal';
export { InputPhoneField } from './stories/molecules/InputPhoneField/InputPhoneField';
export { Pagination } from './stories/molecules/Pagination/Pagination';
export type { PaginationProps } from './stories/molecules/Pagination/Pagination';
export { OrgSwitcher } from './stories/molecules/OrgSwitcher/OrgSwitcher';
export type { OrgSwitcherProps, OrgOption } from './stories/molecules/OrgSwitcher/OrgSwitcher';
export { RadioField } from './stories/molecules/RadioField/RadioField';
export { SelectField } from './stories/molecules/SelectField/SelectField';
export type { SelectFieldProps } from './stories/molecules/SelectField/SelectField';
export { SidebarNav } from './stories/molecules/SidebarNav/SidebarNav';
export type { SidebarNavProps, SidebarNavEntry, SidebarNavLinkEntry, SidebarNavGroupEntry, SidebarNavItem, SidebarNavRenderLinkProps } from './stories/molecules/SidebarNav/SidebarNav';
export { Table } from './stories/molecules/Table/Table';
export type { TableProps, TableHeaderProps, TableRowProps } from './stories/molecules/Table/Table';
export { TextareaField } from './stories/molecules/TextareaField/TextareaField';
export { UserMenu } from './stories/molecules/UserMenu/UserMenu';
export type { UserMenuProps } from './stories/molecules/UserMenu/UserMenu';

// ─── Sections ───────────────────────────────────────────────
export { AppShell } from './stories/sections/AppShell/AppShell';
export type { AppShellProps } from './stories/sections/AppShell/AppShell';
export { useSidebar } from './stories/sections/AppShell/SidebarContext';
export type { SidebarContextValue } from './stories/sections/AppShell/SidebarContext';
export { Sidebar } from './stories/sections/Sidebar/Sidebar';
export type { SidebarProps } from './stories/sections/Sidebar/Sidebar';

// ─── Organisms ──────────────────────────────────────────────
export { ProjectCarousel } from './stories/organisms/ProjectCarousel/ProjectCarousel';
export { ProjectGrid } from './stories/organisms/ProjectGrid/ProjectGrid';
export { ReviewCarousel } from './stories/organisms/ReviewCarousel/ReviewCarousel';
export type { Review } from './stories/organisms/ReviewCarousel/ReviewCarousel';
export { Steps } from './stories/organisms/Steps/Steps';
