import './Icon.css';
declare const ICONS: {
    readonly arrow: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly chevron: {
        readonly viewBox: "0 0 12 12";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly close: {
        readonly viewBox: "0 0 12 12";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly eye: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly 'eye-off': {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
};
export type IconName = keyof typeof ICONS;
export interface IconProps {
    name: IconName;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}
export declare function Icon({ name, size, className }: IconProps): import("react/jsx-runtime").JSX.Element;
export {};
