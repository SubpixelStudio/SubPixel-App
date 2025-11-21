import React, { useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Linking, View } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import Header from '../components/Header';

export default function ContactScreen() {
  const { colors } = useContext(ThemeContext);

  const handleEmailPress = () => {
    const email = 'subpixel.studio10@gmail.com';
    const subject = 'Contato via App';
    const body = 'Olá! Gostaria de falar sobre...';

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o app de e-mail.');
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 20 }}>
      <Header title="Contato" />
      <TouchableOpacity
        onPress={handleEmailPress}
        style={{ marginTop: 14, backgroundColor: colors.accent, padding: 12, borderRadius: 10 }}
      >
        <Text style={{ textAlign: 'center', fontWeight: '700'}}>
          Entre em contato
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
