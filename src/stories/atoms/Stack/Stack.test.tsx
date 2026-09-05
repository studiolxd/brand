import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('por defecto no lleva la clase stack--align-stretch', () => {
    const { container } = render(
      <Stack>
        <span>a</span>
      </Stack>
    );
    const stack = container.querySelector('.stack')!;
    expect(stack).not.toHaveClass('stack--align-stretch');
  });

  it('el aire base no emite clase de gap', () => {
    const { container } = render(
      <Stack>
        <span>a</span>
      </Stack>
    );
    expect(container.querySelector('.stack')!.className).toBe('stack');
  });

  it('con gap="sm" lleva la clase stack--gap-sm', () => {
    const { container } = render(
      <Stack gap="sm">
        <span>a</span>
      </Stack>
    );
    expect(container.querySelector('.stack')!).toHaveClass('stack--gap-sm');
  });

  it('con gap="lg" lleva la clase stack--gap-lg', () => {
    const { container } = render(
      <Stack gap="lg">
        <span>a</span>
      </Stack>
    );
    expect(container.querySelector('.stack')!).toHaveClass('stack--gap-lg');
  });

  it('con align="stretch" lleva la clase stack--align-stretch', () => {
    const { container } = render(
      <Stack align="stretch">
        <span>a</span>
      </Stack>
    );
    const stack = container.querySelector('.stack')!;
    expect(stack).toHaveClass('stack--align-stretch');
  });
});
