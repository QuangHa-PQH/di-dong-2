import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Search from './Search';

export default function SearchResultsScreen() {
  const route = useRoute();
  const { query } = route.params;  // Lấy từ khóa tìm kiếm từ params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        
        // Lọc kết quả dựa trên query tìm kiếm
        const filteredProducts = data.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Hàm để hiển thị một sản phẩm trong danh sách
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productContainer} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>
        {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
      </Text>
      <Text style={styles.price}>{item.price} USD</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Search/>
      {products.length === 0 ? (
        <Text style={styles.noResultsText}>No results found for "{query}"</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2} // Hiển thị 2 cột
          key={products.length} // Thêm key để đảm bảo FlatList được render lại khi dữ liệu thay đổi
          columnWrapperStyle={styles.row} // Thêm kiểu cho mỗi hàng
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    justifyContent: 'space-between', // Canh đều các item trong mỗi hàng
  },
  productContainer: {
    flex: 1, // Mỗi sản phẩm sẽ chiếm 1/2 chiều rộng của màn hình
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center', // Canh giữa các thành phần trong item
    height: 230, // Đặt chiều cao cố định
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1, // Giúp tiêu đề không vượt quá không gian
  },
  price: {
    marginTop: 8,
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 100, // Chiều cao hình ảnh
    resizeMode: 'contain',
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});
