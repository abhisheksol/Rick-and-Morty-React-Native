// HomePage.js
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

const CardComponent = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomePage = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch characters from API
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character/');
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handlePress = (title) => {
    if (title === 'Alive Characters') {
      navigation.navigate('CharacterCard', { characters: characters.filter(c => c.status === 'Alive') });
    }
    if (title === 'All Characters') {
        navigation.navigate('All_Char');
      }
      else if (title === 'Dead Characters') {
        navigation.navigate('CharacterCard', { characters: characters.filter(c => c.status === 'Dead') });
      }

    
    // Handle other cases if needed
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CardComponent title="All Characters" onPress={() => handlePress('All Characters')} />
      <CardComponent title="Alive Characters" onPress={() => handlePress('Alive Characters')} />
      <CardComponent title="Dead Characters" onPress={() => handlePress('Dead Characters')} />
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cardContainer: {
    width: '100%',
    marginVertical: 10,
  },
  card: {
    borderRadius: 10,
    height: 300,
    padding: 15,
    elevation: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
