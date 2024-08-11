import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Replace with your actual API URL
const API_URL = 'https://rickandmortyapi.com/api/character';

const CharacterListingPage = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Get the navigation prop

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacters(data.results);
        setFilteredCharacters(data.results); // Initialize filtered characters
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter characters based on search query
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchQuery, characters]);

  const handlePress = (characterId) => {
    // Navigate to CharacterDetailPage with characterId
    navigation.navigate('Character Detail', { characterId });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search characters..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.card}>
            <Text style={styles.characterName}>{item.name}</Text>
            <Text style={styles.characterDetails}>Species: {item.species}</Text>
            <Text style={styles.characterDetails}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2a38',
    padding: 20,
  },
  searchInput: {
    width: '100%',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
    backgroundColor: '#333',
    color: '#fff',
  },
  card: {
    backgroundColor: '#2d3a47',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f9f9f9',
  },
  characterDetails: {
    fontSize: 16,
    color: '#c0c0c0',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CharacterListingPage;

