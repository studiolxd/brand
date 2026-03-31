/**
 * Datos de contenido de la página Home.
 * Importado tanto por Home.tsx como por las stories de cada sección.
 */
export declare const reviews: {
    id: string;
    photo: string;
    author: string;
    role: string;
    quote: string;
}[];
export declare const projects: ({
    id: string;
    category: string;
    tagVariant: "secondary";
    photo: string;
    title: string;
    description: string;
} | {
    id: string;
    category: string;
    tagVariant: "tertiary";
    photo: string;
    title: string;
    description: string;
} | {
    id: string;
    category: string;
    tagVariant: "quaternary";
    photo: string;
    title: string;
    description: string;
} | {
    id: string;
    category: string;
    tagVariant: "quinary";
    photo: string;
    title: string;
    description: string;
} | {
    id: string;
    category: string;
    tagVariant: "primary";
    photo: string;
    title: string;
    description: string;
})[];
export declare const clients: {
    id: string;
    name: string;
    logo: string;
}[];
export declare const steps: {
    text: string;
}[];
export declare const solutionItems: ({
    href: string;
    color: "secondary";
    title: string;
    description: string;
    ctaLabel: string;
} | {
    href: string;
    color: "tertiary";
    title: string;
    description: string;
    ctaLabel: string;
})[];
export declare const privacyLabel: import("react/jsx-runtime").JSX.Element;
export declare const contactArgs: {
    title: string;
    form: {
        privacyLabel: import("react/jsx-runtime").JSX.Element;
        emailPlaceholder: string;
        messagePlaceholder: string;
        buttonLabel: string;
        submittingLabel: string;
        successMessage: string;
    };
    whatsappTitle: string;
    whatsappLabel: string;
    whatsappHref: string;
};
