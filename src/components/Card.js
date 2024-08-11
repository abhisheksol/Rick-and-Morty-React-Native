import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

// Sample images for card
const images = {
  all: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  alive: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
  dead: 'https://rickandmortyapi.com/api/character/avatar/18.jpeg',
};

// Card component with image and description
const CardComponent = ({ title, description, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomePage = () => {
  const navigation = useNavigation();
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
    } else if (title === 'All Characters') {
      navigation.navigate('All_Char');
    } else if (title === 'Dead Characters') {
      navigation.navigate('CharacterCard', { characters: characters.filter(c => c.status === 'Dead') });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      
      <View style={{height:"100%"}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Rick and Morty Characters</Text>
        <Text style={styles.info}>Explore different categories of characters from the Rick and Morty universe. Tap on a category to view characters who are either alive, dead, or all characters.</Text>
      </View>
        <ScrollView
          contentContainerStyle={styles.container}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <CardComponent
            title="All Characters"
            description="Browse through the complete list of characters from Rick and Morty."
            image={images.all}
            onPress={() => handlePress('All Characters')}
          />
          <CardComponent
            title="Alive Characters"
            description="See all characters who are currently alive."
            image={images.alive}
            onPress={() => handlePress('Alive Characters')}
          />
          <CardComponent
            title="Dead Characters"
            description="Find out which characters are no longer with us."
            image={images.dead}
            onPress={() => handlePress('Dead Characters')}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'purple',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: 250, // Adjust the width as needed
    marginHorizontal: 10,
  }, 
  titleContainer: {
    // position:'absolute',
    alignItems: 'center',
    
    backgroundColor: 'purple'
  },
  card: {
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  title: {
    marginTop:30,
    fontSize: 29,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },  
  info: {
    fontSize: 22,
    marginLeft:26,
    color: 'black',
    // textAlign: 'center',
    paddingHorizontal: 10,
  },
});
