// src/core/entities/Menu.ts

// Representación interna en inglés
export interface MenuItem {
  title: string;
  viewName: string;
  isVisible: boolean;
}

// Lógica de transformación (Mapper)
export const menuMapper = (apiResponse: any[]): MenuItem[] => {
  return apiResponse.map((item) => ({
    title: item.titulo,
    viewName: item.vista_ios,
    isVisible: item.visible === "true", // Convertimos string a boolean
  }));
};