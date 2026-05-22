import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FileUpload } from './FileUpload';

const meta = {
  title: 'Atoms/FileUpload',
  component: FileUpload,
  parameters: { layout: 'padded' },
  args: {
    multiple: false,
    disabled: false,
    error: false,
  },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    maxSize: { control: 'number' },
    maxFiles: { control: 'number' },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: 'Subir archivo',
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    accept: 'image/*,.pdf',
    ariaLabel: 'Subir archivos',
  },
};

export const WithAcceptAndSize: Story = {
  name: 'Con restricciones',
  args: {
    multiple: true,
    accept: '.pdf,.docx',
    maxSize: 5 * 1024 * 1024,
    maxFiles: 5,
    ariaLabel: 'Subir documentos',
  },
};

export const WithProgress: Story = {
  name: 'Con progreso',
  args: {
    progress: 65,
    ariaLabel: 'Subir archivo',
  },
};

export const Error: Story = {
  args: {
    error: true,
    ariaLabel: 'Subir archivo',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    ariaLabel: 'Subir archivo',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState<number | undefined>(undefined);

    const handleChange = (validFiles: File[]) => {
      setFiles(validFiles);
      if (validFiles.length > 0) {
        setProgress(0);
        let p = 0;
        const interval = setInterval(() => {
          p += 10;
          setProgress(p);
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setProgress(undefined), 800);
          }
        }, 200);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FileUpload
          {...args}
          multiple
          accept="image/*,.pdf"
          maxSize={10 * 1024 * 1024}
          maxFiles={4}
          value={files}
          onChange={handleChange}
          progress={progress}
          ariaLabel="Subir archivos"
        />
        <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#767676' }}>
          {files.length} archivo(s) válido(s) seleccionado(s)
        </p>
      </div>
    );
  },
};
