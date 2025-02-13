import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../client/pages/Login';

test('renders signup form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

test('submits the form with valid data', async () => {
  const mockLogin = jest.fn();
  render(<LoginPage onLogin={mockLogin} />);
  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(usernameInput, 'testing');
  userEvent.type(passwordInput, 'password123');
  userEvent.click(loginButton);

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith('testing', 'password123');
  });
});

test('shows validation error when fields are empty', async () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: 'Login' });

  userEvent.click(loginButton);

  expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();
});

