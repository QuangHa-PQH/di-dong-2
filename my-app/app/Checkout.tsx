import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Checkout = () => {
  const route = useRoute();
  const { cartItems, totalAmount } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Thêm các biến trạng thái cho thông tin địa chỉ
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handlePayment = () => {
    if (!fullName || !phoneNumber || !address || !city) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin địa chỉ trước khi thanh toán.');
      return;
    }

    Alert.alert('Thông báo', 'Payment successful!');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment information</Text>
      {cartItems.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
            <Text>{item.quantity} x {item.price.toFixed(2)} USD</Text>
          </View>
        </View>
      ))}
      <Text style={styles.totalAmount}>Total: {totalAmount.toFixed(2)} USD</Text>
      
      <TouchableOpacity
            style={styles.payButton}
            onPress={() => setModalVisible(true)} // Triggering modal visibility on press
          >
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select payment method</Text>

            {/* Phần nhập thông tin địa chỉ */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />

            <Picker
              selectedValue={paymentMethod}
              style={styles.picker}
              onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            >
              <Picker.Item label="Credit card" value="creditCard" />
              <Picker.Item label="QR Code" value="qrCode" />
              <Picker.Item label="Cash on delivery" value="cashOnDelivery" />
            </Picker>

            {paymentMethod === 'creditCard' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Credit Card Number"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Expiry Date (MM/YY)"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                />
                <TextInput
                  style={styles.input}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                />
              </>
            )}

            {paymentMethod === 'qrCode' && (
              <View style={styles.qrCodeContainer}>
                <Text>Scan QR code to pay</Text>
                <Image style={styles.qrcode} source={require('@/assets/images/qrcode.png')}/>
                <Image source={{ uri: 'https://example.com/qr-code.png' }} style={styles.qrCodeImage} />
              </View>
            )}

            {paymentMethod === 'cashOnDelivery' && (
              <Text style={styles.cashOnDeliveryText}>You will pay in cash when the order is delivered.</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handlePayment}>
              <Text style={styles.buttonText}>Payment Confirmation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  qrcode:{
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  qrCodeImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
  },
  cashOnDeliveryText: {
    marginVertical: 16,
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

export default Checkout;
