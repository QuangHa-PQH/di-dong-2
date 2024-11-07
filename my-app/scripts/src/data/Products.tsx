// src/data/products.ts
export interface Product {
    id: string;
    photo: any; // Đường dẫn đến hình ảnh sản phẩm
    name: string;
    price: string;
  }
  
  // export const PRODUCTS: Product[] = [
  //   { id: '1', photo: require('@/assets/images/product02.png'), name: 'Rau muống', price: '30,000đ' },
  //   { id: '6', photo: require('@/assets/images/product03.png'), name: 'Heniken', price: '300,000đ' },
  //   { id: '7', photo: require('@/assets/images/product04.png'), name: 'Nấm đùi gà', price: '45,000đ' },
  //   { id: '8', photo: require('@/assets/images/product01.png'), name: 'Thùng mì cung đình', price: '160,000₫' },
  //   // { id: '5', image: require('@/assets/images/rau-muong.png'), name: 'NIKE PHANTOM GX 2 ACADEMY LV8 TF - FJ2576-300 - XANH NGỌC', price: '2,330,000₫' },
  //   // { id: '6', image: require('@/assets/images/rau-muong.png'), name: 'ADIDAS X CRAZYFAST ELITE TF - IF0663 - ĐỎ CAM', price: '2,690,000₫' },
  //   // { id: '7', image: require('@/assets/images/rau-muong.png'), name: 'ADIDAS PREDATOR ACCURACY.3 TF - GZ0007 - XANH DƯƠNG/TRẮNG', price: '2,990,000₫' },
  //   // { id: '8', image: require('@/assets/images/rau-muong.png'), name: 'ADIDAS X CRAZYFAST.3 TF - ID9338 - XANH NAVY', price: '2,550,000₫' },
  // ];