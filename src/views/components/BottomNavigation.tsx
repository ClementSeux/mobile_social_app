import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

type TabType = 'home' | 'search' | 'create' | 'notifications' | 'profile';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity style={styles.button} onPress={() => onTabChange('home')}>
        <Text style={[styles.icon, activeTab === 'home' && styles.iconActive]}>🏠</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onTabChange('search')}>
        <Text style={[styles.icon, activeTab === 'search' && styles.iconActive]}>🔍</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.createButton]} onPress={() => onTabChange('create')}>
        <Text style={styles.createIcon}>➕</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onTabChange('notifications')}>
        <Text style={[styles.icon, activeTab === 'notifications' && styles.iconActive]}>🔔</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onTabChange('profile')}>
        <Text style={[styles.icon, activeTab === 'profile' && styles.iconActive]}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
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
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  icon: {
    fontSize: 26,
    opacity: 0.5,
  },
  iconActive: {
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
