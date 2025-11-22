import React, { useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import Header from '../components/Header';

const PROJECT = {
  title: 'Metroidvania',
  desc: 'Experiência 2D procedural.',
  imagem:'https://images.steamusercontent.com/ugc/870742007713936464/53A7A3CD67A5F28E6D4DC811E2F3478392F9EEE7/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
};

export default function HomeScreen() {
  const { colors } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.contentContainer}>
      <Header title="SubPixel HUB" />
      
      {/* Card de Boas-vindas */}
      <View style={[styles.welcomeCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.welcomeTitle, { color: colors.text }]}>Bem-vindo!</Text>
        <Text style={[styles.welcomeText, { color: colors.text2 }]}>{'Plataforma oficial da SubPixel Studio.'}</Text>
        <TouchableOpacity style={[styles.projectButton, { backgroundColor: colors.accent + '22' }]}>
          <Text style={[styles.projectButtonText, { color: colors.accent }]}>{'Ver Projeto'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.featuredTitle, { color: colors.text }]}>Projeto em Destaque</Text>
      
      {/* Card do Projeto em Destaque */}
      <View style={[styles.featuredCard, { backgroundColor: colors.card }]}>
        <Image source={{uri:PROJECT.imagem}} style={[styles.projectImage, { backgroundColor: colors.bg }]} />
        <Text style={[styles.projectTitle, { color: colors.text }]}>{PROJECT.title}</Text>
        <Text style={[styles.projectDesc, { color: colors.text2 }]}>{PROJECT.desc}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { padding: 20 },
    welcomeCard: {
      padding: 18,
      borderRadius: 12,
      marginBottom: 20
    },
    welcomeTitle: {
      fontSize: 18,
      fontWeight: '700'
    },
    welcomeText: {
      marginTop: 8
    },
    projectButton: {
      marginTop: 12,
      padding: 10,
      alignSelf: 'flex-start',
      borderRadius: 10
    },
    projectButtonText: {
      fontWeight: '700'
    },
    featuredTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 8
    },
    featuredCard: {
      padding: 14,
      borderRadius: 12
    },
    projectImage: {
      height: 150,
      borderRadius: 10
    },
    projectTitle: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: '700'
    },
    projectDesc: {
      marginTop: 6
    }
});