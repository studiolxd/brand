import * as RadixTabs from '@radix-ui/react-tabs';
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
  ...props
}: TabsProps) {
  return (
    <RadixTabs.Root
      className={['tabs', className].filter(Boolean).join(' ')}
      orientation={orientation}
      {...props}
    >
      {children}
    </RadixTabs.Root>
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
    <RadixTabs.List
      className={[
        'tabs__list',
        variant === 'pill' && 'tabs__list--pill',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </RadixTabs.List>
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
    <RadixTabs.Trigger
      value={value}
      disabled={disabled}
      className={['tabs__trigger', className].filter(Boolean).join(' ')}
    >
      {children}
    </RadixTabs.Trigger>
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
    <RadixTabs.Content
      value={value}
      className={['tabs__content', className].filter(Boolean).join(' ')}
    >
      {children}
    </RadixTabs.Content>
  );
}
