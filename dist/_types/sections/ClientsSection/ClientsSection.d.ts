import './ClientsSection.css';
interface Client {
    /** Identificador único. */
    id: string;
    /** Nombre del cliente — usado como alt de la imagen. */
    name: string;
    /** URL del logotipo. */
    logo: string;
}
interface ClientsSectionProps {
    /** Título de la sección. */
    title?: string;
    /** Lista de clientes. */
    clients: Client[];
}
export declare function ClientsSection({ title, clients }: ClientsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
