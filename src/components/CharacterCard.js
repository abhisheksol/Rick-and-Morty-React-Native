import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

const CharacterCard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { characters } = route.params || {};

  const handlePress = (characterId) => {
    navigation.navigate('Character Detail', { characterId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {characters && characters.length > 0 ? (
        characters.map(character => (
          <TouchableOpacity
            key={character.id}
            style={styles.card}
            onPress={() => handlePress(character.id)}
          >
            <Image source={{ uri: character.image }} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.status}>{character.status}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noCharactersText}>No characters to display</Text>
      )}
    </ScrollView>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(35,49,65)',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#2d3a47',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f9f9f9',
    marginBottom: 5,
  },
  status: {
    fontSize: 18,
    color: '#f9f9f9',
  },
  noCharactersText: {
    fontSize: 20,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 20,
  },
});

