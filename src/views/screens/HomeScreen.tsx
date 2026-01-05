import React from 'react';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useHomeViewModel } from '../../viewModels/HomeViewModel';
import { PostCard, StoryItem, Header } from '../components';

export const HomeScreen: React.FC = () => {
  const { posts, stories, toggleLike, isPostLiked } = useHomeViewModel();

  return (
    <View style={styles.container}>
      <Header title="AtomicAI" />

      <View style={styles.storiesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesContent}>
          {stories.map((story) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} isLiked={isPostLiked(item.id)} onLike={toggleLike} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  storiesSection: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 15,
  },
  storiesContent: {
    paddingHorizontal: 15,
  },
  feed: {
    paddingBottom: 90,
  },
});
