import { Accordion as BaseAccordion } from '@base-ui-components/react/accordion';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import './Accordion.css';

/* ─── Single ─────────────────────────────────────────────── */
interface AccordionSingleProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Permite cerrar todos los items (por defecto true). */
  collapsible?: boolean;
}

/* ─── Multiple ───────────────────────────────────────────── */
interface AccordionMultipleProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  collapsible?: never;
}

export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) & {
  id?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

/** Normaliza el valor de la API pública (string | string[]) al array de Base UI. */
function toArray(value: string | string[] | undefined): string[] | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value;
  return value === '' ? [] : [value];
}

export function Accordion({ className, children, id, disabled, ...props }: AccordionProps) {
  const multiple = props.type === 'multiple';
  const collapsible = props.type === 'single' ? props.collapsible ?? true : true;
  const openValue = props.value;

  const handleValueChange = (next: BaseAccordion.Root.Props['value']) => {
    const values = (next ?? []) as string[];
    if (multiple) {
      (props as AccordionMultipleProps).onValueChange?.(values);
      return;
    }
    // `collapsible={false}`: Base UI no lo cubre, así que ignoramos el cierre del
    // único item abierto (misma conducta que el `collapsible` de la API previa).
    if (!collapsible && values.length === 0) return;
    (props as AccordionSingleProps).onValueChange?.(values[0] ?? '');
  };

  return (
    <BaseAccordion.Root
      id={id}
      disabled={disabled}
      multiple={multiple}
      value={toArray(openValue)}
      defaultValue={toArray(props.defaultValue)}
      onValueChange={handleValueChange}
      className={['accordion', className].filter(Boolean).join(' ')}
    >
      {children}
    </BaseAccordion.Root>
  );
}

/* ─── Item ───────────────────────────────────────────────── */
export interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function AccordionItem({ className, children, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={['accordion__item', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </BaseAccordion.Item>
  );
}

/* ─── Trigger ────────────────────────────────────────────── */
export interface AccordionTriggerProps {
  className?: string;
  /** Tamaño del chevron indicador. */
  chevronSize?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function AccordionTrigger({ className, chevronSize = 'sm', children }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="accordion__header">
      <BaseAccordion.Trigger
        className={['accordion__trigger', className].filter(Boolean).join(' ')}
      >
        <span className="accordion__trigger-text">{children}</span>
        <Icon name="chevron" className="accordion__chevron" size={chevronSize} />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

/* ─── Content ────────────────────────────────────────────── */
export interface AccordionContentProps {
  className?: string;
  children: ReactNode;
}

export function AccordionContent({ className, children }: AccordionContentProps) {
  return (
    <BaseAccordion.Panel
      className={['accordion__content', className].filter(Boolean).join(' ')}
    >
      <div className="accordion__content-inner">
        {children}
      </div>
    </BaseAccordion.Panel>
  );
}
