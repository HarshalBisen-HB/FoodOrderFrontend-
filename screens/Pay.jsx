import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Platform, TextInput } from 'react-native';
import { Text, Button, IconButton, Surface, RadioButton } from 'react-native-paper';
import { ArrowLeft, CreditCard, Wallet, DollarSign } from 'lucide-react-native';

const Payment = ({ route, navigation }) => {
  const { amount = 0, items = [] } = route.params || {};
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBackToBilling = () => {
    navigation.goBack();
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.slice(0, 19);
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return false;
      }
      if (!cardExpiry || cardExpiry.length !== 5) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
      }
      if (!cardCVV || cardCVV.length !== 3) {
        alert('Please enter a valid 3-digit CVV');
        return false;
      }
      if (!cardName || cardName.trim().length < 3) {
        alert('Please enter the cardholder name');
        return false;
      }
    } else if (paymentMethod === 'upi') {
      // Add UPI validation if needed
      return true;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) {
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to thank you page
      navigation.navigate('Go-ThankYou');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentMethodOption = (value, label, icon) => (
    <Surface style={styles.paymentOption} elevation={1}>
      <RadioButton.Item
        value={value}
        label={label}
        position="leading"
        labelStyle={styles.paymentOptionLabel}
        status={paymentMethod === value ? 'checked' : 'unchecked'}
        onPress={() => setPaymentMethod(value)}
        icon={() => icon}
      />
    </Surface>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={() => <ArrowLeft className="h-6 w-6" />}
          size={24}
          onPress={handleBackToBilling}
        />
        <Text variant="headlineMedium" style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Surface style={styles.amountCard} elevation={1}>
            <Text variant="titleLarge" style={styles.amountTitle}>Amount to Pay</Text>
            <Text variant="displaySmall" style={styles.amount}>₹{amount.toFixed(2)}</Text>
          </Surface>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>Payment Method</Text>
            <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>
              <View style={styles.paymentOptions}>
                {renderPaymentMethodOption('card', 'Credit/Debit Card', <CreditCard size={24} />)}
                {renderPaymentMethodOption('upi', 'UPI Payment', <Wallet size={24} />)}
                {renderPaymentMethodOption('cod', 'Cash on Delivery', <DollarSign size={24} />)}
              </View>
            </RadioButton.Group>
          </View>

          {paymentMethod === 'card' && (
            <Surface style={styles.cardDetailsCard} elevation={1}>
              <Text variant="titleMedium" style={styles.cardDetailsTitle}>Card Details</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChangeText={(text) => setCardExpiry(formatExpiry(text))}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>

                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    value={cardCVV}
                    onChangeText={setCardCVV}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  value={cardName}
                  onChangeText={setCardName}
                  autoCapitalize="words"
                />
              </View>
            </Surface>
          )}

          {paymentMethod === 'upi' && (
            <Surface style={styles.upiCard} elevation={1}>
              <Text variant="titleMedium" style={styles.cardDetailsTitle}>UPI Payment</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>UPI ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="username@upi"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </Surface>
          )}

          {paymentMethod === 'cod' && (
            <Surface style={styles.codCard} elevation={1}>
              <Text variant="bodyLarge" style={styles.codText}>
                Please keep exact change ready at the time of delivery.
              </Text>
            </Surface>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button 
          mode="contained" 
          style={styles.payButton}
          contentStyle={styles.buttonContent}
          loading={loading}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing Payment...' : `Pay ₹${amount.toFixed(2)}`}
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
    paddingBottom: 100,
  },
  amountCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  amountTitle: {
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    color: '#E53935',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#333',
    fontWeight: '600',
  },
  paymentOptions: {
    gap: 12,
  },
  paymentOption: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  paymentOptionLabel: {
    color: '#333',
  },
  cardDetailsCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  cardDetailsTitle: {
    marginBottom: 16,
    color: '#333',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputLabel: {
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    color: '#333',
  },
  upiCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  codCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  codText: {
    color: '#666',
    textAlign: 'center',
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
  payButton: {
    backgroundColor: '#E53935',
  },
  buttonContent: {
    height: 48,
  },
});

export default Payment;