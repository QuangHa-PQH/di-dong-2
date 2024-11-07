import React, { useState } from 'react';
import { View, TextInput, ImageBackground, StyleSheet, FlatList, Text } from 'react-native';
import ProductScreen from '../Product';
import CategoryScreen from '../Category';
import Search from '../Search';



export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  
  // Dữ liệu giả cho phần tìm kiếm
  const searchData = [
    { key: 'Search for products' }, // Bạn có thể sử dụng dữ liệu thực tế ở đây
  ];

  return (
    <View style={styles.container}>
      {/* Tìm kiếm */}
      {/* <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      /> */}
      <Search/>
      <ImageBackground style={styles.backgroundImage} source={require('@/assets/images/slider.png')}/>
        {/* Nội dung khác có thể được đặt ở đây */}
      <CategoryScreen/>
      <ProductScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    backgroundColor: '#82c864',
    width: "100%",
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
});
