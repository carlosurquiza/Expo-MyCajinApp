import { StyleSheet } from "react-native"

export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    dark: string;
    background: string;
    viewBackground: string;
    surface: string;
    text: string;
    primaryText: string;
    secondaryText: string;
    link: string;
    border: string;
  };
}

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#0076A9',
    secondary: '#f72585',
    tertiary: '#3a0ca3',
    success: '#4cc9f0',
    info: '#D6E0EA',
    warning: '#FFECDE',
    danger: '#970000ff',
    dark: '#22223b',
    background: '#EBEFF4',
    viewBackground: '#ffffff',
    surface: '#ecececff',
    text: '#000000',
    primaryText: '#0076A9',
    secondaryText: '#6c757d',
    link: '#0076A9',
    border: '#dee2e6',
  },
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: '#0076A9',
    secondary: '#f72585',
    tertiary: '#3a0ca3',
    success: '#4cc9f0',
    info: '#D6E0EA',
    warning: '#FFECDE',
    danger: '#970000ff',
    dark: '#22223b',
    background: '#121212',
    viewBackground: '#3d3d3dff',
    surface: '#1e1e1e',
    text: '#ffffff',
    primaryText: '#4bc9ffff',
    secondaryText: '#adb5bd',
    link: '#4bc9ffff',
    border: '#495057',
  },
};

export const globalStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'RawsonPro-Bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: 'RawsonPro-Regular',
    color: theme.colors.text,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.background,
    fontSize: 18,
  },
  buttonPressed: {
    opacity: 0.75,
  },
});