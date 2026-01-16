export interface LoginResponse {
  user_id: string;
  email: string;
  name: string;
  access_token: string;
  refresh_token: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface LogoutResponse {
  message: string;
  success: boolean;
}
