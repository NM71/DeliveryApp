import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartSubtotal,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../store/slices/cartSlice';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../common';
import { Button } from '../common';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: string;
    image: string;
    brand: string;
    quantity: number;
  };
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
}

const CartItem = ({ item, onIncrement, onDecrement, onDelete }: CartItemProps) => (
  <View style={styles.cartItem}>
    <Image source={{ uri: item.image }} style={styles.cartItemImage} />
    <View style={styles.cartItemContent}>
      <Text style={styles.cartItemName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.cartItemPrice}>${item.price}</Text>
    </View>
    <View style={styles.cartItemActions}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={onDecrement}
      >
        <Ionicons name="remove" size={20} color={COLORS.textGrey} />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={onIncrement}
      >
        <Ionicons name="add" size={20} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.quantityButton, styles.deleteButton]}
        onPress={onDelete}
      >
        <Ionicons name="trash-outline" size={16} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  </View>
);

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const subtotal = useSelector(selectCartSubtotal);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeFromCart(id)),
        },
      ]
    );
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
      Alert.alert('Success', 'Discount code applied successfully!');
    } else {
      Alert.alert('Error', 'Please enter a discount code');
    }
  };

  const discount = discountApplied ? subtotal * 0.10 : 0;
  const tax = (subtotal - discount) * 0.08;
  const deliveryFee = 5.00;
  const total = subtotal - discount + tax + deliveryFee;

  const renderCartItem = ({ item }: { item: typeof cartItems[0] }) => (
    <CartItem
      item={item}
      onIncrement={() => handleIncrement(item.id)}
      onDecrement={() => handleDecrement(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.emptyContent}>
          <Ionicons name="cart-outline" size={80} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some products to get started
          </Text>
          <Button
            title="Continue Shopping"
            onPress={() => navigation.navigate('MainTabs' as never)}
            style={styles.continueShoppingButton}
          />
        </View>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cartList}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {/* Discount Code */}
            <View style={styles.discountContainer}>
              <Text style={styles.discountTitle}>Discount Code</Text>
              <View style={styles.discountInputContainer}>
                <TextInput
                  style={styles.discountInput}
                  placeholder="Enter discount code"
                  placeholderTextColor={COLORS.textLight}
                  value={discountCode}
                  onChangeText={setDiscountCode}
                />
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApplyDiscount}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Order Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                </View>
                {discountApplied && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabelDiscount}>Discount</Text>
                    <Text style={styles.summaryValueDiscount}>
                      -${discount.toFixed(2)}
                    </Text>
                  </View>
                )}
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Estimated Tax</Text>
                  <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee</Text>
                  <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.summaryRowTotal]}>
                  <Text style={styles.summaryTotal}>Total</Text>
                  <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            {/* Checkout Button */}
            <Button
              title="Proceed to Checkout"
              onPress={() => Alert.alert('Checkout', 'Checkout functionality coming soon!')}
              style={styles.checkoutButton}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.greyLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    paddingTop: 50,
    paddingBottom: SPACING.l,
    backgroundColor: COLORS.white,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerRight: {
    width: 40,
  },
  cartList: {
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.l,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLORS.greyLight,
  },
  cartItemContent: {
    flex: 1,
    marginLeft: SPACING.l,
  },
  cartItemName: {
    fontSize: FONT_SIZE.s,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  cartItemPrice: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.m,
    gap: SPACING.s,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.s,
    backgroundColor: COLORS.greyLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: SPACING.s,
  },
  quantityText: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: FONT_SIZE.m,
    fontWeight: '600',
    color: COLORS.text,
  },
  footer: {
    paddingTop: SPACING.xl,
  },
  discountContainer: {
    marginBottom: SPACING.xl,
  },
  discountTitle: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  discountInputContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  discountInput: {
    flex: 1,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    fontSize: FONT_SIZE.m,
    color: COLORS.text,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.l,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.s,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.m,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginBottom: SPACING.xl,
  },
  summaryTitle: {
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.m,
  },
  summaryRowTotal: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.l,
    marginTop: SPACING.s,
    marginBottom: 0,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.m,
    color: COLORS.textMuted,
  },
  summaryLabelDiscount: {
    fontSize: FONT_SIZE.m,
    color: COLORS.success,
  },
  summaryValue: {
    fontSize: FONT_SIZE.m,
    color: COLORS.text,
    fontWeight: '600',
  },
  summaryValueDiscount: {
    fontSize: FONT_SIZE.m,
    color: COLORS.success,
    fontWeight: '600',
  },
  summaryTotal: {
    fontSize: FONT_SIZE.l,
    fontWeight: '700',
    color: COLORS.text,
  },
  summaryTotalValue: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.greyLight,
    paddingTop: 50,
    paddingHorizontal: SPACING.l,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.l,
    marginBottom: SPACING.s,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.m,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  continueShoppingButton: {
    width: 200,
  },
});

export default CartScreen;
