import { AuthEntity, LoginCredentials } from "@/src/domain/entities/auth/auth.entity";

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Promise<AuthEntity>;
  // abstract forgotPassword(data: ForgotPasswordData): Promise<string>;
  abstract logout(): Promise<string>;
}
