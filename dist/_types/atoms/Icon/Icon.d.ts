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
    readonly dot: {
        readonly viewBox: "0 0 24 24";
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
    readonly briefcase: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly 'chart-infographic': {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly dashboard: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly headset: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly 'layout-kanban': {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly 'report-money': {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly 'shield-lock': {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly sparkles: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly 'users-group': {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly folder: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly search: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
    readonly retry: {
        readonly viewBox: "0 0 24 24";
        readonly render: () => import("react/jsx-runtime").JSX.Element;
    };
};
export type IconName = keyof typeof ICONS;
export declare const ICON_NAMES: IconName[];
export interface IconProps {
    name: IconName;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}
export declare function Icon({ name, size, className }: IconProps): import("react/jsx-runtime").JSX.Element;
export {};
