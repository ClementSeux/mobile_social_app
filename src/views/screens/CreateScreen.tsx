import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CreateScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>➕</Text>
      <Text style={styles.title}>Create Post</Text>
      <Text style={styles.subtitle}>Share your thoughts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
    backgroundColor: '#f8f9fa',
  },
  icon: {
    fontSize: 64,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#868e96',
  },
});
