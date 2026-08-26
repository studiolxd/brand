import { Icon } from '../../atoms/Icon/Icon';
import type { SidebarNavEntry } from '../../molecules/SidebarNav/SidebarNav';

export const navEntries: SidebarNavEntry[] = [
  { kind: 'link', id: 'home', label: 'Inicio', href: '#inicio', active: true, icon: <Icon name="dashboard" size="sm" /> },
  {
    kind: 'group', id: 'workspace', label: 'Espacio de trabajo', href: '#espacio', icon: <Icon name="folder" size="sm" />,
    items: [
      { id: 'projects', label: 'Proyectos', href: '#proyectos' },
      { id: 'tasks', label: 'Tareas', href: '#tareas' },
      { id: 'files', label: 'Archivos', href: '#archivos' },
    ],
  },
  {
    kind: 'group', id: 'people', label: 'Personas', icon: <Icon name="users-group" size="sm" />,
    items: [
      { id: 'team', label: 'Equipo', href: '#equipo' },
      { id: 'roles', label: 'Roles', href: '#roles' },
    ],
  },
  {
    kind: 'group', id: 'settings', label: 'Configuración', href: '#configuracion', icon: <Icon name="settings" size="sm" />,
    items: [
      { id: 'billing', label: 'Facturación', href: '#facturacion' },
      { id: 'integrations', label: 'Integraciones', href: '#integraciones' },
    ],
  },
];

export const orgs = [
  { id: 'studio', name: 'Studio LXD' },
  { id: 'acme', name: 'Acme Corp' },
];
