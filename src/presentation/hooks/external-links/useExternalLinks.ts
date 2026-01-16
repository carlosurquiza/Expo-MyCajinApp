import { openExternalUrlUseCase } from "@/src/domain/use-cases/external-links/open-external-url.use-case";
import { Linking } from "react-native";


export const useExternalLinks = () => {
  const callCenter = () => openExternalUrlUseCase('tel:+56298765432');
  const cclaAuth = () => openExternalUrlUseCase('https://sso.cajalosandes.cl/auth/realms/afiliados-ccla-prd/protocol/openid-connect/auth?client_id=modyo-ccla&nonce=0d8180c20d965924d98ad6b18a13ed95&redirect_uri=https%3A%2F%2Fweb.cajalosandes.cl%2Frealms%2Fafiliados-ccla-prd%2Fauth%2Fopenidc%2Fcallback&response_type=code&scope=openid%20email%20identificador_personal&state=b1b0a31d13afeb40e8ab7dd7ffe26d51');

  const openSocial = async (appUrl: string, webUrl: string) => {
    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      await Linking.openURL(webUrl);
    }
  };

  return {
    callCenter,
    cclaAuth,
    openFacebook: () => openSocial('fb://page/ID_PAGINA', 'https://facebook.com/TU_PERFIL'),
    openX: () => openSocial('twitter://user?screen_name=TU_USER', 'https://x.com/TU_USER'),
    openInstagram: () => openSocial('instagram://user?username=TU_USER', 'https://instagram.com/TU_USER'),
  };
};