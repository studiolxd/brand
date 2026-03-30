import { Country } from 'react-phone-number-input';
import { EmblaOptionsType } from 'embla-carousel';
import { EmblaPluginType } from 'embla-carousel';
import { JSX } from 'react/jsx-runtime';

export declare function Arrow({ size, className }: ArrowProps): JSX.Element;

declare interface ArrowProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export declare function Avatar({ src, alt, className }: AvatarProps): JSX.Element;

declare interface AvatarProps {
    /** URL de la imagen. */
    src: string;
    /** Texto alternativo accesible. */
    alt: string;
    /** Clase adicional. */
    className?: string;
}

export declare function Button({ variant, size, block, children, type, disabled, onClick, }: ButtonProps): JSX.Element;

declare interface ButtonProps {
    /** Visual variant of the button */
    variant?: 'primary' | 'primary-dark' | 'ghost' | 'form';
    /** Size of the button */
    size?: 'sm' | 'md' | 'lg';
    /** Stretches the button to full container width */
    block?: boolean;
    /** Button label */
    children: React.ReactNode;
    /** HTML button type */
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export declare function Card({ href, title, description, ctaLabel, color }: CardProps): JSX.Element;

declare type CardColor = 'secondary' | 'tertiary' | 'quaternary' | 'quinary';

declare interface CardProps {
    /** URL de destino — todo el bloque es clicable. */
    href: string;
    /** Título de la tarjeta. */
    title: string;
    /** Descripción. */
    description: string;
    /** Texto accesible del CTA (visually-hidden). */
    ctaLabel: string;
    /** Color de fondo. */
    color: CardColor;
}

declare type CardProps_2 = React.ComponentPropsWithoutRef<typeof Card>;

export declare function CardSplit({ href, title, description, ctaLabel, color, image }: CardSplitProps): JSX.Element;

declare interface CardSplitImage {
    src: string;
    alt: string;
}

declare interface CardSplitProps {
    /** URL de destino — todo el bloque es clicable. */
    href: string;
    /** Título de la tarjeta. */
    title: string;
    /** Descripción — oculta por defecto, visible al hacer hover. */
    description: string;
    /** Texto accesible del CTA (visually-hidden). */
    ctaLabel: string;
    /** Color del panel izquierdo. */
    color: CardColor;
    /** Fotografía del panel derecho. */
    image: CardSplitImage;
}

export declare function CardSquare({ href, title, description, ctaLabel, color, image }: CardSquareProps): JSX.Element;

declare interface CardSquareImage {
    src: string;
    alt: string;
}

declare interface CardSquareProps {
    /** URL de destino — todo el bloque es clicable. */
    href: string;
    /** Título de la tarjeta. */
    title: string;
    /** Descripción — oculta por defecto, visible al hacer hover. */
    description: string;
    /** Texto accesible del CTA (visually-hidden). */
    ctaLabel: string;
    /** Color del overlay en hover. */
    color: CardColor;
    /** Imagen de fondo. */
    image: CardSquareImage;
}

export declare function Carousel({ children, options, plugins, hideButtons, className, slideSize, gradientColor }: CarouselProps): JSX.Element;

declare interface CarouselProps {
    children: React.ReactNode;
    /** Opciones de Embla Carousel */
    options?: EmblaOptionsType;
    /** Plugins de Embla (e.g. AutoScroll) */
    plugins?: EmblaPluginType[];
    /** Oculta los botones prev/next */
    hideButtons?: boolean;
    /** Clase adicional para el wrapper exterior */
    className?: string;
    /**
     * Tamaño de cada slide como flex-basis.
     * Sobreescribe --carousel-slide-size en el wrapper.
     * Ejemplo: 'calc(100% / 1.5)', '80%', '300px'
     */
    slideSize?: string;
    /**
     * Color de fondo sobre el que se dibuja el degradado de los botones.
     * Por defecto hereda --color-background-default.
     * Útil en secciones con fondo oscuro o de color.
     */
    gradientColor?: string;
}

export declare function Checkbox({ checked, defaultChecked, disabled, id, name, value, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, onChange, }: CheckboxProps): JSX.Element;

export declare function CheckboxField({ label, checked, defaultChecked, disabled, id, name, value, onChange, }: CheckboxFieldProps): JSX.Element;

declare interface CheckboxFieldProps {
    label: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

declare interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export declare function Chevron({ size, className }: ChevronProps): JSX.Element;

declare interface ChevronProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

declare interface Client {
    /** Identificador único. */
    id: string;
    /** Nombre del cliente — usado como alt de la imagen. */
    name: string;
    /** URL del logotipo. */
    logo: string;
}

export declare function ClientsSection({ title, clients }: ClientsSectionProps): JSX.Element;

declare interface ClientsSectionProps {
    /** Título de la sección. */
    title?: string;
    /** Lista de clientes. */
    clients: Client[];
}

export declare function ContactForm({ emailPlaceholder, messagePlaceholder, messageRows, privacyLabel, buttonLabel, submitting, submittingLabel, errors, success, successMessage, onSubmit, }: ContactFormProps): JSX.Element;

declare interface ContactFormProps {
    emailPlaceholder?: string;
    messagePlaceholder?: string;
    messageRows?: number;
    privacyLabel: React.ReactNode;
    buttonLabel?: string;
    submitting?: boolean;
    submittingLabel?: string;
    errors?: string[];
    success?: boolean;
    successMessage?: string;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

declare type ContactFormProps_2 = React.ComponentPropsWithoutRef<typeof ContactForm>;

export declare function ContactSection({ title, form, whatsappTitle, whatsappLabel, whatsappHref, }: ContactSectionProps): JSX.Element;

declare interface ContactSectionProps {
    /** Título del bloque de contacto. */
    title: string;
    /** Props del formulario de contacto. */
    form: ContactFormProps_2;
    /** Título del bloque de WhatsApp. */
    whatsappTitle: string;
    /** Texto del enlace de WhatsApp. */
    whatsappLabel: string;
    /** URL del enlace de WhatsApp. */
    whatsappHref: string;
}

export declare function Footer(): JSX.Element;

export declare function Form({ errors, onSubmit, actions, children }: FormProps): JSX.Element;

declare interface FormProps {
    errors?: string[];
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

export declare function Hamburger({ isOpen, onClick, label, }: HamburgerProps): JSX.Element;

declare interface HamburgerProps {
    isOpen?: boolean;
    onClick?: () => void;
    label?: string;
}

export declare function Header({ navItems, featuredLink, actions, logoHref, logoLabel, navLabel, dark, }: HeaderProps): JSX.Element;

declare interface HeaderProps {
    navItems: NavItem[];
    featuredLink?: NavItem;
    actions?: React.ReactNode;
    logoHref?: string;
    logoLabel?: string;
    navLabel?: string;
    dark?: boolean;
}

export declare function Heading({ level, children }: HeadingProps): JSX.Element;

declare interface HeadingProps {
    /** Nivel semántico del encabezado (h1–h6). */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
}

export declare function HighlightSection({ text, align, textAlign, className }: HighlightSectionProps): JSX.Element;

declare interface HighlightSectionProps {
    /** Texto destacado. */
    text: string;
    /** Alineación horizontal del bloque de texto. */
    align?: 'left' | 'center' | 'right';
    /** Alineación del texto dentro del bloque. */
    textAlign?: 'left' | 'center' | 'right';
    /** Clases adicionales para el container. */
    className?: string;
}

export declare function Home(): JSX.Element;

export declare function Input({ type, placeholder, value, defaultValue, disabled, readOnly, size, error, id, name, describedBy, onChange, onBlur, onFocus, }: InputProps): JSX.Element;

export declare function InputField({ id, label, labelHidden, name, type, placeholder, value, defaultValue, disabled, readOnly, error, errorMessage, helperText, onChange, onBlur, onFocus, }: InputFieldProps): JSX.Element;

declare interface InputFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    name?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export declare function InputPhone({ value, defaultCountry, placeholder, disabled, error, dark, id, name, describedBy, onChange, onBlur, }: InputPhoneProps): JSX.Element;

export declare function InputPhoneField({ id, value, defaultCountry, placeholder, disabled, error, errorMessage, helperText, dark, name, onChange, onBlur, }: InputPhoneFieldProps): JSX.Element;

declare interface InputPhoneFieldProps {
    id: string;
    value?: string;
    defaultCountry?: Country;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    dark?: boolean;
    name?: string;
    onChange?: (value: string | undefined) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

declare interface InputPhoneProps {
    value?: string;
    defaultCountry?: Country;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    dark?: boolean;
    id?: string;
    name?: string;
    describedBy?: string;
    onChange?: (value: string | undefined) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

declare interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    id?: string;
    name?: string;
    describedBy?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export declare function Label({ htmlFor, children, hidden }: LabelProps): JSX.Element;

declare interface LabelProps {
    htmlFor: string;
    children: React.ReactNode;
    hidden?: boolean;
}

export declare function Legal({ title, sections }: LegalProps): JSX.Element;

declare interface LegalProps {
    /** Título de la página legal. */
    title: string;
    /** Secciones de contenido en acordeón. */
    sections: LegalSection[];
}

declare interface LegalSection {
    title: string;
    content: React.ReactNode;
}

export declare function Link({ href, children, external }: LinkProps): JSX.Element;

declare interface LinkProps {
    /** URL de destino. */
    href: string;
    children: React.ReactNode;
    /** Abre el enlace en una nueva pestaña con rel seguro. */
    external?: boolean;
}

export declare function List({ type, children }: ListProps): JSX.Element;

declare interface ListProps {
    /** Tipo de lista: con viñetas o numerada. */
    type?: 'unordered' | 'ordered';
    children: React.ReactNode;
}

export declare function Logo({ width, height, className }: LogoProps): JSX.Element;

declare interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
}

export declare function MethodologySection({ intro, ctaLabel, ctaHref, steps, }: MethodologySectionProps): JSX.Element;

declare interface MethodologySectionProps {
    /** Párrafo introductorio. */
    intro: string;
    /** Texto del botón CTA. */
    ctaLabel: string;
    /** URL del botón CTA. */
    ctaHref: string;
    /** Lista de pasos (normalmente 4). */
    steps: MethodologyStep[];
}

declare interface MethodologyStep {
    /** Texto del paso. */
    text: string;
}

declare interface NavItem {
    label: string;
    href: string;
}

export declare function NewsletterForm({ emailPlaceholder, privacyLabel, buttonLabel, submitting, submittingLabel, errors, success, successMessage, onSubmit, }: NewsletterFormProps): JSX.Element;

declare interface NewsletterFormProps {
    emailPlaceholder?: string;
    privacyLabel: React.ReactNode;
    buttonLabel?: string;
    submitting?: boolean;
    submittingLabel?: string;
    errors?: string[];
    success?: boolean;
    successMessage?: string;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export declare function Paragraph({ size, children }: ParagraphProps): JSX.Element;

declare interface ParagraphProps {
    /** Tamaño del texto del párrafo. */
    size?: 'small' | 'default' | 'large';
    children: React.ReactNode;
}

export declare function Project({ category, tagVariant, photo, photoAlt, title, description, sections, }: ProjectProps): JSX.Element;

declare interface Project_2 {
    /** Identificador único. */
    id: string;
    /** Categoría — se muestra como tag. */
    category: string;
    /** Variante de color del tag. */
    tagVariant?: TagVariant_2;
    /** URL de la imagen. */
    photo: string;
    /** Texto alternativo de la imagen. */
    photoAlt?: string;
    /** Título del proyecto. */
    title: string;
    /** Descripción breve. */
    description: string;
    /** URL de destino del proyecto. */
    href?: string;
}

declare interface ProjectProps {
    /** Categoría del proyecto. */
    category: string;
    /** Variante de color del tag de categoría. */
    tagVariant?: TagVariant_3;
    /** URL de la imagen destacada. */
    photo: string;
    /** Texto alternativo de la imagen. */
    photoAlt?: string;
    /** Título del proyecto. */
    title: string;
    /** Párrafo introductorio. */
    description: string;
    /** Secciones de contenido. */
    sections: ProjectSection[];
}

declare interface ProjectSection {
    title: string;
    body: string;
}

export declare function ProjectsSection({ title, projects }: ProjectsSectionProps): JSX.Element;

declare interface ProjectsSectionProps {
    /** Título de la sección. */
    title?: string;
    /** Lista de proyectos. */
    projects: Project_2[];
}

declare interface Review {
    /** Identificador único. */
    id: string;
    /** URL de la foto del autor. */
    photo: string;
    /** Nombre del autor. */
    author: string;
    /** Cargo o rol del autor. */
    role: string;
    /** Texto del testimonio. */
    quote: string;
}

export declare function ReviewsSection({ title, reviews }: ReviewsSectionProps): JSX.Element;

declare interface ReviewsSectionProps {
    /** Título de la sección. */
    title?: string;
    /** Lista de opiniones. */
    reviews: Review[];
}

export declare function Select({ options, value, defaultValue, placeholder, disabled, dark, onValueChange, id, }: SelectProps): JSX.Element;

declare interface SelectOption {
    value: string;
    label: string;
}

declare interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    dark?: boolean;
    onValueChange?: (value: string) => void;
    id?: string;
}

export declare function SolutionsSection({ items }: SolutionsSectionProps): JSX.Element;

declare interface SolutionsSectionProps {
    /** Lista de tarjetas a mostrar. */
    items: CardProps_2[];
}

export declare function Tag({ variant, children }: TagProps): JSX.Element;

declare interface TagProps {
    /** Variante de color del tag. */
    variant?: TagVariant;
    /** Contenido del tag. */
    children: React.ReactNode;
}

declare type TagVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';

declare type TagVariant_2 = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';

declare type TagVariant_3 = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';

export declare function Textarea({ placeholder, value, defaultValue, rows, disabled, readOnly, error, id, name, describedBy, onChange, onBlur, onFocus, }: TextareaProps): JSX.Element;

export declare function TextareaField({ id, label, labelHidden, name, placeholder, value, defaultValue, rows, disabled, readOnly, error, errorMessage, helperText, onChange, onBlur, onFocus, }: TextareaFieldProps): JSX.Element;

declare interface TextareaFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    name?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    rows?: number;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}

declare interface TextareaProps {
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    rows?: number;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    id?: string;
    name?: string;
    describedBy?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}

export { }
