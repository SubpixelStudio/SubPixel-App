import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import { NewsContext } from '../components/NewsProvider';
import { AuthContext } from '../components/AuthProvider'; // 💡 NOVO: Para logout
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // 💡 NOVO: Para navegação

export default function AdminNewsScreen() {
  const { colors } = useContext(ThemeContext);
  const { newsList, createNews, updateNews, deleteNews } = useContext(NewsContext);
  const { logout } = useContext(AuthContext); // Puxa o logout
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // --- Funções Auxiliares ---
  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setTitle('');
    setContent('');
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setTitle(item.title);
    setContent(item.content);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta notícia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteNews(id), style: 'destructive' },
      ],
    );
  };

  const handleSave = () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha o título e o conteúdo.');
      return;
    }

    if (isEditing) {
      updateNews(editId, title.trim(), content.trim());
      Alert.alert('Sucesso', 'Notícia atualizada com sucesso!');
    } else {
      createNews(title.trim(), content.trim());
      Alert.alert('Sucesso', 'Nova notícia postada!');
    }
    resetForm();
  };
  
  const handleLogout = () => {
    logout();
    navigation.navigate('Login'); // Redireciona para a tela de Login
  };
  // -------------------------

  const renderNewsItem = ({ item }) => (
    <View style={[styles.newsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.newsTitle, { color: colors.accent }]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.newsContent, { color: colors.text2 }]} numberOfLines={2}>{item.content}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 10}} onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={24} color={colors.error || 'red'} />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const logoutButton = (
    <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="log-out-outline" size={22} color={colors.text} />
        <Text style={{ color: colors.text, marginLeft: 5 }}>Sair</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* 💡 NOVO: Adiciona o botão de logout no Header */}
      <Header 
        title={isEditing ? "Editar Notícia" : "Gestão de Notícias"} 
        rightComponent={logoutButton} 
      />

      {/* Formulário (CREATE/UPDATE) */}
      <View style={[styles.formContainer, { borderBottomColor: colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.card }]}
          placeholder="Título da Notícia"
          placeholderTextColor={colors.text2}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.inputContent, { color: colors.text, borderColor: colors.border, backgroundColor: colors.card }]}
          placeholder="Conteúdo Completo"
          placeholderTextColor={colors.text2}
          multiline
          value={content}
          onChangeText={setContent}
        />
        <View style={styles.formActions}>
            <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.accent }]}
                onPress={handleSave}
            >
                <Text style={styles.buttonText}>{isEditing ? 'Salvar Edição' : 'Postar Nova Notícia'}</Text>
            </TouchableOpacity>

            {isEditing && (
                <TouchableOpacity
                    style={[styles.cancelButton, { borderColor: colors.error || 'red' }]}
                    onPress={resetForm}
                >
                    <Text style={[styles.cancelButtonText, { color: colors.error || 'red' }]}>Cancelar</Text>
                </TouchableOpacity>
            )}
        </View>
      </View>

      {/* Lista de Notícias (READ/DELETE/UPDATE) */}
      <FlatList
        data={newsList}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
            <Text style={[styles.listHeader, {color: colors.text}]}>Notícias Atuais ({newsList.length})</Text>
        )}
      />
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  listContainer: { padding: 20 },
  formContainer: { padding: 20, borderBottomWidth: 1, marginBottom: 10 },
  input: { height: 40, borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10, fontSize: 16 },
  inputContent: { height: 80, textAlignVertical: 'top' },
  formActions: { flexDirection: 'row', marginTop: 5 },
  saveButton: { padding: 12, borderRadius: 5, flex: 1, alignItems: 'center', marginRight: 10 },
  cancelButton: { padding: 12, borderRadius: 5, borderWidth: 1, flex: 0.5, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  cancelButtonText: { fontWeight: 'bold', fontSize: 14 }, // Estilo separado para cor dinâmica
  newsCard: { padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textContainer: { flex: 1, marginRight: 10 },
  newsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  newsContent: { fontSize: 14 },
  actionButtons: { flexDirection: 'row', alignItems: 'center' },
  listHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});