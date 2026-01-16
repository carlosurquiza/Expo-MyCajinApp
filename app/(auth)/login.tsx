import { LoginCredentials } from '@/src/domain/entities/auth/auth.entity';
import { CustomButton } from '@/src/presentation/components/buttons/CustomButton';
import { useLogin } from '@/src/presentation/hooks/auth/useLogin';
import { useExternalLinks } from '@/src/presentation/hooks/external-links/useExternalLinks';
import { globalStyles } from '@/src/presentation/theme/theme';
import { useTheme } from '@/src/presentation/theme/ThemeContext';
import { validateLoginCredentials } from '@/src/utils/validation';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../src/constants/Colors';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { theme } = useTheme();
  const styles = globalStyles(theme);

  const { cclaAuth } = useExternalLinks();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoading, error, login } = useLogin();

  const handleLogin = async () => {
    const validation = validateLoginCredentials(email, password);

    setEmailError(validation.emailError);
    setPasswordError(validation.passwordError);

    if (!validation.isValid) {
      return;
    }

    Keyboard.dismiss();

    setIsSubmitting(true);
    try {
      const credentials: LoginCredentials = { email, password };
      await login(credentials);
    } catch (err) {
      setIsSubmitting(false);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* Header */}
          <View style={{ marginBottom: 40 }}>
            <Text style={[styles.title, { fontSize: 32, marginBottom: 12 }]}>Bienvenido</Text>
            <Text style={[styles.text, { color: colors.secondaryText, fontSize: 14 }]}>
              Inicia sesión en tu cuenta
            </Text>
          </View>

          {/* Error Message */}
          {error && (
            <View
              style={{
                backgroundColor: '#ffebee',
                padding: 12,
                borderRadius: 8,
                marginBottom: 20,
                borderLeftWidth: 4,
                borderLeftColor: colors.danger,
              }}
            >
              <Text style={{ color: colors.danger, fontSize: 14 }}>⚠️ {error}</Text>
            </View>
          )}

          {/* Email Input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
              Correo Electrónico
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: emailError ? colors.danger : colors.border,
                borderRadius: 8,
                padding: 12,
                fontSize: 14,
                color: colors.text,
                backgroundColor: colors.viewBackground,
              }}
              placeholder="correo@ejemplo.com"
              placeholderTextColor={colors.secondaryText}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(null);
              }}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError && (
              <Text style={{ color: colors.danger, fontSize: 12, marginTop: 6 }}>
                {emailError}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
              Contraseña
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: passwordError ? colors.danger : colors.border,
                borderRadius: 8,
                backgroundColor: colors.viewBackground,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  padding: 12,
                  fontSize: 14,
                  color: colors.text,
                }}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={colors.secondaryText}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(null);
                }}
                editable={!isLoading}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{ paddingHorizontal: 12 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color={passwordError ? colors.danger : colors.primary}
                />
              </TouchableOpacity>
            </View>
            {passwordError && (
              <Text style={{ color: colors.danger, fontSize: 12, marginTop: 6 }}>
                {passwordError}
              </Text>
            )}
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => { }}
            disabled={isLoading}
            style={{ marginBottom: 30, alignItems: 'flex-end' }}
          >
            <Text style={{ color: colors.link, fontSize: 14, fontWeight: '500' }}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <CustomButton
            label={isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            onPress={handleLogin}
            loading={isLoading}
            variant="primary"
            fullWidth
          />

          {/* Sign Up Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: colors.secondaryText, fontSize: 14 }}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={cclaAuth}>
              <Text style={{ color: colors.link, fontSize: 14, fontWeight: '600' }}>
                Regístrate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.primary, marginBottom: 30, textAlign: 'center' },
  input: { height: 50, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20, fontSize: 16 },
  button: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  forgotPass: { marginTop: 15, alignItems: 'center' }
});