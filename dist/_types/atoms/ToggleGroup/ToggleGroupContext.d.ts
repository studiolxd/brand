export interface ToggleGroupContextValue {
    /** Talla que el grupo reparte a sus botones. */
    size?: 'sm' | 'md' | 'lg';
}
export declare const ToggleGroupContext: import("react").Context<ToggleGroupContextValue | undefined>;
/** Lo que un `Toggle` hereda del grupo que lo contiene, si lo hay. */
export declare function useToggleGroup(): ToggleGroupContextValue | undefined;
