import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { TextInput, Button, Text, Surface, useTheme, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
  },
};

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const { colors } = useTheme();

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    console.log('Verifying OTP:', otpValue);
    // Add your verification logic here
  };

  const handleResend = () => {
    console.log('Resending OTP');
    // Add your resend logic here
  };

  return (
    <PaperProvider theme={theme}>
      <Surface style={styles.container}>
        <Text style={styles.title} variant="headlineSmall">
          OTP Verification
        </Text>
        
        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.input}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              mode="outlined"
              dense
            />
          ))}
        </View>

        <View style={styles.actionContainer}>
          <Text variant="bodyMedium" style={styles.resendText}>
            Don't get the code?{' '}
            <Text onPress={handleResend} style={styles.resendLink}>
              Resend
            </Text>
          </Text>

          <Button
            mode="contained"
            onPress={handleVerify}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Verify
          </Button>
        </View>
      </Surface>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  actionContainer: {
    alignItems: 'center',
  },
  resendText: {
    marginBottom: 15,
  },
  resendLink: {
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 3,
  },
});

export default OTPVerification;