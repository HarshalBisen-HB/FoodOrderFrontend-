// Calculator.jsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Card } from 'react-native-paper';

const Calculator = () => {
  const window = useWindowDimensions();
  const [dimensions, setDimensions] = useState({ window });
  const [orientation, setOrientation] = useState('portrait');

  // Responsive button size calculation
  const getButtonSize = () => {
    const screenWidth = window.width;
    const screenHeight = window.height;
    const isPortrait = screenHeight > screenWidth;
    const padding = isPortrait ? 60 : 40;
    const gap = isPortrait ? 15 : 10;
    return (screenWidth - padding - (gap * 3)) / 4;
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
      setOrientation(window.height > window.width ? 'portrait' : 'landscape');
    });

    return () => {
      if (subscription?.remove) {
        subscription.remove();
      }
    };
  }, []);

  const [history, setHistory] = useState('');
  const [result, setResult] = useState('');

  const buttons = [
    ['AC', 'DEL', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  // Calculator logic functions
  const clearAll = () => {
    setHistory('');
    setResult('');
  };

  const deleteLast = () => {
    setResult(result.slice(0, -1));
  };

  const handleButtonPress = (buttonValue) => {
    if (buttonValue === 'AC') {
      clearAll();
      return;
    }

    if (buttonValue === 'DEL') {
      deleteLast();
      return;
    }

    if (buttonValue === '=') {
      calculate();
      return;
    }

    const value = buttonValue === '×' ? '*' : buttonValue === '÷' ? '/' : buttonValue;
    const lastChar = result.slice(-1);
    const operators = ['+', '-', '*', '/', '%'];

    if (operators.includes(value) && operators.includes(lastChar)) {
      setResult(result.slice(0, -1) + value);
      return;
    }

    if (value === '.') {
      const parts = result.split(/[\+\-\*\/]/);
      const lastNumber = parts[parts.length - 1];
      if (lastNumber.includes('.')) return;
    }

    setResult(result + value);
  };

  const calculate = () => {
    try {
      if (!result) return;

      const processedExpression = result
        .replace(/%/g, '/100')
        .replace(/÷/g, '/')
        .replace(/×/g, '*');
      const evaluatedResult = Function('"use strict";return (' + processedExpression + ')')();
      const formattedResult = Number.isInteger(evaluatedResult)
        ? evaluatedResult.toString()
        : evaluatedResult.toFixed(8).replace(/\.?0+$/, '');

      setHistory(`${result} =`);
      setResult(formattedResult);
    } catch (error) {
      setResult('Error');
      setTimeout(() => setResult(''), 1500);
    }
  };

  // Dynamic styles based on orientation and platform
  const getResponsiveStyles = () => {
    const isPortrait = orientation === 'portrait';
    const buttonSize = getButtonSize();
    
    return StyleSheet.create({
      container: {
        
        flex: 1,
        backgroundColor: '#121212',
      },
      calculator: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#121212',
        paddingTop: Platform.select({ web: isPortrait ? 20 : 10, default: 0 }),
      },
      displayContainer: {
        marginTop: isPortrait ? 60 : 20,
        marginHorizontal: 20,
        backgroundColor: '#1e1e1e',
        borderRadius: 25,
        elevation: 4,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          },
          web: {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
          },
        }),
      },
      display: {
        padding: 20,
        minHeight: isPortrait ? 180 : 120,
        justifyContent: 'flex-end',
      },
      historyText: {
        fontSize: isPortrait ? 24 : 20,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'right',
        marginBottom: 10,
      },
      resultText: {
        fontSize: isPortrait ? 48 : 36,
        color: '#ffffff',
        textAlign: 'right',
        fontWeight: '300',
        letterSpacing: 1,
      },
      buttonsContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: isPortrait ? 20 : 15,
        paddingTop: isPortrait ? 30 : 20,
        backgroundColor: '#1e1e1e',
        elevation: 8,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
          },
          web: {
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.2)',
          },
        }),
      },
      buttons: {
        gap: isPortrait ? 15 : 10,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: isPortrait ? 15 : 10,
      },
      button: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        elevation: 2,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          },
          web: {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            ':hover': {
              opacity: 0.9,
            },
          },
        }),
      },
      buttonText: {
        fontSize: isPortrait ? 28 : 24,
        color: '#ffffff',
        fontWeight: '400',
      },
      functionButton: {
        backgroundColor: 'rgba(233, 30, 99, 0.15)',
      },
      functionButtonText: {
        color: '#e91e63',
        fontWeight: '600',
      },
      operatorButton: {
        backgroundColor: 'rgba(3, 218, 197, 0.15)',
      },
      operatorButtonText: {
        color: '#03dac4',
        fontWeight: '600',
      },
      equalButton: {
        flex: 2,
        backgroundColor: 'rgba(98, 0, 238, 0.25)',
      },
      zeroButton: {
        flex: 2,
      },
    });
  };

  const styles = getResponsiveStyles();

  const getButtonStyle = (button) => {
    if (['AC', 'DEL'].includes(button)) {
      return [styles.button, styles.functionButton];
    }
    if (['+', '-', '×', '÷', '%'].includes(button)) {
      return [styles.button, styles.operatorButton];
    }
    if (button === '=') {
      return [styles.button, styles.equalButton];
    }
    if (button === '0') {
      return [styles.button, styles.zeroButton];
    }
    return [styles.button];
  };

  const getButtonTextStyle = (button) => {
    if (['AC', 'DEL'].includes(button)) {
      return [styles.buttonText, styles.functionButtonText];
    }
    if (['+', '-', '×', '÷', '%', '='].includes(button)) {
      return [styles.buttonText, styles.operatorButtonText];
    }
    return [styles.buttonText];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.calculator}>
        <Card style={styles.displayContainer}>
          <View style={styles.display}>
            <Text style={styles.historyText} numberOfLines={1} adjustsFontSizeToFit>
              {history}
            </Text>
            <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
              {result || '0'}
            </Text>
          </View>
        </Card>

        <Card style={styles.buttonsContainer}>
          <View style={styles.buttons}>
            {buttons.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((button) => (
                  <TouchableOpacity
                    key={button}
                    style={getButtonStyle(button)}
                    onPress={() => handleButtonPress(button)}
                    activeOpacity={0.7}
                  >
                    <Text style={getButtonTextStyle(button)}>{button}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default Calculator;