/*
 * El correo del sistema, en un solo punto de entrada: `@studiolxd/brand/email`.
 *
 * Va aparte del barril principal (`@studiolxd/brand`) a propósito: estos
 * componentes se construyen sobre `react-email`, que es un peer OPCIONAL. Si
 * colgaran del barril, cualquier app que importe un `Button` tendría que
 * instalar react-email para poder resolver el import.
 */
export { EmailLayout } from './EmailLayout';
export type { EmailLayoutProps, EmailOptOut } from './EmailLayout';

export { EmailButton, EmailHeading, EmailLink, EmailNote, EmailText } from './EmailPrimitives';
export type {
  EmailButtonProps,
  EmailHeadingProps,
  EmailLinkProps,
  EmailNoteProps,
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
} from './emailTheme';
