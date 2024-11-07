import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { productId } = route.params; // Nhận ID sản phẩm từ tham số
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]); // Danh sách sản phẩm liên quan
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                const data = await response.json();
                setProduct(data);

                // Fetch các sản phẩm cùng danh mục
                const categoryResponse = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
                const categoryData = await categoryResponse.json();
                setRelatedProducts(categoryData.filter(item => item.id !== data.id)); // Lọc sản phẩm hiện tại ra khỏi danh sách
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!product) {
        return <Text>Không tìm thấy sản phẩm.</Text>;
    }

    const addToCart = async () => {
        if (!product) {
            alert('Không có sản phẩm nào để thêm vào giỏ hàng.');
            return;
        }

        try {
            const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item && item.id === product.id);

            if (existingItemIndex > -1) {
                // Nếu sản phẩm đã tồn tại trong giỏ, tăng số lượng
                cart[existingItemIndex].quantity += quantity;
            } else {
                // Nếu không, thêm sản phẩm mới vào giỏ hàng
                const item = { ...product, quantity }; // Thêm số lượng vào sản phẩm
                cart.push(item);
            }

            await AsyncStorage.setItem('cart', JSON.stringify(cart)); // Lưu lại giỏ hàng
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
            navigation.navigate('Cart'); // Chuyển đến trang Cart
        } catch (error) {
            console.error(error);
        }
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Đảm bảo số lượng không nhỏ hơn 1
    };

    const renderRelatedProduct = ({ item }) => (
        <TouchableOpacity 
            style={styles.relatedProductContainer} 
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} // Chuyển đến chi tiết sản phẩm liên quan
        >
            <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
            <Text style={styles.relatedProductTitle}>{item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}</Text>
            <Text style={styles.relatedProductPrice}>{item.price} USD</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>{product.price} USD</Text>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Button title="Thêm vào giỏ hàng" onPress={addToCart} />
            
            {/* Hiển thị sản phẩm liên quan */}
            <Text style={styles.relatedProductsTitle}>Sản phẩm liên quan</Text>
            <FlatList
                data={relatedProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderRelatedProduct}
                horizontal // Hiển thị sản phẩm liên quan theo chiều ngang
                showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    price: {
        fontSize: 20,
        color: 'red',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 8,
        width: 40,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 40,
        textAlign: 'center',
    },
    relatedProductsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
    },
    relatedProductContainer: {
        padding: 8,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        width: 150, // Đặt chiều rộng cố định cho sản phẩm liên quan
    },
    relatedProductImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    relatedProductTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    relatedProductPrice: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
});

export default ProductDetail;
