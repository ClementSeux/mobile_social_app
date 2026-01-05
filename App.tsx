import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';

// Mock Data
const POSTS = [
  {
    id: '1',
    author: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    time: '2h ago',
    content: 'Just launched our new AI feature! Check it out 🚀',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    id: '2',
    author: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/150?img=12',
    time: '5h ago',
    content: 'Beautiful sunset at the beach today 🌅',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    likes: 567,
    comments: 89,
    shares: 23,
  },
  {
    id: '3',
    author: 'Emma Davis',
    avatar: 'https://i.pravatar.cc/150?img=5',
    time: '1d ago',
    content: 'Working on something exciting! Stay tuned ✨',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    likes: 892,
    comments: 134,
    shares: 45,
  },
];

const STORIES = [
  { id: '1', name: 'Your Story', avatar: 'https://i.pravatar.cc/150?img=30', isYou: true },
  { id: '2', name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: '3', name: 'Jordan', avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: '4', name: 'Taylor', avatar: 'https://i.pravatar.cc/150?img=25' },
  { id: '5', name: 'Morgan', avatar: 'https://i.pravatar.cc/150?img=33' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const renderPost = ({ item }: { item: typeof POSTS[0] }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
        <View style={styles.postHeaderText}>
          <Text style={styles.postAuthor}>{item.author}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}

      <View style={styles.postStats}>
        <Text style={styles.statText}>
          {likedPosts.has(item.id) ? item.likes + 1 : item.likes} likes
        </Text>
        <Text style={styles.statText}>{item.comments} comments</Text>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
        >
          <Text style={styles.actionIcon}>
            {likedPosts.has(item.id) ? '❤️' : '🤍'}
          </Text>
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

  const renderStory = (story: typeof STORIES[0], index: number) => (
    <TouchableOpacity key={story.id} style={styles.storyContainer}>
      <View style={[styles.storyRing, story.isYou && styles.addStoryRing]}>
        <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
        {story.isYou && (
          <View style={styles.addStoryButton}>
            <Text style={styles.addStoryIcon}>+</Text>
          </View>
        )}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {story.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AtomicAI</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.headerIconText}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'home' && (
        <>
          {/* Stories */}
          <View style={styles.storiesSection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesContent}
            >
              {STORIES.map((story, index) => renderStory(story, index))}
            </ScrollView>
          </View>

          {/* Feed */}
          <FlatList
            data={POSTS}
            renderItem={renderPost}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.feed}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      {activeTab === 'search' && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>Search</Text>
          <Text style={styles.emptySubtext}>Discover new content</Text>
        </View>
      )}

      {activeTab === 'create' && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>➕</Text>
          <Text style={styles.emptyText}>Create Post</Text>
          <Text style={styles.emptySubtext}>Share your thoughts</Text>
        </View>
      )}

      {activeTab === 'notifications' && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>Notifications</Text>
          <Text style={styles.emptySubtext}>No new notifications</Text>
        </View>
      )}

      {activeTab === 'profile' && (
        <ScrollView style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=30' }} 
              style={styles.profileAvatar}
            />
            <Text style={styles.profileName}>Your Name</Text>
            <Text style={styles.profileBio}>
              AI Enthusiast | Tech Lover | Creator
            </Text>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>142</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>2.5K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>342</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>
            🏠
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => setActiveTab('search')}
        >
          <Text style={[styles.navIcon, activeTab === 'search' && styles.navIconActive]}>
            🔍
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, styles.createButton]}
          onPress={() => setActiveTab('create')}
        >
          <Text style={styles.createIcon}>➕</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => setActiveTab('notifications')}
        >
          <Text style={[styles.navIcon, activeTab === 'notifications' && styles.navIconActive]}>
            🔔
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.navIcon, activeTab === 'profile' && styles.navIconActive]}>
            👤
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    padding: 8,
  },
  headerIconText: {
    fontSize: 22,
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
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 75,
  },
  storyRing: {
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
  storyAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  addStoryButton: {
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
  addStoryIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  storyName: {
    fontSize: 12,
    color: '#495057',
    textAlign: 'center',
  },
  feed: {
    paddingBottom: 90,
  },
  postCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  postAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  postHeaderText: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  postTime: {
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
  postContent: {
    fontSize: 15,
    color: '#1a1a1a',
    lineHeight: 22,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#e9ecef',
  },
  postStats: {
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
  postActions: {
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#868e96',
  },
  profileContainer: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  profileBio: {
    fontSize: 14,
    color: '#868e96',
    textAlign: 'center',
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e9ecef',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#868e96',
  },
  editProfileButton: {
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 26,
    opacity: 0.5,
  },
  navIconActive: {
    opacity: 1,
  },
  createButton: {
    marginTop: -15,
  },
  createIcon: {
    fontSize: 26,
    backgroundColor: '#6366f1',
    width: 50,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    lineHeight: 50,
    color: '#fff',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
