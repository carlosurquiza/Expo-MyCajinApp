import React from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { useTheme } from '../../theme/ThemeContext'

interface Props {
  label: string
  onPress: () => void
  onLongPress?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  icon?: React.ReactNode
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export const CustomButton = ({
  label,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  style,
  textStyle
}: Props) => {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);
  const getButtonStyle = (pressed: boolean) => {
    return [
      styles.button,
      styles[size],
      variant === 'primary' && styles.buttonPrimary,
      variant === 'secondary' && styles.buttonSecondary,
      variant === 'outline' && styles.buttonOutline,
      variant === 'danger' && styles.buttonDanger,
      fullWidth && styles.fullWidth,
      pressed && !disabled && !loading && styles.buttonPressed,
      disabled && styles.buttonDisabled,
      style
    ]
  }

  const getTextStyle = () => {
    return [
      styles.text,
      variant === 'primary' && styles.textPrimary,
      variant === 'secondary' && styles.textSecondary,
      variant === 'outline' && styles.textOutline,
      variant === 'danger' && styles.textPrimary,
      disabled && styles.textDisabled,
      textStyle
    ]
  }

  return (
    <Pressable
      style={({ pressed }) => getButtonStyle(pressed)}
      onPress={() => !disabled && !loading && onPress()}
      onLongPress={() => !disabled && !loading && onLongPress && onLongPress()}
      disabled={disabled || loading}
    >
      <View style={styles.contentContainer}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' ? colors.primary : 'white'}
            style={styles.loader}
          />
        )}
        {icon && !loading && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={getTextStyle()}>
          {label}
        </Text>
      </View>
    </Pressable>
  )
}

const getStyles = (colors: any) => StyleSheet.create({
  button: {
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    opacity: 0.6,
  },
  small: { paddingHorizontal: 16, height: 36 },
  medium: { paddingHorizontal: 24, height: 46 },
  large: { paddingHorizontal: 32, height: 56 },
  fullWidth: { width: '100%' },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textPrimary: {
    color: 'white',
    fontSize: 16,
  },
  textSecondary: {
    color: 'white',
    fontSize: 16,
  },
  textOutline: {
    color: colors.primary,
    fontSize: 16,
  },
  textDisabled: {
    color: colors.secondaryText,
  },
  iconContainer: { marginRight: 8 },
  loader: { marginRight: 8 },
})