/**
 * Utilidades de validación para autenticación
 */

/**
 * Valida que el email tenga un formato correcto
 * @param email - Email a validar
 * @returns true si el email es válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Valida que la contraseña cumpla con los requisitos mínimos
 * Requisitos: mínimo 6 caracteres
 * @param password - Contraseña a validar
 * @returns true si la contraseña es válida
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Valida el formato de email con regex más estricto
 * @param email - Email a validar
 * @returns true si el email tiene formato válido
 */
export const isValidEmailStrict = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email.trim());
};

/**
 * Obtiene un mensaje de error descriptivo para validación de email
 * @param email - Email a validar
 * @returns Mensaje de error o null si es válido
 */
export const getEmailValidationError = (email: string): string | null => {
  if (!email.trim()) {
    return 'El email es requerido';
  }
  if (!isValidEmailStrict(email)) {
    return 'Por favor ingresa un email válido (ej: usuario@ejemplo.com)';
  }
  return null;
};

/**
 * Obtiene un mensaje de error descriptivo para validación de contraseña
 * @param password - Contraseña a validar
 * @returns Mensaje de error o null si es válida
 */
export const getPasswordValidationError = (password: string): string | null => {
  if (!password) {
    return 'La contraseña es requerida';
  }
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  return null;
};

/**
 * Valida credenciales de login completas
 * @param email - Email del usuario
 * @param password - Contraseña del usuario
 * @returns Objeto con validaciones
 */
export const validateLoginCredentials = (
  email: string,
  password: string
): {
  isValid: boolean;
  emailError: string | null;
  passwordError: string | null;
} => {
  const emailError = getEmailValidationError(email);
  const passwordError = getPasswordValidationError(password);

  return {
    isValid: emailError === null && passwordError === null,
    emailError,
    passwordError,
  };
};
