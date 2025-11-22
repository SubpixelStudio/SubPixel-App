import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';

const Stack = createStackNavigator();
import NewsProvider from '../components/NewsProvider'
import NewsScreen from '../screens/NewsScreen';
import AdminNewsScreen from '../screens/AdminNewsScreen'; // Importar a nova tela

export default function AppNavigator() {
  // ... lógica do ThemeContext

  return (
    <NewsProvider>
      <Tabs.Navigator
        // ... screenOptions e tabs
      >
        {/* Tela de Leitura para Usuários Comuns */}
        <Tabs.Screen 
            name="News" 
            component={NewsScreen} 
            options={{ tabBarIcon: ({ color, size }) => (
                <Ionicons name="newspaper-outline" size={size} color={color} />
            )}}
        />
        
        {/* Tela de CRUD para Administradores */}
        <Tabs.Screen 
            name="Admin" 
            component={AdminNewsScreen} 
            options={{ tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
            )}}
        />
      </Tabs.Navigator>
    </NewsProvider>
  );
}