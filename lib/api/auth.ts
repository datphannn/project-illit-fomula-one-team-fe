import { LoginCredentials, RegisterData, User } from '@/lib/types/user';

export class AuthAPI {
  // In real app, these would be actual API calls
  static async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> {
    // This is now handled by the store
    throw new Error('Use auth store instead');
  }

  static async register(
    data: RegisterData
  ): Promise<{ user: User; token: string }> {
    // This is now handled by the store
    throw new Error('Use auth store instead');
  }

  static async logout(): Promise<void> {
    // This is now handled by the store
    throw new Error('Use auth store instead');
  }

  static async getCurrentUser(): Promise<User | null> {
    // This would be an API call to validate token and get user info
    // For now, return null and let store handle it
    return null;
  }
}
