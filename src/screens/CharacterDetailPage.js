import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

const CharacterDetailPage = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.error('Error fetching character data:', error));
  }, [characterId]);

  const renderEpisode = ({ item, index }) => {
    const episodeNumber = item.split('/').pop(); // Extract episode number from URL
    return (
      <View style={styles.episodeContainer}>
        <Text style={styles.episodeText}>Ep. {episodeNumber}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {character && (
        <>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.name}>{character.name}</Text>
          <Text>Status: {character.status}</Text>
          <Text>Species: {character.species}</Text>
          <Text>Location: {character.location.name}</Text>
          <Text>Episodes:</Text>
          <FlatList
            data={character.episode}
            renderItem={renderEpisode}
            keyExtractor={(item) => item}
            horizontal
            contentContainerStyle={styles.episodeList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  episodeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  episodeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  episodeList: {
    marginTop: 16,
  },
});

export default CharacterDetailPage;
