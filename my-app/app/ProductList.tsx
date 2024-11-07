import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params;

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const renderItem = ({ item }) => (
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
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  productContainer: { 
    flex: 1, 
    padding: 16, 
    margin: 8, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    height: 250, 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    flexShrink: 1, 
  },
  price: {
    marginTop: 8,
    color: 'red', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 8,
  },
});

export default ProductList;
