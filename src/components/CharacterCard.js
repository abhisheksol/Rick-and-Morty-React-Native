// CharacterCard.js
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const CharacterCard = () => {
  const route = useRoute();
  const { characters } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {characters ? (
        characters.map(character => (
          <View key={character.id} style={styles.card}>
            <Image source={{ uri: character.image }} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.status}>{character.status}</Text>
          </View>
        ))
      ) : (
        <Text>No characters to display</Text>
      )}
    </ScrollView>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
});
