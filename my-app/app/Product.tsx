import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]); // Lưu các sản phẩm đã lọc theo tìm kiếm

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productContainer} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title}</Text>
      <Text style={styles.price}>{item.price} USD</Text>
    </TouchableOpacity>
  );
  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productContainer} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}</Text>
      <Text style={styles.price}>{item.price} USD</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} // Số cột
        columnWrapperStyle={styles.row} // Thêm kiểu cho hàng
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  row: {
    justifyContent: 'space-between', // Canh đều trong mỗi hàng
  },
  productContainer: { 
    flex: 1, // Để mỗi sản phẩm chiếm 1 cột
    padding: 16, // Padding cho sản phẩm
    margin: 8, // Khoảng cách giữa các sản phẩm
    borderWidth: 1, // Độ dày của khung
    borderColor: '#ccc', // Màu sắc của khung
    borderRadius: 8, // Góc bo cho khung
    backgroundColor: '#fff', // Màu nền của sản phẩm
    alignItems: 'center', // Canh giữa các nội dung trong sản phẩm
    height: 230, // Đặt chiều cao cố định để canh đều
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', // Căn giữa tiêu đề
    flexShrink: 1, // Giúp tiêu đề không vượt quá không gian
  },
  price: {
    marginTop: 8,
    color: 'red', // Đặt màu cho giá tiền
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 100, // Chiều cao hình ảnh
    resizeMode: 'contain',
    marginBottom: 8,
  },
});

export default ProductScreen;
