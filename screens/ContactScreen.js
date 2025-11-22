import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, Linking, View, StyleSheet } from 'react-native';
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
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.contentContainer}>
      <Header title="Contato" />
      <TouchableOpacity
        onPress={handleEmailPress}
        style={[styles.contactButton, { backgroundColor: colors.accent }]}
      >
        <Text style={styles.buttonText}>
          Entre em contato
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    contentContainer: { 
        padding: 20 
    },
    contactButton: { 
        marginTop: 14, 
        padding: 12, 
        borderRadius: 10 
    },
    buttonText: { 
        textAlign: 'center', 
        fontWeight: '700',
        color: 'white' // Cor fixa para contraste com o accent
    }
});