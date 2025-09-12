import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { PRODUCTS, CATEGORIES } from '../data';
import { COLORS } from './_layout';

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

const ProductCard = ({ product }: { product: Product }) => (
  <TouchableOpacity className="bg-gray-50 rounded-2xl shadow-lg border border-gray-100 p-4 mb-5 overflow-hidden">
    <Image
      source={{ uri: product.image }}
      className="w-full h-52 rounded-2xl mb-3"
      resizeMode="cover"
    />
    <Text className="text-black font-bold text-base mb-1.5 leading-5" numberOfLines={2}>
      {product.name}
    </Text>
    <Text className="text-gray-600 text-sm mb-2 font-medium">{product.weight}</Text>
    <Text className="text-black font-extrabold text-lg">
      ${product.price.toFixed(2)}
    </Text>
  </TouchableOpacity>
);

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

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 0 || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      
      {/* Header */}
      <View className="bg-gray-50 px-5 py-3 shadow-sm">
        <Text 
          style={{
            fontSize: 32,
            fontWeight: '900',
            color: COLORS.secondary, // Dandelion Yellow
            textShadowColor: COLORS.primary, // Rochester Navy shadow
            textShadowOffset: { width: 4, height: 2 },
            textShadowRadius: 4,
            marginBottom: 10,
            letterSpacing: -0.5,
          }}
        >
          UR Marketplace
        </Text>
        
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
