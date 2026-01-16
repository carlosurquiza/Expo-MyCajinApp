export interface AuthEntity {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}
