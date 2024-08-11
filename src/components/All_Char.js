import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const CharacterCard = () => {
  const [characters, setCharacters] = useState([]);
  const navigation = useNavigation(); // Get the navigation prop

  useEffect(() => {
    // Fetch data from the API
    fetch('https://rickandmortyapi.com/api/character/')
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handlePress = (characterId) => {
    // Navigate to the CharacterDetailPage with characterId
    navigation.navigate('Character Detail', { characterId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Species: {item.species}</Text>
      <Text>Location: {item.location.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={characters}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CharacterCard;
