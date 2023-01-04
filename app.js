import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, image } from 'react-native';
import { Audio } from 'expo-av';

const lessons = [
  {
    id: '1',
    title: 'Lesson 1: Greetings',
  },
  {
    id: '2',
    title: 'Lesson 2: Basic Phrases',
  },
  {
    id: '3',
    title: 'Lesson 3: Numbers',
  },
  // Add more lessons here
];

const LessonList = () => {
  return (
    <FlatList
      data={lessons}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const LessonScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPress = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./audio/greetings.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  };

  return (
    <View>
      <LessonList />
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={() => {
          setIsPlaying(!isPlaying);
          handlePlayPress();
        }}
      />
    </View>
  );
};

export default LessonScreen;

const API_ENDPOINT = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

const WikipediaScreen = () => {
  const [pageSummary, setPageSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_ENDPOINT}Brazil`);
      const data = await response.json();
      setPageSummary(data);
    };
    fetchData();
  }, []);

  if (!pageSummary) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>{pageSummary.title}</Text>
      <Image source={{ uri: pageSummary.thumbnail.source }} />
      <Text>{pageSummary.extract}</Text>
    </View>
  );
};

export default WikipediaScreen;
