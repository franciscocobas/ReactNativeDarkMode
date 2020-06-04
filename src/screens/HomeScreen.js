import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const theme = useSelector(({ theme }) => theme);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: theme.colors.text, textAlign: 'center', fontSize: 20 }}>Hello Dark Mode!</Text>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>{theme.dark ? '🌛' : '☀️'}</Text>
    </View>
  );
};

export default HomeScreen;