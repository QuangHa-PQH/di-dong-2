import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      const validCartItems = cart.filter(item => item && item.id && item.price);
      setCartItems(validCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
    }, [])
  );

  const removeItemFromCart = async (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item.id !== itemToRemove.id);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    Alert.alert('Notification', 'Product has been removed from cart!');
  };

  const updateItemQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return; // Ngăn số lượng âm
    const updatedCart = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>{item.price} USD</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateItemQuantity(item, (item.quantity || 1) - 1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.quantity || 1}</Text>
          <TouchableOpacity onPress={() => updateItemQuantity(item, (item.quantity || 1) + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeItemFromCart(item)}>
          <Text style={styles.removeButton}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalAmount = cartItems.reduce((total, item) => {
    if (item && item.price && item.quantity) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
          <Text style={styles.totalAmount}>Total: {totalAmount.toFixed(2)} USD</Text>
          
          {/* Replace the Button with TouchableOpacity for custom styling */}
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              navigation.navigate('Checkout', { cartItems, totalAmount });
            }}
          >
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 16,
    backgroundColor: '#fff',
  },
  cartItemContainer: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  cartItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    color: 'red',
    fontSize: 16,
  },
  cartItemQuantity: {
    fontSize: 14,
    marginVertical: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
  },
  removeButton: {
    color: 'blue',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  payButton: {
    backgroundColor: '#4CAF50',  // Change the button color to green
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',  // Text color is white
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
