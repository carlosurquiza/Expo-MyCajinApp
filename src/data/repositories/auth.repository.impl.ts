import { HttpAdapter } from "@/src/config/adapters/http/http.adapter";
import { AuthEntity, LoginCredentials } from "@/src/domain/entities/auth/auth.entity";
import { LoginResponse, LogoutResponse } from "@/src/infrastructure/interfaces/auth/auth.response";
import { AuthMapper } from "@/src/infrastructure/mappers/auth.mapper";
import { AuthRepository } from "./auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly httpAdapter: HttpAdapter) { }

  async login(credentials: LoginCredentials): Promise<AuthEntity> {
    try {
      const payload = AuthMapper.fromCredentialsToLoginPayload(credentials);
      const response = await this.httpAdapter.post<LoginResponse>('/auth/login', payload);
      return AuthMapper.fromLoginResponseToEntity(response);
    } catch (error) {
      console.log({ error });
      throw new Error('Error al iniciar sesión');
    }
  }

  // async forgotPassword(data: ForgotPasswordData): Promise<string> {
  //   try {
  //     const payload = AuthMapper.fromForgotPasswordDataToPayload(data);
  //     const response = await this.httpAdapter.post<ForgotPasswordResponse>(
  //       '/auth/forgot-password',
  //       payload
  //     );
  //     return AuthMapper.fromForgotPasswordResponseToMessage(response);
  //   } catch (error) {
  //     console.log({ error });
  //     throw new Error('Error al solicitar recuperación de contraseña');
  //   }
  // }

  async logout(): Promise<string> {
    try {
      const response = await this.httpAdapter.post<LogoutResponse>('/auth/logout', {});
      return AuthMapper.fromLogoutResponseToMessage(response);
    } catch (error) {
      console.log({ error });
      throw new Error('Error al cerrar sesión');
    }
  }
}
