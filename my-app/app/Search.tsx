import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Thư viện icon từ Expo

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // Hàm xử lý khi người dùng nhấn tìm kiếm
  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate('SearchResultsScreen', { query: searchText });
    }
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputButtonContainer}>
        {/* Icon tìm kiếm */}
        <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />

        {/* TextInput */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#888"
        />

        {/* Nút tìm kiếm */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  inputButtonContainer: {
    flexDirection: 'row', // Đặt các phần tử theo hàng ngang
    alignItems: 'center', // Canh giữa các phần tử dọc theo trục ngang
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    height: 40, // Đặt chiều cao cho thanh tìm kiếm
  },
  searchIcon: {
    marginRight: 10, // Khoảng cách giữa icon và input
  },
  searchInput: {
    flex: 1, // Để TextInput chiếm phần còn lại của không gian
    height: '100%', // Chiều cao của TextInput sẽ tự động bằng với container
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginLeft: 10, // Khoảng cách giữa TextInput và nút tìm kiếm
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
