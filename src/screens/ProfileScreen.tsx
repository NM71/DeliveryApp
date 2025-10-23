import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../common';
import { Button } from '../common';

const ProfileScreen = () => {
  const menuItems = [
    { id: 1, title: 'Personal Information', icon: <Ionicons name="person-outline" size={20} color={COLORS.text} /> },
    { id: 2, title: 'Order History', icon: <Feather name="clipboard" size={20} color={COLORS.text} /> },
    { id: 3, title: 'Saved Addresses', icon: <Ionicons name="home-outline" size={20} color={COLORS.text} /> },
    { id: 4, title: 'Payment Methods', icon: <FontAwesome name="credit-card" size={20} color={COLORS.text} /> },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Profile</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>johndoe@email.com</Text>
        </View>
      </View>

      {/* Loyalty Points */}
      <View style={styles.pointsCard}>
        <View style={styles.pointsHeader}>
          <Text style={styles.pointsLabel}>Loyalty Points</Text>
          <Text style={styles.pointsNumber}>1,250</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill}></View>
        </View>
        <Text style={styles.pointsText}>50 points away from your next reward!</Text>
      </View>

      {/* Menu List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              {item.icon}
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      />

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.greyLight,
    paddingHorizontal: SPACING.l,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZE.l,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  headerRight: {
    width: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: BORDER_RADIUS.circle,
    marginRight: SPACING.l,
  },
  name: {
    fontSize: FONT_SIZE.l,
    fontWeight: '700',
    color: COLORS.text,
  },
  email: {
    fontSize: FONT_SIZE.s,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  pointsCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.l,
    borderRadius: BORDER_RADIUS.l,
    marginTop: SPACING.xl,
    elevation: 2,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  pointsLabel: {
    fontSize: FONT_SIZE.l,
    fontWeight: '600',
    color: COLORS.text,
  },
  pointsNumber: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressBarContainer: {
    backgroundColor: COLORS.textLight,
    height: 8,
    borderRadius: BORDER_RADIUS.m,
    overflow: 'hidden',
    marginBottom: SPACING.s,
  },
  progressBarFill: {
    backgroundColor: COLORS.primary,
    height: '100%',
    width: '85%',
  },
  pointsText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
  },
  menuItem: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.l,
    borderRadius: BORDER_RADIUS.m,
    marginTop: SPACING.s,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.s,
  },
  menuText: {
    fontSize: FONT_SIZE.m,
    color: COLORS.text,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xl,
    alignSelf: 'flex-start',
  },
  logoutText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.m,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
});
