import { AuthRepository } from '@/src/data/repositories/auth.repository';
import { AuthEntity, LoginCredentials } from '../../entities/auth/auth.entity';

export const loginUseCase = async (
  repository: AuthRepository,
  credentials: LoginCredentials
): Promise<AuthEntity> => {
  return repository.login(credentials);
};
