import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio } from "expo-av";

const API_ENDPOINT = "https://en.wikipedia.org/api/rest_v1/page/summary/";

const LessonList = () => {
  const [pages, setPages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_ENDPOINT}Brazil`);
      const data = await response.json();
      setPages(data);
    };
    fetchData();
  }, []);

  if (!pages) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={pages}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Text>{item.title}</Text>
          <Image source={{ uri: item.thumbnail.source }} />
          <Text>{item.extract}</Text>
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
      await soundObject.loadAsync(require("./audio/greetings.mp3"));
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
        title={isPlaying ? "Pause" : "Play"}
        onPress={() => {
          setIsPlaying(!isPlaying);
          handlePlayPress();
        }}
      />
    </View>
  );
};

export default LessonScreen;
