
export interface User {
  id?: number;
  email: string;
  username?: string;
  password?: string;
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
