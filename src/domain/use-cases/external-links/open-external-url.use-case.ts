import { Linking, Alert } from 'react-native';

export const openExternalUrlUseCase = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert("Error", `No se puede abrir la URL: ${url}`);
  }
};