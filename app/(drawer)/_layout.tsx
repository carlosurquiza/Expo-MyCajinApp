import { useAuth } from '@/src/presentation/auth/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { MenuItem } from '../../src/core/entities/Menu';
import { authService } from '../../src/services/authService';
// import { useAuth } from '../../src/store/AuthContext';

function CustomDrawerContent(props: DrawerContentComponentProps & { menuItems: MenuItem[] }) {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      {/* 1. Mapeo dinámico de los items del API */}
      {props.menuItems.filter(item => item.isVisible).map((item, index) => (
        <DrawerItem
          key={index}
          label={item.title} // Ya viene como .title gracias al mapper
          onPress={() => {
            // Aquí podrías navegar dinámicamente según item.viewName
            if (item.title === 'Inicio') props.navigation.navigate('(tabs)');
          }}
          icon={({ size, color }) => (
            <Ionicons name="apps-outline" size={size} color={color} />
          )}
        />
      ))}

      {/* 2. Botón estático de cerrar sesión */}
      <DrawerItem label="Cerrar sesión" onPress={logout} icon={() => <Ionicons name="log-out" size={24} color="red" />} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    authService.getHomeData().then(data => {
      setMenuItems(data.menu);
    });
  }, []);

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} menuItems={menuItems} />}
      screenOptions={{
        headerShown: true,
        drawerPosition: 'right',
        drawerStyle: {
          width: width,
        },
        drawerType: 'front',
      }}>
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Inicio', title: 'MyCajinApp' }} />
    </Drawer>
  );
}