import {makeAutoObservable} from 'mobx';
import {Filter, Product} from '../types';
import {filterData, products as mockProducts} from '../data/mockData';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem extends Product {
  quantity: number;
}

class ProductStore {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  activeFilter: Filter = filterData[0];
  cart: CartItem[] = [];
  error: string | null = null;
  selectedItem: {
    image: string;
    price: number;
    name: string;
    id: string;
    category: string;
  } = {category: '', id: '', image: '', name: '', price: 0};
  search: string = '';
  remainingTime: number = 0;
  result: any = null;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'ProductStore',
      properties: ['remainingTime', 'result'],
      storage: AsyncStorage,
    });
  }

  loadProducts = () => {
    try {
      this.products = mockProducts;
      this.filteredProducts = mockProducts;
      this.applyFilter();
    } catch (error: any) {}
  };

  setFilter = (filter: Filter) => {
    this.activeFilter = filter;
    this.applyFilter();
  };

  setResult = (result: any) => {
    this.result = result;
  };

  setSelectedItem = (item: Product) => {
    this.selectedItem = item;
  };

  private applyFilter = () => {
    if (this.activeFilter.name === 'All') {
      this.filteredProducts = mockProducts;
      return;
    }
    this.search = '';
    this.filteredProducts = mockProducts.filter(
      product =>
        product.category.toLowerCase() === this.activeFilter.name.toLowerCase(),
    );
  };

  handlePlus = (product: Product) => {
    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cart = [...this.cart];
    } else {
      this.cart.push({...product, quantity: 1});
    }
  };

  handleMinus = (productId: string) => {
    const existingItem = this.cart.find(item => item.id === productId);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        this.cart = [...this.cart];
      } else {
        this.removeFromCart(productId);
      }
    }
  };

  setRemainingTime = (time: number) => {
    this.remainingTime = time;
  };

  removeFromCart = (productId: string) => {
    this.cart = this.cart.filter(item => item.id !== productId);
  };

  clearCart = () => {
    this.cart = [];
  };

  get cartTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getItemQuantity = (productId: string): number => {
    const item = this.cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  get totalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get cartDiscountAmount() {
    return this.cart.reduce((sum, item) => {
      const oldPrice = item.oldPrice || item.price;
      const discount = (oldPrice - item.price) * item.quantity;
      return sum + discount;
    }, 0);
  }
}

export default ProductStore;
