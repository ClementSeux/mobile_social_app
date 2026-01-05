import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Post } from '../../models';

interface PostCardProps {
  post: Post;
  isLiked: boolean;
  onLike: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isLiked, onLike }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.time}>{post.time}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image && <Image source={{ uri: post.image }} style={styles.image} />}

      <View style={styles.stats}>
        <Text style={styles.statText}>{post.likes} likes</Text>
        <Text style={styles.statText}>{post.comments} comments</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onLike(post.id)}>
          <Text style={styles.actionIcon}>{isLiked ? '❤️' : '🤍'}</Text>
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  author: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  time: {
    fontSize: 13,
    color: '#868e96',
  },
  moreButton: {
    padding: 8,
  },
  moreIcon: {
    fontSize: 20,
    color: '#868e96',
  },
  content: {
    fontSize: 15,
    color: '#1a1a1a',
    lineHeight: 22,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#e9ecef',
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
  },
  statText: {
    fontSize: 13,
    color: '#495057',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 8,
    paddingHorizontal: 5,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 6,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
});
