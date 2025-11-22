// LoginScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import { AuthContext } from '../components/AuthProvider';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const { colors } = useContext(ThemeContext);
    const { isLoggedIn, login, logout } = useContext(AuthContext);
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Redireciona quando logar
    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate('Admin');
        }
    }, [isLoggedIn]);

    const handleSubmit = () => {
        const validUser = "SubPixelAdmin";
        const validPass = "System.SubPixelApp10@2025";

        if (username === validUser && password === validPass) {
            login();
        } else {
            Alert.alert(
                "Credenciais inválidas",
                "Usuário ou senha incorretos."
            );
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Header title="Acesso Administrativo" />

            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>Login Administrativo</Text>

                <TextInput
                    placeholder="Usuário"
                    placeholderTextColor={colors.text2}
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Senha"
                    placeholderTextColor={colors.text2}
                    secureTextEntry
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!username || !password}
                    style={[
                        styles.actionButton,
                        {
                            backgroundColor: (!username || !password)
                                ? colors.border
                                : colors.accent,
                            opacity: (!username || !password) ? 0.5 : 1,
                        }
                    ]}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                {isLoggedIn && (
                    <TouchableOpacity
                        onPress={logout}
                        style={[styles.logoutButton, { borderColor: colors.error || 'red' }]}
                    >
                        <Text style={[styles.logoutText, { color: colors.error || 'red' }]}>
                            Fazer Logout
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '90%',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 20,
    },
    actionButton: {
        paddingVertical: 12,
        borderRadius: 8,
        width: '90%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    logoutButton: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 6,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
