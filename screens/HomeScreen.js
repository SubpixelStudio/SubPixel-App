import React, { useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import Header from '../components/Header';

const PROJECT = {
  title: 'Metroidvania',
  desc: 'Experiência 2D procedural.',
  imagem:'https://images.steamusercontent.com/ugc/870742007713936464/53A7A5CD67A5F28E6D4DC811E2F3478392F9EEE7/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
};

export default function HomeScreen() {
  const { colors } = useContext(ThemeContext);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 20 }}>
      <Header title="SubPixel HUB" />
      <View style={{ backgroundColor: colors.card, padding: 18, borderRadius: 12, marginBottom: 20 }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Bem-vindo!</Text>
        <Text style={{ color: colors.text2, marginTop: 8 }}>{'Plataforma oficial da SubPixel Studio.'}</Text>
        <TouchableOpacity style={{ marginTop: 12, padding: 10, alignSelf: 'flex-start', borderRadius: 10, backgroundColor: colors.accent + '22' }}>
          <Text style={{ color: colors.accent, fontWeight: '700' }}>{'Ver Projeto'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 8 }}>Projeto em Destaque</Text>
      <View style={{ backgroundColor: colors.card, padding: 14, borderRadius: 12 }}>
        <Image source={{uri:PROJECT.imagem}} style={{ height: 150, backgroundColor: colors.bg, borderRadius: 10 }} />
        <Text style={{ color: colors.text, marginTop: 12, fontSize: 16, fontWeight: '700' }}>{PROJECT.title}</Text>
        <Text style={{ color: colors.text2, marginTop: 6 }}>{PROJECT.desc}</Text>
      </View>
    </ScrollView>
  );
}
