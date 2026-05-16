import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Default: Story = {
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
