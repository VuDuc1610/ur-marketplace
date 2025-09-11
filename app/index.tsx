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
import { PRODUCTS, CATEGORIES } from '../utils/data';
import '../global.css';

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

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 0 || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      className={`px-4 py-2 rounded-2xl mr-2.5 ${
        isSelected 
          ? 'bg-black' 
          : 'bg-gray-100 border border-gray-300'
      }`}
    >
      <Text
        className={`text-sm ${
          isSelected 
            ? 'font-bold text-white' 
            : 'font-semibold text-gray-800'
        }`}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const BottomNavigation = () => {
    // Icon URLs - replace these with your actual PNG icon URLs
    const iconUrls = {
      home: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
      search: 'https://cdn-icons-png.flaticon.com/512/49/49116.png',
      chats: 'https://cdn-icons-png.flaticon.com/512/60/60543.png',
      account: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
    };

    const IconComponent = ({ iconUrl, color, isActive }: { iconUrl: string; color: string; isActive: boolean }) => (
      <Image
        source={{ uri: iconUrl }}
        className="w-6 h-6"
        style={{
          tintColor: isActive ? color : '#666',
          opacity: isActive ? 1 : 0.6
        }}
        resizeMode="contain"
      />
    );

    const tabs = [
      { id: 'home', label: 'Home', icon: iconUrls.home },
      { id: 'search', label: 'Search', icon: iconUrls.search },
      { id: 'sell', label: 'Sell', icon: '+' },
      { id: 'chats', label: 'Chats', icon: iconUrls.chats },
      { id: 'account', label: 'Account', icon: iconUrls.account }
    ];

    return (
      <View className="flex-row bg-gray-50 border-t border-gray-100 px-0">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className="flex-1 items-center py-0"
          >
            <View className={`w-11 h-11 justify-center items-center mb-1 ${
              tab.id === 'sell' ? 'rounded-full bg-black' : ''
            }`}>
              {tab.id === 'sell' ? (
                <Text className="text-xl text-white font-bold">
                  {tab.icon}
                </Text>
              ) : (
                <IconComponent 
                  iconUrl={tab.icon} 
                  color={activeTab === tab.id ? '#000' : '#666'} 
                  isActive={activeTab === tab.id}
                />
              )}
            </View>
            <Text className={`text-xs text-center ${
              activeTab === tab.id 
                ? 'text-black font-bold' 
                : 'text-gray-600 font-medium'
            }`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {/* Header */}
            <View className="bg-gray-50 px-5 py-3 shadow-sm">
              <Text className="text-2xl font-extrabold text-black mb-2.5 tracking-tight">
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
          </>
        );
      
      case 'search':
        return (
          <View className="flex-1 justify-center items-center bg-gray-50">
            <Text className="text-2xl font-bold text-black mb-2">Search</Text>
            <Text className="text-base text-gray-600 text-center">Advanced search functionality coming soon</Text>
          </View>
        );
      
      case 'sell':
        return (
          <View className="flex-1 justify-center items-center bg-gray-50">
            <Text className="text-2xl font-bold text-black mb-2">Sell Item</Text>
            <Text className="text-base text-gray-600 text-center">Create a new listing coming soon</Text>
          </View>
        );
      
      case 'chats':
        return (
          <View className="flex-1 justify-center items-center bg-gray-50">
            <Text className="text-2xl font-bold text-black mb-2">Chats</Text>
            <Text className="text-base text-gray-600 text-center">Your conversations coming soon</Text>
          </View>
        );
      
      case 'account':
        return (
          <View className="flex-1 justify-center items-center bg-gray-50">
            <Text className="text-2xl font-bold text-black mb-2">My Account</Text>
            <Text className="text-base text-gray-600 text-center">Account settings coming soon</Text>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      
      {/* Main Content */}
      <View className="flex-1">
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
}

export default HomePage;
