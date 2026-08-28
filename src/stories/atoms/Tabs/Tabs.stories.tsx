import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Paragraph } from '../Paragraph/Paragraph';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const PorDefecto: Story = {
  name: 'Por defecto',
  render: () => (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Paragraph>Configuración general de la cuenta: nombre, correo, zona horaria y preferencias de idioma.</Paragraph>
      </TabsContent>
      <TabsContent value="seguridad">
        <Paragraph>Gestión de contraseña, autenticación en dos pasos y sesiones activas.</Paragraph>
      </TabsContent>
      <TabsContent value="notificaciones">
        <Paragraph>Elige qué notificaciones quieres recibir y por qué canales.</Paragraph>
      </TabsContent>
    </Tabs>
  ),
};

export const Pill: Story = {
  name: 'Variante pill',
  render: () => (
    <Tabs defaultValue="mes">
      <TabsList variant="pill">
        <TabsTrigger value="semana">Semana</TabsTrigger>
        <TabsTrigger value="mes">Mes</TabsTrigger>
        <TabsTrigger value="año">Año</TabsTrigger>
      </TabsList>
      <TabsContent value="semana">
        <Paragraph>Datos de la última semana.</Paragraph>
      </TabsContent>
      <TabsContent value="mes">
        <Paragraph>Datos del último mes.</Paragraph>
      </TabsContent>
      <TabsContent value="año">
        <Paragraph>Datos del último año.</Paragraph>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  name: 'Orientación vertical',
  render: () => (
    <Tabs defaultValue="perfil" orientation="vertical">
      <TabsList>
        <TabsTrigger value="perfil">Perfil</TabsTrigger>
        <TabsTrigger value="equipo">Equipo</TabsTrigger>
        <TabsTrigger value="facturacion">Facturación</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
      </TabsList>
      <TabsContent value="perfil">
        <Paragraph>Información personal: foto de perfil, nombre y descripción.</Paragraph>
      </TabsContent>
      <TabsContent value="equipo">
        <Paragraph>Gestión de miembros del equipo y sus permisos.</Paragraph>
      </TabsContent>
      <TabsContent value="facturacion">
        <Paragraph>Plan actual, historial de facturas y método de pago.</Paragraph>
      </TabsContent>
      <TabsContent value="api">
        <Paragraph>Claves de API y webhooks para integraciones externas.</Paragraph>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  name: 'Controlado',
  render: () => {
    const tabs = ['diseño', 'desarrollo', 'qa'];
    const [active, setActive] = useState('diseño');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {tabs.map((tab) => (
            <Button key={tab} size="sm" onClick={() => setActive(tab)}>
              Ir a {tab}
            </Button>
          ))}
        </div>
        <Tabs value={active} onValueChange={setActive}>
          <TabsList>
            <TabsTrigger value="diseño">Diseño</TabsTrigger>
            <TabsTrigger value="desarrollo">Desarrollo</TabsTrigger>
            <TabsTrigger value="qa">QA</TabsTrigger>
          </TabsList>
          <TabsContent value="diseño">
            <Paragraph>Artefactos de diseño: wireframes, prototipos y componentes Figma.</Paragraph>
          </TabsContent>
          <TabsContent value="desarrollo">
            <Paragraph>Código fuente, pull requests abiertos y cobertura de tests.</Paragraph>
          </TabsContent>
          <TabsContent value="qa">
            <Paragraph>Casos de prueba, bugs reportados y estado de regresiones.</Paragraph>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  name: 'Con tab deshabilitado',
  render: () => (
    <Tabs defaultValue="activo">
      <TabsList>
        <TabsTrigger value="activo">Activo</TabsTrigger>
        <TabsTrigger value="deshabilitado" disabled>
          Sin acceso
        </TabsTrigger>
        <TabsTrigger value="otro">Otro</TabsTrigger>
      </TabsList>
      <TabsContent value="activo">
        <Paragraph>Este tab está activo y accesible.</Paragraph>
      </TabsContent>
      <TabsContent value="deshabilitado">
        <Paragraph>Este contenido no debería ser accesible.</Paragraph>
      </TabsContent>
      <TabsContent value="otro">
        <Paragraph>Un tercer tab disponible.</Paragraph>
      </TabsContent>
    </Tabs>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Tabs defaultValue="mes">
        <TabsList variant="pill">
          <TabsTrigger value="semana">Semana</TabsTrigger>
          <TabsTrigger value="mes">Mes</TabsTrigger>
          <TabsTrigger value="año">Año</TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  ),
};

export const TestContrato: Story = {
  name: 'Test — rol, activación y teclado',
  tags: ['!dev'],
  render: () => (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Paragraph>Contenido general.</Paragraph>
      </TabsContent>
      <TabsContent value="seguridad">
        <Paragraph>Contenido de seguridad.</Paragraph>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const general = canvas.getByRole('tab', { name: 'General' });
    const seguridad = canvas.getByRole('tab', { name: 'Seguridad' });

    await expect(general).toHaveAttribute('aria-selected', 'true');
    await expect(seguridad).toHaveAttribute('aria-selected', 'false');

    general.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(seguridad).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByText('Contenido de seguridad.')).toBeVisible();
  },
};

/**
 * Con más de un juego de pestañas en la página, cada barra necesita nombre:
 * `aria-label` (o `aria-labelledby`) va directo al `role="tablist"`.
 */
export const ListaConNombre: Story = {
  name: 'Lista con nombre accesible',
  render: () => (
    <Tabs defaultValue="general">
      <TabsList aria-label="Ajustes de la cuenta">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Paragraph>Contenido general.</Paragraph>
      </TabsContent>
      <TabsContent value="seguridad">
        <Paragraph>Contenido de seguridad.</Paragraph>
      </TabsContent>
    </Tabs>
  ),
};

export const ContratoListaPassthrough: Story = {
  name: 'Test — TabsList reenvía aria-*, id y data-*',
  tags: ['!dev'],
  render: () => (
    <Tabs defaultValue="general">
      <TabsList aria-label="Ajustes de la cuenta" id="barra" data-zona="ajustes">
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Paragraph>Contenido general.</Paragraph>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const lista = within(canvasElement).getByRole('tablist', { name: 'Ajustes de la cuenta' });
    await expect(lista).toHaveClass('tabs__list');
    await expect(lista).toHaveAttribute('id', 'barra');
    await expect(lista).toHaveAttribute('data-zona', 'ajustes');
  },
};
