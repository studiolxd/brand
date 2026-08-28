import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ReactNode } from 'react';
import './Tabs.css';

/* ─── Root ───────────────────────────────────────────────── */
export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: ReactNode;
}

export function Tabs({
  orientation = 'horizontal',
  className,
  children,
  onValueChange,
  ...props
}: TabsProps) {
  return (
    <BaseTabs.Root
      className={['tabs', className].filter(Boolean).join(' ')}
      orientation={orientation}
      onValueChange={onValueChange ? (value) => onValueChange(value as string) : undefined}
      {...props}
    >
      {children}
    </BaseTabs.Root>
  );
}

/* ─── List ───────────────────────────────────────────────── */
export interface TabsListProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: 'underline' | 'pill';
  className?: string;
  children: ReactNode;
}

/**
 * La barra de pestañas. `{...rest}` (`aria-label`, `aria-labelledby`, `id`,
 * `data-*`…) se reenvía al `role="tablist"`: es la forma de darle nombre
 * accesible cuando hay más de un juego de pestañas en la página.
 */
export function TabsList({ variant = 'underline', className, children, ...rest }: TabsListProps) {
  return (
    <BaseTabs.List
      // Base UI activa el tab solo con Enter/Espacio por defecto; el DS mantiene
      // la activación automática al mover el foco con las flechas.
      activateOnFocus
      className={[
        'tabs__list',
        variant === 'pill' && 'tabs__list--pill',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </BaseTabs.List>
  );
}

/* ─── Trigger ────────────────────────────────────────────── */
export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function TabsTrigger({ value, disabled, className, children }: TabsTriggerProps) {
  return (
    <BaseTabs.Tab
      value={value}
      disabled={disabled}
      className={['tabs__trigger', className].filter(Boolean).join(' ')}
    >
      {children}
    </BaseTabs.Tab>
  );
}

/* ─── Content ────────────────────────────────────────────── */
export interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function TabsContent({ value, className, children }: TabsContentProps) {
  return (
    <BaseTabs.Panel
      value={value}
      className={['tabs__content', className].filter(Boolean).join(' ')}
    >
      {children}
    </BaseTabs.Panel>
  );
}
