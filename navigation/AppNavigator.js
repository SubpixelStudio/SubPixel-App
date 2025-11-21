import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Tabs} />
    </Stack.Navigator>
  );
}
