import { AuthEntity, ForgotPasswordData, LoginCredentials } from "../../domain/entities/auth/auth.entity";
import { ForgotPasswordResponse, LoginResponse, LogoutResponse } from "../interfaces/auth/auth.response";

export class AuthMapper {
  static fromLoginResponseToEntity(result: LoginResponse): AuthEntity {
    return {
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
      userId: result.user_id,
      email: result.email,
      name: result.name,
      isAuthenticated: true,
    };
  }

  static fromCredentialsToLoginPayload(credentials: LoginCredentials): Record<string, string> {
    return {
      email: credentials.email,
      password: credentials.password,
    };
  }

  static fromForgotPasswordDataToPayload(data: ForgotPasswordData): Record<string, string> {
    return {
      email: data.email,
    };
  }

  static fromForgotPasswordResponseToMessage(result: ForgotPasswordResponse): string {
    return result.message;
  }

  static fromLogoutResponseToMessage(result: LogoutResponse): string {
    return result.message;
  }
}
