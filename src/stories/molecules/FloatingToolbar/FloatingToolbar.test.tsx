import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FloatingToolbar, FloatingToolbarButton } from './FloatingToolbar';
import { TooltipProvider } from '../../atoms/Tooltip/Tooltip';
import { Popover } from '../../atoms/Popover/Popover';
import { Icon } from '../../atoms/Icon/Icon';

function barra(props: Partial<React.ComponentProps<typeof FloatingToolbar>> = {}, onBorrar = vi.fn()) {
  return (
    <TooltipProvider>
      <button type="button">Antes</button>
      <FloatingToolbar
        label="Acciones del bloque 1"
        start={<FloatingToolbarButton label="Editar" icon={<Icon name="settings" />} />}
        end={
          <>
            <FloatingToolbarButton label="Subir" icon={<Icon name="chevron-up" />} />
            <FloatingToolbarButton label="Duplicar" icon={<Icon name="copy" />} />
            <FloatingToolbarButton label="Borrar" icon={<Icon name="trash" />} destructive onClick={onBorrar} />
          </>
        }
        {...props}
      >
        <p>Contenido del bloque</p>
      </FloatingToolbar>
    </TooltipProvider>
  );
}

describe('FloatingToolbar', () => {
  it('es un role="toolbar" con su nombre accesible, y el contenido va aparte', () => {
    render(barra());
    const toolbar = screen.getByRole('toolbar', { name: 'Acciones del bloque 1' });
    expect(toolbar).toHaveClass('floating-toolbar__bar');
    expect(screen.getByText('Contenido del bloque').closest('.floating-toolbar__content')).not.toBeNull();
  });

  it('cada botón es un Button ghost sm de solo icono con su aria-label', () => {
    render(barra());
    const borrar = screen.getByRole('button', { name: 'Borrar' });
    expect(borrar).toHaveClass('button', 'button--ghost', 'button--sm', 'button--icon-only', 'button--destructive-intent');
  });

  it('es una sola parada de tabulación y se recorre con flechas', async () => {
    const user = userEvent.setup();
    render(barra());

    await user.tab(); // «Antes»
    await user.tab();
    expect(screen.getByRole('button', { name: 'Editar' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Subir' })).toHaveFocus();
    await user.keyboard('{ArrowRight}{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Borrar' })).toHaveFocus();

    // Tab sale de la barra entera, no pasa por cada botón.
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Antes' })).toHaveFocus();
  });

  it('el clic llega a la acción', async () => {
    const user = userEvent.setup();
    const onBorrar = vi.fn();
    render(barra({}, onBorrar));
    await user.click(screen.getByRole('button', { name: 'Borrar' }));
    expect(onBorrar).toHaveBeenCalledTimes(1);
  });

  it('layout y alwaysVisible salen como modificadores BEM del ancla', () => {
    const { container } = render(barra({ layout: 'sides', alwaysVisible: true, className: 'mio' }));
    const ancla = container.querySelector('.floating-toolbar');
    expect(ancla).toHaveClass('floating-toolbar--sides', 'floating-toolbar--always-visible', 'mio');
    expect(ancla?.className.startsWith('floating-toolbar ')).toBe(true);
  });

  it('auto es el layout por defecto', () => {
    const { container } = render(barra());
    expect(container.querySelector('.floating-toolbar')).toHaveClass('floating-toolbar--auto');
  });

  it('a los lados la barra se recorre en vertical', () => {
    render(barra({ layout: 'sides' }));
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('a los lados las flechas verticales pasan de un raíl al otro', async () => {
    const user = userEvent.setup();
    render(barra({ layout: 'sides' }));
    screen.getByRole('button', { name: 'Editar' }).focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'Subir' })).toHaveFocus();
  });

  it('arriba la barra se recorre en horizontal', () => {
    render(barra({ layout: 'top' }));
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('sin grupo del principio no pinta su contenedor', () => {
    const { container } = render(barra({ start: undefined }));
    expect(container.querySelector('.floating-toolbar__group--start')).toBeNull();
    expect(container.querySelector('.floating-toolbar__group--end')).not.toBeNull();
  });

  it('el botón reenvía ref y sirve de trigger de un Popover', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    render(
      <TooltipProvider>
        <FloatingToolbar
          label="Acciones del bloque 1"
          start={
            <Popover trigger={<FloatingToolbarButton ref={ref} label="Convertir en" icon={<Icon name="retry" />} />}>
              <p>Opciones</p>
            </Popover>
          }
        >
          <p>Contenido</p>
        </FloatingToolbar>
      </TooltipProvider>,
    );
    const convertir = screen.getByRole('button', { name: 'Convertir en' });
    expect(ref.current).toBe(convertir);
    await user.click(convertir);
    expect(await screen.findByText('Opciones')).toBeInTheDocument();
    expect(convertir).toHaveAttribute('data-popup-open');
  });

  it('el ref y el resto de props del componente van al ancla', () => {
    const ref = createRef<HTMLDivElement>();
    render(barra({ ref, id: 'bloque-1' } as never));
    expect(ref.current).toHaveAttribute('id', 'bloque-1');
    expect(ref.current).toHaveClass('floating-toolbar');
  });

  it.each(['top', 'sides'] as const)('toolbarProps llega a la barra, no al ancla (%s)', (layout) => {
    const { container } = render(barra({
      layout,
      toolbarProps: { 'data-editor-ui': '', id: 'barra-1', title: 'Barra' },
    }));
    const toolbar = screen.getByRole('toolbar', { name: 'Acciones del bloque 1' });
    expect(toolbar).toHaveAttribute('data-editor-ui', '');
    expect(toolbar).toHaveAttribute('id', 'barra-1');
    expect(toolbar).toHaveAttribute('title', 'Barra');
    expect(container.querySelector('.floating-toolbar')).not.toHaveAttribute('data-editor-ui');
  });

  it('toolbarProps no pisa la clase, el nombre ni la orientación de la barra', () => {
    render(barra({
      layout: 'sides',
      toolbarProps: { className: 'ajena', 'aria-label': 'Otro', 'aria-orientation': 'horizontal', role: 'menu' } as never,
    }));
    const toolbar = screen.getByRole('toolbar', { name: 'Acciones del bloque 1' });
    expect(toolbar).toHaveClass('floating-toolbar__bar');
    expect(toolbar).not.toHaveClass('ajena');
    expect(toolbar).toHaveAttribute('aria-orientation', 'vertical');
  });
});
