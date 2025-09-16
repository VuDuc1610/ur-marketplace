import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CATEGORIES } from '../data'; //Bo PRODUCTS
import { COLORS } from './_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface ListingData {
  id: string;
  title: string;
  description: string;
  price: string;
  openToOffer: boolean;
  photos: string[];
  createdAt: string;
  status: 'draft' | 'published';
}

interface Product {
  id: number;
  name: string;
  price: number;
  weight: string;
  categoryId: number;
  image: string;
}

interface Category {
  id: number;
  name: string;
}

const ProductCard = ({ product }: { product: ListingData }) => (
  <TouchableOpacity className="bg-gray-50 rounded-2xl shadow-lg border border-gray-100 p-4 mb-5 overflow-hidden">
    <Image source={{ uri: product.photos[0] }}
     style={{ width: '100%', height: 150, borderRadius: 12, marginBottom: 8 }}
     resizeMode="cover"/>
    <Text>{product.title}</Text>
    <Text>${product.price}</Text>
  </TouchableOpacity>
); //Product --> listingData

const CategoryButton = ({ category, isSelected, onPress }: { category: Category; isSelected: boolean; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      marginRight: 10,
      backgroundColor: isSelected ? COLORS.primary : COLORS.surfaceLight,
      borderWidth: isSelected ? 0 : 1,
      borderColor: COLORS.primary,
    }}
  >
    <Text
      style={{
        fontSize: 14,
        fontWeight: isSelected ? 'bold' : '600',
        color: isSelected ? COLORS.white : COLORS.primary,
      }}
    >
      {category.name}
    </Text>
  </TouchableOpacity>
);


export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState<ListingData[]>([]);


  const filteredProducts = listings.filter(listing => {
    const matchesSearch = listing.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 0 || listing.categoryId === selectedCategory;
    return matchesSearch && matchesCategory && listing.status === 'published'; // Only show published listings
  }); //update product --> listings

  const handleSellPress = () => {
    router.push('/sell');
  };
  useEffect(() => {
    const fetchListings = async () => {
      const stored = await AsyncStorage.getItem('listings');
      if (stored) {
        setListings(JSON.parse(stored));
      }
    };

    fetchListings();
  }, []);



  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />

      {/* Header */}
      <View className="bg-gray-50 px-5 py-3 shadow-sm">
        <View className="flex-row justify-between items-center mb-3">
          <Text
            style={{
              fontSize: 28,
              fontWeight: '900',
              color: COLORS.secondary, // Dandelion Yellow
              textShadowColor: COLORS.primary, // Rochester Navy shadow
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
              letterSpacing: -0.5,
            }}
          >
            UR Marketplace
          </Text>

          {/* Sell Button */}
          <TouchableOpacity
            onPress={handleSellPress}
            style={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 14,
                fontWeight: '700',
              }}
            >
              + Sell
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-3.5 py-2.5 border border-gray-200">
          <Text className="text-gray-600 mr-2.5 text-sm">🔍</Text>
          <TextInput
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-black text-base font-medium"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Categories */}
      <View className="bg-gray-50 py-2.5 px-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
          <CategoryButton
            category={{ id: 0, name: 'All' }}
            isSelected={selectedCategory === 0}
            onPress={() => setSelectedCategory(0)}
          />
          {CATEGORIES.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      <ScrollView className="flex-1 px-1 pt-4 pb-5">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-black tracking-tight">
            {selectedCategory === 0 ? 'All Products' : CATEGORIES.find(cat => cat.id === selectedCategory)?.name}
          </Text>
          <Text className="text-sm text-gray-600 font-semibold bg-gray-100 px-2.5 py-1 rounded-lg">
            {filteredProducts.length} items
          </Text>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {filteredProducts.map((product) => (
            <View key={product.id} style={{ width: '49%' }}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View className="flex-1 justify-center items-center py-25">
            <Text className="text-gray-600 text-xl font-semibold mb-2">
              No products found
            </Text>
            <Text className="text-gray-500 text-base text-center">
              Try adjusting your search or category
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}