import type { ReactNode } from 'react';
import { Popover as BasePopover } from '@base-ui-components/react/popover';
import './Popover.css';

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
}

export function Popover({
  trigger,
  children,
  open,
  defaultOpen,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  sideOffset = 8,
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
    >
      <BasePopover.Trigger render={trigger as React.ReactElement<Record<string, unknown>>} />

      <BasePopover.Portal>
        <BasePopover.Positioner className="popover__positioner" side={side} align={align} sideOffset={sideOffset}>
          <BasePopover.Popup className={['popover', className].filter(Boolean).join(' ')}>
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
