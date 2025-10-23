import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../common';
import { Button } from '../common';

interface RouteParams {
  product: {
    name: string;
    price: string;
    image: string;
    brand?: string;
  };
}

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { product } = route.params as RouteParams;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const relatedProducts = [
    {
      id: 'strawberries-1',
      name: 'Organic Strawberries',
      price: '4.99',
      image: 'https://images.unsplash.com/photo-1543528176-61b239494933?w=400',
      brand: 'Fresh Fields',
    },
    {
      id: 'eggs-1',
      name: 'Organic Eggs',
      price: '5.50',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
      brand: 'Farm Fresh',
    },
    {
      id: 'milk-1',
      name: 'Whole Milk',
      price: '3.99',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
      brand: 'Dairy Best',
    },
  ];

  const handleAddToCart = () => {
    // Generate a unique ID for the cart item
    const cartId = `${product.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

    dispatch(addToCart({
      id: cartId,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand || 'Fresh Fields',
    }));
  };

  const renderRelatedProduct = ({ item }: { item: typeof relatedProducts[0] }) => (
    <TouchableOpacity style={styles.relatedProductCard}>
      <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName}>{item.name}</Text>
      <Text style={styles.relatedProductPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="barcode-outline" size={20} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? COLORS.error : COLORS.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        {/* Image Indicators */}
        <View style={styles.indicators}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === 0 && styles.indicatorActive,
              ]}
            />
          ))}
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Title and Brand */}
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productBrand}>{product.brand || 'Fresh Fields'}</Text>

          {/* Price and Quantity */}
          <View style={styles.priceQuantityRow}>
            <Text style={styles.productPrice}>${product.price} / lb</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color={COLORS.textGrey} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description Section */}
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.textGrey} />
          </TouchableOpacity>

          {/* Nutritional Information Section */}
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.textGrey} />
          </TouchableOpacity>

          {/* Customer Reviews Section */}
          <View style={styles.reviewsSection}>
            <Text style={styles.reviewsTitle}>Customer Reviews</Text>

            {/* Rating */}
            <View style={styles.ratingRow}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={16}
                    color={COLORS.star}
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>4.5 (1,283 reviews)</Text>
            </View>

            {/* Review */}
            <View style={styles.reviewCard}>
              <Text style={styles.reviewText}>
                "These are the best bananas I've ever had! So fresh and sweet."
              </Text>
              <Text style={styles.reviewAuthor}>- Sarah J.</Text>
            </View>

            {/* View All Reviews Link */}
            <TouchableOpacity>
              <Text style={styles.viewAllReviews}>View all reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Related Products */}
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>Related Products</Text>
            <FlatList
              data={relatedProducts}
              renderItem={renderRelatedProduct}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedProductsList}
            />
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <View style={styles.addToCartContainer}>
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingTop: 50,
    paddingBottom: SPACING.m,
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.circle,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRight: {
    flexDirection: 'row',
    gap: SPACING.m,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: COLORS.greyLight,
    paddingTop: 100,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    maxWidth: 300,
    height: 200,
    resizeMode: 'contain',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SPACING.l,
    gap: SPACING.s,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textLight,
  },
  indicatorActive: {
    backgroundColor: COLORS.primary,
  },
  contentContainer: {
    paddingHorizontal: SPACING.l,
    paddingBottom: 100,
  },
  productTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  productBrand: {
    fontSize: FONT_SIZE.m,
    color: COLORS.textMuted,
    marginBottom: SPACING.xl,
  },
  priceQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  productPrice: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greyLight,
    borderRadius: BORDER_RADIUS.circle,
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    width: 40,
    textAlign: 'center',
    fontSize: FONT_SIZE.m,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  reviewsSection: {
    paddingVertical: SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewsTitle: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
    gap: SPACING.s,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: FONT_SIZE.s,
    color: COLORS.textGrey,
  },
  reviewCard: {
    backgroundColor: COLORS.greyLight,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.l,
    marginBottom: SPACING.l,
  },
  reviewText: {
    fontSize: FONT_SIZE.s,
    color: COLORS.textGrey,
    marginBottom: SPACING.s,
    fontStyle: 'italic',
  },
  reviewAuthor: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textLight,
  },
  viewAllReviews: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: FONT_SIZE.s,
  },
  relatedSection: {
    paddingTop: SPACING.xl,
  },
  relatedTitle: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  relatedProductsList: {
    paddingBottom: SPACING.m,
  },
  relatedProductCard: {
    width: 120,
    marginRight: SPACING.l,
  },
  relatedProductImage: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.l,
    marginBottom: SPACING.s,
  },
  relatedProductName: {
    fontSize: FONT_SIZE.s,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  relatedProductPrice: {
    fontSize: FONT_SIZE.s,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  addToCartButton: {
    width: '100%',
  },
});

export default ProductDetailScreen;
