import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom/extend-expect';
import SignIn from '../components/SignIn';
import Toaster from '../utils/Toaster/toaster';

// Mock signIn and Toaster
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));
jest.mock('../utils/Toaster/toaster', () => jest.fn());

// Mock dependencies
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignIn Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders email and password fields and submit button', () => {
    render(<SignIn />);
    
    expect(screen.getByPlaceholderText(/Enter user name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  test('toggles password visibility when eye icon is clicked', () => {
    render(<SignIn />);
  
    // Query the password input by placeholder
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    
    // Query the toggle button by aria-label
    const toggleButton = screen.getByRole('button', { name: /Toggle password visibility/i });
    
    expect(passwordInput).toHaveAttribute('type', 'password');
  
    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  
    // Click to hide password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('updates email and password state on input change', () => {
    render(<SignIn />);
    
    const emailInput = screen.getByPlaceholderText(/Enter user name/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('calls signIn function on form submission', async () => {
    signIn.mockResolvedValue({ ok: true });
  
    render(<SignIn />);
    
    // Use getByPlaceholderText to target inputs
    const emailInput = screen.getByPlaceholderText(/Enter user name/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      });
    });
  });

  test('shows success message and redirects to dashboard on successful login', async () => {
    signIn.mockResolvedValue({ ok: true });
    useSession.mockReturnValue({ data: { user: { email: 'test@example.com' } }, status: 'authenticated' });
    
    render(<SignIn />);

    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('shows error message on failed login attempt', async () => {
    signIn.mockResolvedValue({ ok: false });
    
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText(/Enter user name/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);

  // Fill out the form
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(Toaster).toHaveBeenCalled(); 
        expect(Toaster).toHaveBeenCalledWith("error", "Invalid Credentials!"),
        { timeout: 3000 }
      });
  });
});
