import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

function dosItems(props: Partial<React.ComponentProps<typeof Accordion>> = {}) {
  return (
    <Accordion type="single" {...(props as { type: 'single' })}>
      <AccordionItem value="a">
        <AccordionTrigger>Primero</AccordionTrigger>
        <AccordionContent>Contenido A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Segundo</AccordionTrigger>
        <AccordionContent>Contenido B</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe('Accordion', () => {
  it('monta el patrón WAI-ARIA: botón dentro de heading, aria-expanded y panel region', async () => {
    const user = userEvent.setup();
    render(dosItems());
    const primero = screen.getByRole('button', { name: 'Primero' });

    expect(primero).toHaveAttribute('aria-expanded', 'false');
    expect(primero.closest('h3')).not.toBeNull();

    await user.click(primero);
    expect(primero).toHaveAttribute('aria-expanded', 'true');

    const panelId = primero.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId as string)).toHaveAttribute('role', 'region');
  });

  it('en modo single cierra el ítem anterior al abrir otro', async () => {
    const user = userEvent.setup();
    render(dosItems({ defaultValue: 'a' } as never));
    const primero = screen.getByRole('button', { name: 'Primero' });
    const segundo = screen.getByRole('button', { name: 'Segundo' });

    await user.click(segundo);
    expect(segundo).toHaveAttribute('aria-expanded', 'true');
    expect(primero).toHaveAttribute('aria-expanded', 'false');
  });

  it('emite onValueChange con un string en single y con un array en multiple', async () => {
    const user = userEvent.setup();
    const onSingle = vi.fn();
    const { unmount } = render(
      <Accordion type="single" onValueChange={onSingle}>
        <AccordionItem value="a">
          <AccordionTrigger>Primero</AccordionTrigger>
          <AccordionContent>Contenido A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await user.click(screen.getByRole('button', { name: 'Primero' }));
    expect(onSingle).toHaveBeenCalledWith('a');
    unmount();

    const onMultiple = vi.fn();
    render(
      <Accordion type="multiple" onValueChange={onMultiple}>
        <AccordionItem value="a">
          <AccordionTrigger>Primero</AccordionTrigger>
          <AccordionContent>Contenido A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await user.click(screen.getByRole('button', { name: 'Primero' }));
    expect(onMultiple).toHaveBeenCalledWith(['a']);
  });

  it('con collapsible={false} no cierra el único ítem abierto', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Accordion type="single" collapsible={false} defaultValue="a" onValueChange={onValueChange}>
        <AccordionItem value="a">
          <AccordionTrigger>Primero</AccordionTrigger>
          <AccordionContent>Contenido A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await user.click(screen.getByRole('button', { name: 'Primero' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('no abre un ítem deshabilitado', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single">
        <AccordionItem value="a" disabled>
          <AccordionTrigger>Primero</AccordionTrigger>
          <AccordionContent>Contenido A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole('button', { name: 'Primero' });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
