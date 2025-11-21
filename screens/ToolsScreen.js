import React, { useContext } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import Header from '../components/Header';

import AsepriteImg from '../assets/Aseprite.png';
import GodotImg from '../assets/godot.png';

const tools = [
  { title: 'Aseprite', desc: 'Pixel art profissional.', imagem: AsepriteImg },
  { title: 'Godot Engine', desc: 'Engine rápida e moderna.', imagem: GodotImg },
];

export default function ToolsScreen() {
  const { colors } = useContext(ThemeContext);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20 }}>
      <Header title="Ferramentas" />
      {tools.map((t, i) => (
        <View
          key={i}
          style={{
            backgroundColor: colors.card,
            padding: 14,
            borderRadius: 12,
            marginBottom: 12,
          }}>
          <Image
            source={t.imagem}
            style={{ width: 60, height: 60, borderRadius: 8, marginBottom: 10 }}
            resizeMode="contain"
          />
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>
            {t.title}
          </Text>
          <Text style={{ color: colors.text2, marginTop: 6 }}>{t.desc}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
