import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Story } from '../../models';

interface StoryItemProps {
  story: Story;
}

export const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.ring, story.isYou && styles.addStoryRing]}>
        <Image source={{ uri: story.avatar }} style={styles.avatar} />
        {story.isYou && (
          <View style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {story.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15,
    width: 75,
  },
  ring: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#6366f1',
    padding: 3,
    marginBottom: 6,
  },
  addStoryRing: {
    borderColor: '#e9ecef',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  addIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  name: {
    fontSize: 12,
    color: '#495057',
    textAlign: 'center',
  },
});
