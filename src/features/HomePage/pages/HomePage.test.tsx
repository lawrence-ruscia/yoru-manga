import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders a hero section', () => {
    render(<HomePage />);

    expect(screen.getByText(/yoru manga/i));
    expect(screen.getByRole('button', { name: /browse manga/i }));
  });
});
