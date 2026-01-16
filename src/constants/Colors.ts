const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// src/constants/Colors.ts
export const Colors = {
  primary: '#0079A8', // El azul de MyCajinApp
  background: '#FFFFFF',
  text: '#333333',
  error: '#FF0000',
  gray: '#F5F5F5'
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
