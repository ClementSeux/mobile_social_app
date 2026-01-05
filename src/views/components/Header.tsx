import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.icon}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Text style={styles.iconText}>💬</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  icons: {
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    padding: 8,
  },
  iconText: {
    fontSize: 22,
  },
});
