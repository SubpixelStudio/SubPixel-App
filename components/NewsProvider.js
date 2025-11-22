import React, { createContext, useState, useEffect } from 'react';

// Define o Contexto com valores padrão para evitar erros de 'undefined'
export const NewsContext = createContext({
    newsList: [],
    isLoading: true,
    createNews: () => {},
    updateNews: () => {},
    deleteNews: () => {},
});

// --- DADOS DE EXEMPLO ---
const initialNews = [
    { id: '1', title: 'Novidades do React Native', content: 'A versão 0.73 traz grandes melhorias de performance. Leia mais...', author: 'Admin' },
    { id: '2', title: 'Dicas de Otimização de Imagens', content: 'Utilize o FastImage e o cache para reduzir o consumo de memória.', author: 'Dev' },
    { id: '3', title: 'Alerta de Segurança', content: 'Mantenha suas dependências sempre atualizadas para evitar vulnerabilidades conhecidas.', author: 'Segurança' },
];

export const NewsProvider = ({ children }) => {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simula o carregamento (fetch de API)
        const timer = setTimeout(() => {
            setNewsList(initialNews);
            setIsLoading(false);
        }, 1500); 
        return () => clearTimeout(timer);
    }, []);

    // Função CREATE (C)
    const createNews = (newTitle, newContent) => {
        const newPost = {
            id: Date.now().toString(),
            title: newTitle,
            content: newContent,
            author: 'Usuário Logado',
        };
        setNewsList(prevList => [newPost, ...prevList]);
    };

    // Função UPDATE (U)
    const updateNews = (id, updatedTitle, updatedContent) => {
        setNewsList(prevList =>
            prevList.map(news =>
                news.id === id
                    ? { ...news, title: updatedTitle, content: updatedContent }
                    : news
            )
        );
    };

    // Função DELETE (D)
    const deleteNews = (id) => {
        setNewsList(prevList => prevList.filter(news => news.id !== id));
    };

    const contextValue = {
        newsList,
        isLoading,
        createNews,
        updateNews,
        deleteNews,
    };

    return (
        <NewsContext.Provider value={contextValue}>
            {children}
        </NewsContext.Provider>
    );
};