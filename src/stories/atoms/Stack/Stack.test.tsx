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
