import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
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

  const renderEpisode = ({ item }) => {
    const episodeNumber = item.split('/').pop(); // Extract episode number from URL
    return (
      <View style={styles.episodeContainer}>
        <Text style={styles.episodeText}>Episode {episodeNumber}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {character && (
        <>
          <Image source={{ uri: character.image }} style={styles.image} />
          <View style={styles.detailCard}>
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.detailText}>Status: <Text style={styles.valueText}>{character.status}</Text></Text>
            <Text style={styles.detailText}>Species: <Text style={styles.valueText}>{character.species}</Text></Text>
            <Text style={styles.detailText}>Location: <Text style={styles.valueText}>{character.location.name}</Text></Text>
          </View>
          <Text style={styles.episodeTitle}>Episodes:</Text>
          <FlatList
            data={character.episode}
            renderItem={renderEpisode}
            keyExtractor={(item) => item}
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
    backgroundColor: 'rgb(35,49,65)',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailCard: {
    backgroundColor: 'rgb(44,57,73)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f9f9f9',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 18,
    color: '#c0c0c0',
    marginBottom: 8,
  },
  valueText: {
    color: '#f4bc67',
    fontWeight: 'bold',
  },
  episodeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4bc67',
    marginBottom: 12,
  },
  episodeContainer: {
    backgroundColor: 'rgb(244,188,103)',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  episodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  episodeList: {
    paddingHorizontal: 4,
  },
});

export default CharacterDetailPage;
