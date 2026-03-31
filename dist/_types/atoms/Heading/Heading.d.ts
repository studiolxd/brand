import './Heading.css';
type HeadingWeight = 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
interface HeadingProps {
    /** Nivel semántico del encabezado (h1–h6). */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Peso tipográfico. Por defecto hereda el token del nivel (300). */
    weight?: HeadingWeight;
    /** Tamaño tipográfico. Por defecto usa el tamaño del nivel. */
    size?: HeadingSize;
    /** Clases adicionales para el elemento. */
    className?: string;
    children: React.ReactNode;
}
export declare function Heading({ level, weight, size, className, children }: HeadingProps): import("react/jsx-runtime").JSX.Element;
export {};
