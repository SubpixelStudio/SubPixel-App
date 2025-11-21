import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ToolsScreen from '../screens/ToolsScreen';
import ContactScreen from '../screens/ContactScreen';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { colors } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text2,
        tabBarIcon: ({ color, size }) => {
          const map = { Home: 'home', Tools: 'hammer', Contact: 'mail' };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}
