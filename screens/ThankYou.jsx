import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { CheckCircle2, Clock, MapPin } from 'lucide-react-native';

const OrderConfirmation = ({ route, navigation }) => {
  const { orderId = '', amount = 0, items = [] } = route.params || {};
  
  const handleBackToMenu = () => {
    // Navigate back to menu, clearing the navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Go-Menu' }],
    });
  };

  const estimatedDeliveryTime = () => {
    const now = new Date();
    const delivery = new Date(now.getTime() + 45 * 60000); // 45 minutes from now
    return delivery.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <CheckCircle2 size={80} color="#4CAF50" />
          </View>

          <Text variant="headlineLarge" style={styles.thankYouText}>
            Thank You!
          </Text>
          
          <Text variant="titleMedium" style={styles.subtitle}>
            Your order has been placed successfully
          </Text>

          <Surface style={styles.orderCard} elevation={1}>
            <Text variant="titleMedium" style={styles.orderTitle}>
              Order Details
            </Text>
            
            <View style={styles.orderInfo}>
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Order ID</Text>
                <Text style={styles.orderValue}>{orderId}</Text>
              </View>
              
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Amount Paid</Text>
                <Text style={styles.orderValue}>₹{amount.toFixed(2)}</Text>
              </View>
              
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Items</Text>
                <Text style={styles.orderValue}>{items.length} items</Text>
              </View>
            </View>
          </Surface>

          <Surface style={styles.deliveryCard} elevation={1}>
            <Text variant="titleMedium" style={styles.deliveryTitle}>
              Delivery Information
            </Text>

            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryRow}>
                <Clock size={24} color="#666" />
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryLabel}>Estimated Delivery Time</Text>
                  <Text style={styles.deliveryValue}>{estimatedDeliveryTime()}</Text>
                </View>
              </View>

              <View style={styles.deliveryRow}>
                <MapPin size={24} color="#666" />
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryLabel}>Delivery Address</Text>
                  <Text style={styles.deliveryValue}>
                    123 Main Street, Apartment 4B{'\n'}
                    City, State 12345
                  </Text>
                </View>
              </View>
            </View>
          </Surface>

          <Surface style={styles.instructionsCard} elevation={1}>
            <Text variant="bodyLarge" style={styles.instructions}>
              You will receive an email confirmation with order details shortly.
              Track your order status in real-time through our app.
            </Text>
          </Surface>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button 
          mode="contained" 
          style={styles.menuButton}
          contentStyle={styles.buttonContent}
          onPress={handleBackToMenu}
        >
          Back to Menu
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
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
  thankYouText: {
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  orderTitle: {
    color: '#333',
    fontWeight: '600',
    marginBottom: 16,
  },
  orderInfo: {
    gap: 12,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderLabel: {
    color: '#666',
    fontSize: 16,
  },
  orderValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  deliveryCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  deliveryTitle: {
    color: '#333',
    fontWeight: '600',
    marginBottom: 16,
  },
  deliveryInfo: {
    gap: 16,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deliveryTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  deliveryLabel: {
    color: '#666',
    marginBottom: 4,
  },
  deliveryValue: {
    color: '#333',
    fontWeight: '500',
  },
  instructionsCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  instructions: {
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)',
      },
    }),
  },
  menuButton: {
    backgroundColor: '#4CAF50', // Changed to green for success state
  },
  buttonContent: {
    height: 48,
  },
});

export default OrderConfirmation;