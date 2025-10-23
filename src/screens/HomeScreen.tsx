import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, addToCart } from '../store/slices/cartSlice';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/StackNavigator';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../common';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={COLORS.primary} />
          <Text style={styles.locationText}>2464 Royal Ln.</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="bag-outline" size={24} color={COLORS.text} />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products, brands..."
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Promotional Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoContainer}>
          <View style={styles.promoCard}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'
              }}
              style={styles.promoImage}
            />
            <Text style={styles.promoText}>Weekly Deals: Up to 30% Off</Text>
          </View>
          <View style={[styles.promoCard, styles.promoCardOrange]}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400'
              }}
              style={styles.promoImage}
            />
            <Text style={styles.promoText}>Fresh</Text>
          </View>
        </ScrollView>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
                <Ionicons name="leaf-outline" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.categoryText}>Fruits & Veggies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="storefront-outline" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.categoryText}>Bakery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="water-outline" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.categoryText}>Dairy & Eggs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="wine-outline" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.categoryText}>Beverages</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', {
                product: {
                  name: 'Organic Bananas',
                  price: '1.99',
                  image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
                  brand: 'Fresh Fields'
                }
              })}
            >
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400'
                }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>Organic Bananas</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>$1.99</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => dispatch(addToCart({
                    id: 'organic-bananas',
                    name: 'Organic Bananas',
                    price: '1.99',
                    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
                    brand: 'Fresh Fields'
                  }))}
                >
                  <Ionicons name="add" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', {
                product: {
                  name: 'Sourdough Bread',
                  price: '4.50',
                  image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
                  brand: 'Fresh Fields'
                }
              })}
            >
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400'
                }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>Sourdough Bread</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>$4.50</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => dispatch(addToCart({
                    id: 'sourdough-bread',
                    name: 'Sourdough Bread',
                    price: '4.50',
                    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
                    brand: 'Fresh Fields'
                  }))}
                >
                  <Ionicons name="add" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', {
                product: {
                  name: 'Fresh Produce',
                  price: '3.25',
                  image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
                  brand: 'Fresh Fields'
                }
              })}
            >
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400'
                }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>Fresh Produce</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>$3.25</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => dispatch(addToCart({
                    id: 'fresh-produce',
                    name: 'Fresh Produce',
                    price: '3.25',
                    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
                    brand: 'Fresh Fields'
                  }))}
                >
                  <Ionicons name="add" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Shop by Brand */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Brand</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.brandCard}>
              <View style={[styles.brandLogo, { backgroundColor: COLORS.brandDark }]}>
                <Text style={styles.brandText}>A</Text>
              </View>
            </View>
            <View style={styles.brandCard}>
              <View style={[styles.brandLogo, { backgroundColor: COLORS.brandRed }]}>
                <Text style={styles.brandText}>B</Text>
              </View>
            </View>
            <View style={styles.brandCard}>
              <View style={[styles.brandLogo, { backgroundColor: COLORS.brandDark }]}>
                <Text style={styles.brandText}>C</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.l,
    backgroundColor: COLORS.white,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.l,
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.circle,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: FONT_SIZE.m,
    fontWeight: 'bold',
    marginLeft: SPACING.s,
    color: COLORS.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.l,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.l,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greyLight,
    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    marginBottom: SPACING.l,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.m,
    color: COLORS.text,
  },
  promoContainer: {
    marginBottom: SPACING.xxl,
  },
  promoCard: {
    width: 280,
    backgroundColor: COLORS.successLight,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginRight: SPACING.l,
  },
  promoCardOrange: {
    backgroundColor: COLORS.warningLight,
  },
  promoImage: {
    width: '100%',
    height: 120,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.l,
  },
  promoText: {
    fontSize: FONT_SIZE.l,
    fontWeight: '600',
    color: COLORS.text,
  },
  section: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLORS.greyLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  categoryText: {
    fontSize: FONT_SIZE.s,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  productCard: {
    width: 140,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.l,
    marginRight: SPACING.l,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: BORDER_RADIUS.s,
    marginBottom: SPACING.s,
  },
  productName: {
    fontSize: FONT_SIZE.s,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: FONT_SIZE.m,
    fontWeight: '700',
    color: COLORS.text,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandCard: {
    marginRight: SPACING.l,
  },
  brandLogo: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.white,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.l,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.s,
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  floatingScanButton: {
    position: 'absolute',
    bottom: 85,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 12,
    zIndex: 10,
  },
});

export default HomeScreen;
