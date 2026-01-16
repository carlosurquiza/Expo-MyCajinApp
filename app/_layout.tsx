// app/_layout.tsx
import { useFonts } from "expo-font";
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from '../src/presentation/auth/AuthContext';
import { ThemeProvider } from '../src/presentation/theme/ThemeContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'RawsonPro-Bold': require('../assets/fonts/RawsonPro-Bold.otf'),
    'RawsonPro-Regular': require('../assets/fonts/RawsonPro-Regular.otf'),
    'RawsonPro-Medium': require('../assets/fonts/RawsonPro-Medium.otf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <AuthObserver />
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const AuthObserver = () => {
  const { isAuthenticated, setUser } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [accessToken, refreshToken, userId, email, name] = await Promise.all([
          SecureStore.getItemAsync('accessToken'),
          SecureStore.getItemAsync('refreshToken'),
          SecureStore.getItemAsync('userId'),
          SecureStore.getItemAsync('email'),
          SecureStore.getItemAsync('name'),
        ]);
        if (accessToken) {
          setUser({
            accessToken,
            refreshToken: refreshToken ?? '',
            userId: userId ?? '',
            email: email ?? '',
            name: name ?? '',
            isAuthenticated: true,
          });
        }
      } catch (err) {
        console.warn('SecureStore getItemAsync failed', err);
      } finally {
        setChecked(true);
      }
    })();
  }, [setUser]);

  useEffect(() => {
    if (!checked) return;
    // Si estamos autenticados y estamos en el grupo (auth), redirigimos al home
    if (isAuthenticated && segments[0] === '(auth)') {
      router.replace('/(drawer)/(tabs)/home');
      return;
    }
    // Si no estamos autenticados y no estamos en (auth), redirigimos al login
    if (!isAuthenticated && segments[0] !== '(auth)') {
      router.replace('/(auth)/login');
    }
  }, [checked, isAuthenticated, segments, router]);

  return null;
};

export default RootLayout;