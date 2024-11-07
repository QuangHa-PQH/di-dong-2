// App.js hoặc Navigation.js
import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../app/Product'; // Đảm bảo đường dẫn chính xác
import ProductDetail from '../app/ProductDetail'; // Đảm bảo đường dẫn chính xác

const Stack = createStackNavigator();

const Navigation  = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product">
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation ;
