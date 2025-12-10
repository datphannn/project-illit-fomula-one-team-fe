// lib/services/authService.ts
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  dateOfBirth?: string;
  country?: string;
  role?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title?: string;
  dateOfBirth?: string;
  country?: string;
}

const USER_STORAGE_KEY = 'f1_current_user';
const AUTH_TOKEN_KEY = 'f1_auth_token';
const REGISTERED_USERS_KEY = 'f1_registered_users';

// Mock users for testing (initial users)
const INITIAL_MOCK_USERS = [
  {
    id: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
  },
  {
    id: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Smith',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'user',
  },
  {
    id: 'admin',
    email: 'admin@f1.com',
    password: 'admin123',
    name: 'Admin User',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
];

// Initialize registered users in localStorage if not exists
const initializeRegisteredUsers = () => {
  if (typeof window === 'undefined') return;

  const existingUsers = localStorage.getItem(REGISTERED_USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(
      REGISTERED_USERS_KEY,
      JSON.stringify(INITIAL_MOCK_USERS)
    );
  }
};

initializeRegisteredUsers();

// Get all registered users
const getRegisteredUsers = (): any[] => {
  if (typeof window === 'undefined') return [];

  try {
    const usersJson = localStorage.getItem(REGISTERED_USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch {
    return [];
  }
};

// Save users to localStorage
const saveRegisteredUsers = (users: any[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

export const register = async (data: RegisterData): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if email already exists
  const existingUsers = getRegisteredUsers();
  const emailExists = existingUsers.some(user => user.email === data.email);

  if (emailExists) {
    throw new Error('Email already exists');
  }

  // Generate unique ID
  const id = `user_${Date.now()}`;

  // Create new user
  const newUser = {
    id,
    email: data.email,
    password: data.password,
    name: `${data.firstName} ${data.lastName}`,
    firstName: data.firstName,
    lastName: data.lastName,
    title: data.title,
    dateOfBirth: data.dateOfBirth,
    country: data.country,
    role: 'user', // Default role for new users
  };

  // Add to registered users
  const updatedUsers = [...existingUsers, newUser];
  saveRegisteredUsers(updatedUsers);

  // Auto login after registration
  const { password: _, ...userWithoutPassword } = newUser;

  // Save to current user session
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
  localStorage.setItem(AUTH_TOKEN_KEY, 'mock-jwt-token-' + Date.now());

  return userWithoutPassword;
};

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find user in registered users
  const registeredUsers = getRegisteredUsers();
  const user = registeredUsers.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Remove password from user object
  const { password: _, ...userWithoutPassword } = user;

  // Save to current user session
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
  localStorage.setItem(AUTH_TOKEN_KEY, 'mock-jwt-token-' + Date.now());

  return userWithoutPassword;
};

export const logout = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (!userJson) return null;

  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(USER_STORAGE_KEY);
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};
