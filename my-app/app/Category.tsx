import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryContainer} 
            onPress={() => navigation.navigate('ProductList', { category: item })} // Điều hướng tới danh sách sản phẩm theo danh mục
          >
            <Text style={styles.categoryTitle}>{item}</Text>
          </TouchableOpacity>
        )}
        horizontal // Cho phép hiển thị danh mục theo chiều ngang
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  categoryContainer: {
    height: 60,
    padding: 16,
    marginHorizontal: 8, // Điều chỉnh khoảng cách giữa các mục theo chiều ngang
    borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryScreen;
