import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
        navigation.navigate('Cart');  // Nếu đã đăng nhập, điều hướng tới Cart
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();

      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        alert('Login successful!');
        navigation.navigate('Cart');  // Chuyển hướng đến giỏ hàng sau khi đăng nhập
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred, please try again');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    alert('You are logged out!');
    navigation.navigate('Login');  // Quay lại trang đăng nhập sau khi đăng xuất
  };

  const handleRegisterPress = () => {
    router.push('/Register');
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLoggedIn ? 'You are logged in' : 'Log in'}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!isLoggedIn ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
          <TouchableOpacity>
            <Text style={styles.forgotDangky} onPress={handleRegisterPress}>Sign up for an account</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  forgotDangky: {
    margin: 10,
    color: '#4285F4',
    fontSize: 16,
    textAlign: 'center',
},
});

export default Login;
