import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import Header from '../components/Header';
import { NewsContext } from '../components/NewsProvider'; // Importa o Contexto

// --- Componente de Item de Notícia ---
const NewsCard = ({ item, colors }) => (
  <View style={[styles.newsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
    <Text style={[styles.newsTitle, { color: colors.accent }]}>{item.title}</Text>
    <Text style={[styles.newsContent, { color: colors.text }]}>{item.content}</Text>
    <Text style={[styles.newsAuthor, { color: colors.text2 }]}>Publicado por: {item.author}</Text>
  </View>
);

export default function NewsScreen() {
  const { colors } = useContext(ThemeContext);
  // ✅ Puxa o estado 'newsList' e 'isLoading' do Contexto (Solução para o erro de 'undefined')
  const { newsList, isLoading } = useContext(NewsContext); 

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={{ color: colors.text, marginTop: 10 }}>Carregando notícias...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Header title="Notícias" />
      
      <FlatList
        data={newsList} // ✅ Usa 'newsList' (minúsculo)
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard item={item} colors={colors} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.text2 }}>Nenhuma notícia encontrada.</Text>
          </View>
        )}
      />
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  listContainer: { padding: 20 },
  newsCard: { padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1 },
  newsTitle: { fontSize: 18, fontWeight: '700', marginBottom: 5 },
  newsContent: { fontSize: 16, marginBottom: 10 },
  newsAuthor: { fontSize: 12, fontStyle: 'italic', textAlign: 'right' },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});