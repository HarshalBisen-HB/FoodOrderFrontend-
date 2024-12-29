import React from 'react';
import { StyleSheet, View, ScrollView, Image, Platform } from 'react-native';
import { Text, Button, IconButton, Surface } from 'react-native-paper';

const Billing = ({ route, navigation }) => {
  const { cartItems = [] } = route.params || {};

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleBackToMenu = () => {
    navigation.navigate('Go-Menu');
  };

  const handlePlaceOrder = () => {
    navigation.navigate('Go-Pay', { 
      amount: calculateTotal() + 40, // Including delivery fee
      items: cartItems 
    });
  };

  const renderCartItem = (item) => (
    <Surface key={item.id} style={styles.cartItem} elevation={1}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetails}>
        <Text variant="titleMedium" style={styles.itemName}>{item.name}</Text>
        <Text variant="bodyMedium" style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Text variant="bodyMedium" style={styles.quantityText}>
            Quantity: {item.quantity}
          </Text>
          <Text variant="bodyMedium" style={styles.itemTotal}>
            Total: ₹{(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </Surface>
  );

  if (!cartItems.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="headlineMedium" style={styles.emptyText}>Your cart is empty</Text>
        <Button 
          mode="contained" 
          style={styles.browseButton}
          onPress={handleBackToMenu}
        >
          Browse Menu
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"  // Using React Native Paper's built-in arrow-left icon
          size={24}
          onPress={handleBackToMenu}
        />
        <Text variant="headlineMedium" style={styles.headerTitle}>Billing Details</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>Order Items</Text>
            <View style={styles.cartItems}>
              {cartItems.map(renderCartItem)}
            </View>
          </View>

          <Surface style={styles.summaryCard} elevation={1}>
            <Text variant="titleLarge" style={styles.summaryTitle}>Order Summary</Text>
            
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text variant="bodyLarge">Items Total</Text>
                <Text variant="bodyLarge">₹{calculateTotal().toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text variant="bodyLarge">Number of Items</Text>
                <Text variant="bodyLarge">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text variant="bodyLarge">Delivery Fee</Text>
                <Text variant="bodyLarge">₹40.00</Text>
              </View>

              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text variant="titleMedium" style={styles.totalLabel}>Total Amount</Text>
                <Text variant="titleMedium" style={styles.totalAmount}>
                  ₹{(calculateTotal() + 40).toFixed(2)}
                </Text>
              </View>
            </View>
          </Surface>

          <View style={styles.deliverySection}>
            <Text variant="titleLarge" style={styles.sectionTitle}>Delivery Information</Text>
            <Surface style={styles.deliveryCard} elevation={1}>
              <Text variant="bodyLarge" style={styles.deliveryTime}>
                Estimated Delivery Time: 30-45 minutes
              </Text>
              <Text variant="bodyMedium" style={styles.deliveryNote}>
                * Delivery time may vary based on traffic and weather conditions
              </Text>
            </Surface>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomContainer, Platform.OS === 'android' && styles.androidBottomContainer]}>
        <Button 
          mode="contained" 
          style={styles.placeOrderButton}
          contentStyle={styles.buttonContent}
          onPress={handlePlaceOrder}
        >
          Proceed to Pay (₹{(calculateTotal() + 40).toFixed(2)})
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: Platform.OS === 'android' ? 8 : 16,
  },
  headerTitle: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: Platform.OS === 'android' ? 80 : 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#333',
    fontWeight: '600',
  },
  cartItems: {
    gap: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    padding: 12,
  },
  itemName: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  itemPrice: {
    color: '#E53935',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    color: '#666',
  },
  itemTotal: {
    fontWeight: '600',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  summaryContent: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    color: '#E53935',
    fontWeight: '600',
  },
  deliverySection: {
    marginBottom: 24,
  },
  deliveryCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  deliveryTime: {
    color: '#333',
    marginBottom: 8,
  },
  deliveryNote: {
    color: '#666',
    fontStyle: 'italic',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.9)' : 'white',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)',
      },
      android: {
        elevation: 4,
      },
    }),
  },
  androidBottomContainer: {
    elevation: 8,
    backgroundColor: 'white',
  },
  placeOrderButton: {
    backgroundColor: '#E53935',
  },
  buttonContent: {
    height: 48,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#E53935',
  },
});

export default Billing;