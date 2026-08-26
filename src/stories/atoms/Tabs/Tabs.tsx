import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
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
export interface TabsListProps {
  variant?: 'underline' | 'pill';
  className?: string;
  children: ReactNode;
}

export function TabsList({ variant = 'underline', className, children }: TabsListProps) {
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
