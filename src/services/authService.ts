import { MenuItem, menuMapper } from "../core/entities/Menu";

const BASE_URL = 'https://private-ded78f-homeapp2.apiary-mock.com';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error('No token received');
    }
    return data;
  },

  logout: async () => {
    return fetch(`${BASE_URL}/auth/logout`, { method: 'POST' });
  },

  getHomeData: async (): Promise<{ menu: MenuItem[] }> => {
    const response = await fetch(`${BASE_URL}/home`);
    const json = await response.json();

    return {
      // Aplicamos el mapper a la lista que viene de la API
      menu: menuMapper(json.menu || [])
    };
  }
};