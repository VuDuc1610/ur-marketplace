import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  <TouchableOpacity style={{ backgroundColor: COLORS.surface, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4, borderWidth: 1, borderColor: COLORS.surfaceLight, padding: 16, marginBottom: 20, overflow: 'hidden' }}>
    <Image
      source={{ uri: product.image }}
      style={{ width: '100%', height: 208, borderRadius: 16, marginBottom: 12 }}
      resizeMode="cover"
    />
    <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 6, lineHeight: 20 }} numberOfLines={2}>
      {product.name}
    </Text>
    <Text style={{ color: COLORS.grey, fontSize: 14, marginBottom: 8, fontWeight: '500' }}>{product.weight}</Text>
    <Text style={{ color: COLORS.primary, fontWeight: '800', fontSize: 18 }}>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      
      {/* Header */}
      <View style={{ backgroundColor: COLORS.background, paddingHorizontal: 20, paddingVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
        <Text 
          style={{
            fontSize: 28,
            fontWeight: '900',
            color: COLORS.secondary, // Dandelion Yellow
            textShadowColor: COLORS.primary, // Rochester Navy shadow
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 4,
            marginBottom: 10,
            letterSpacing: -0.5,
          }}
        >
          UR Marketplace
        </Text>
        
        {/* Search Bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: COLORS.surfaceLight, marginTop: 10 }}>
          <Text style={{ color: COLORS.grey, marginRight: 10, fontSize: 14 }}>🔍</Text>
          <TextInput
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, color: COLORS.primary, fontSize: 16, fontWeight: '500' }}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Categories */}
      <View style={{ backgroundColor: COLORS.background, paddingVertical: 10, paddingHorizontal: 20 }}>
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
      <ScrollView style={{ flex: 1, paddingHorizontal: 4, paddingTop: 16, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, letterSpacing: -0.5 }}>
            {selectedCategory === 0 ? 'All Products' : CATEGORIES.find(cat => cat.id === selectedCategory)?.name}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.grey, fontWeight: '600', backgroundColor: COLORS.surfaceLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
            {filteredProducts.length} items
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={{ width: '49%' }}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 100 }}>
            <Text style={{ color: COLORS.grey, fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
              No products found
            </Text>
            <Text style={{ color: '#999', fontSize: 16, textAlign: 'center' }}>
              Try adjusting your search or category
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
