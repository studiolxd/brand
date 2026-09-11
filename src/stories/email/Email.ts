/*
 * El correo del sistema, en un solo punto de entrada: `@studiolxd/brand/email`.
 *
 * Va aparte del barril principal (`@studiolxd/brand`) a propósito: estos
 * componentes se construyen sobre `react-email`, que es un peer OPCIONAL. Si
 * colgaran del barril, cualquier app que importe un `Button` tendría que
 * instalar react-email para poder resolver el import.
 */
export { EmailLayout } from './EmailLayout';
export type {
  EmailLayoutProps,
  EmailOptOut,
  EmailOptOutAccount,
  EmailOptOutGuest,
} from './EmailLayout';

export {
  EmailButton,
  EmailCallout,
  EmailCode,
  EmailColumn,
  EmailColumns,
  EmailDivider,
  EmailHeading,
  EmailKeyValue,
  EmailLink,
  EmailList,
  EmailListItem,
  EmailNote,
  EmailQuote,
  EmailSectionTitle,
  EmailTag,
  EmailText,
} from './EmailPrimitives';
export type {
  EmailButtonProps,
  EmailCalloutProps,
  EmailCodeProps,
  EmailColumnProps,
  EmailColumnsProps,
  EmailDividerProps,
  EmailHeadingProps,
  EmailKeyValueProps,
  EmailLinkProps,
  EmailListItemProps,
  EmailListProps,
  EmailNoteProps,
  EmailQuoteProps,
  EmailSectionTitleProps,
  EmailTagProps,
  EmailTextProps,
} from './EmailPrimitives';

export {
  emailAssetsBaseUrl,
  emailFontFamily,
  emailFontFilename,
  emailLogo,
  emailMaxWidth,
  emailPalette,
  emailStyleSheet,
  emailStyles,
  emailTones,
} from './emailTheme';
export type { EmailTone } from './emailTheme';
