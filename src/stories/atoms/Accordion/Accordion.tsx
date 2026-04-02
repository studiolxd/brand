import * as RadixAccordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';
import { Chevron } from '../Chevron/Chevron';
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

type AccordionRootProps = (AccordionSingleProps | AccordionMultipleProps) & {
  id?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export function Accordion({ className, children, ...props }: AccordionRootProps) {
  const rootProps = props.type === 'single'
    ? { ...props, collapsible: props.collapsible ?? true }
    : props;

  return (
    <RadixAccordion.Root
      className={['accordion', className].filter(Boolean).join(' ')}
      {...rootProps}
    >
      {children}
    </RadixAccordion.Root>
  );
}

/* ─── Item ───────────────────────────────────────────────── */
interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function AccordionItem({ className, children, ...props }: AccordionItemProps) {
  return (
    <RadixAccordion.Item
      className={['accordion__item', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </RadixAccordion.Item>
  );
}

/* ─── Trigger ────────────────────────────────────────────── */
interface AccordionTriggerProps {
  className?: string;
  children: ReactNode;
}

export function AccordionTrigger({ className, children }: AccordionTriggerProps) {
  return (
    <RadixAccordion.Header className="accordion__header">
      <RadixAccordion.Trigger
        className={['accordion__trigger', className].filter(Boolean).join(' ')}
      >
        <span className="accordion__trigger-text">{children}</span>
        <Chevron className="accordion__chevron" size="sm" />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
}

/* ─── Content ────────────────────────────────────────────── */
interface AccordionContentProps {
  className?: string;
  children: ReactNode;
}

export function AccordionContent({ className, children }: AccordionContentProps) {
  return (
    <RadixAccordion.Content
      className={['accordion__content', className].filter(Boolean).join(' ')}
    >
      <div className="accordion__content-inner">
        {children}
      </div>
    </RadixAccordion.Content>
  );
}
