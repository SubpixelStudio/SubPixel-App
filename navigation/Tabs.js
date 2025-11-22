import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';

// Imports de Contexto
import { ThemeContext } from '../components/ThemeProvider';
import { NewsProvider } from '../components/NewsProvider'; 
import { AuthContext, AuthProvider } from '../components/AuthProvider'; 

// Imports de Telas
import HomeScreen from '../screens/HomeScreen';
import ToolsScreen from '../screens/ToolsScreen';
import ContactScreen from '../screens/ContactScreen';
import NewsScreen from '../screens/NewsScreen';
import AdminNewsScreen from '../screens/AdminNewsScreen';
import LoginScreen from '../screens/LoginScreen'; // 💡 NOVO: Tela de Login

const Tabs = createBottomTabNavigator();

// --- Componente de Navegação das Abas ---
function MainTabs() {
    const { colors } = useContext(ThemeContext);
    // Puxa o status de login para controle
    const { isLoggedIn } = useContext(AuthContext); 

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.text2,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    const map = { 
                        Home: 'home', 
                        Tools: 'hammer', 
                        Contact: 'mail', 
                        News: 'newspaper-outline', 
                        Login: 'log-in-outline', // Ícone para a tela de Login
                        Admin: 'settings-outline' 
                    };
                    iconName = map[route.name] || 'alert';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tabs.Screen name="Home" component={HomeScreen} />
            <Tabs.Screen name="Tools" component={ToolsScreen} />
            <Tabs.Screen name="Contact" component={ContactScreen} />
            <Tabs.Screen name="News" component={NewsScreen} /> 
            
            {/* Rota de Login (Sempre visível para iniciar o processo) */}
            <Tabs.Screen name="Login" component={LoginScreen} /> 


        {isLoggedIn && (
    <Tabs.Screen 
        name="Admin" 
        component={AdminNewsScreen}
    />
)} 
        </Tabs.Navigator>
    );
}

// --- Componente Raiz (Exportado) ---
export default function RootNavigator() {
    return (
        <AuthProvider>
            <NewsProvider> 
                <MainTabs />
            </NewsProvider>
        </AuthProvider>
    );
}
