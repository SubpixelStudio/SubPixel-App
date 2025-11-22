import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from './ThemeProvider';

export default function Header({ title, style }) {
  const { dark, toggleTheme, colors } = useContext(ThemeContext);
  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }, style]}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: '700' }}>{title}</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons name={dark ? 'sunny' : 'moon'} size={22} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
