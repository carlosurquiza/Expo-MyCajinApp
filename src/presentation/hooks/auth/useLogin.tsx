import { homeFetcher } from '@/src/config/adapters/home.adapter';
import { AuthRepositoryImpl } from '@/src/data/repositories/auth.repository.impl';
import { AuthEntity, LoginCredentials } from '@/src/domain/entities/auth/auth.entity';
import { loginUseCase } from '@/src/domain/use-cases/auth/login.use-case';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthEntity | null>(null);
  const { setUser: setAuthUser } = useAuth();

  const authRepository = new AuthRepositoryImpl(homeFetcher);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const authEntity = await loginUseCase(authRepository, credentials);
      setUser(authEntity);
      setAuthUser(authEntity);
      // Guardar tokens y datos del usuario de forma segura
      try {
        await Promise.all([
          SecureStore.setItemAsync('accessToken', authEntity.accessToken),
          SecureStore.setItemAsync('refreshToken', authEntity.refreshToken),
          SecureStore.setItemAsync('userId', authEntity.userId),
          SecureStore.setItemAsync('email', authEntity.email),
          SecureStore.setItemAsync('name', authEntity.name),
        ]);
      } catch (secureErr) {
        // No rompemos el flujo por fallo en el almacenamiento seguro
        console.warn('SecureStore setItemAsync failed', secureErr);
      }
      return authEntity;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, user, login };
};
