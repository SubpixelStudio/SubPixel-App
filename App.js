import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './components/ThemeProvider';
import Tabs from './navigation/Tabs';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
