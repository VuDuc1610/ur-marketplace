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
  StyleSheet,
} from 'react-native';
import { PRODUCTS, CATEGORIES } from '../utils/data';
import { COLORS } from '../constant/themes'
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
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'sell' | 'chats' | 'account'>('home');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 0 || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProductCard = ({ product }: { product: Product }) => (
    <TouchableOpacity style={[styles.card, styles.borderSubtle]}>
      <Image
        source={{ uri: product.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.productMeta}>{product.weight}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const CategoryButton = ({
    category,
    isSelected,
    onPress
  }: { category: Category; isSelected: boolean; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.catBtn,
        isSelected ? { backgroundColor: COLORS.primary, borderColor: COLORS.primary } : styles.catBtnIdle
      ]}
    >
      <Text
        style={[
          styles.catBtnText,
          isSelected ? { color: COLORS.white, fontWeight: '700' } : { color: COLORS.surface, opacity: 0.9 }
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const BottomNavigation = () => {
    const iconUrls = {
      home: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
      search: 'https://cdn-icons-png.flaticon.com/512/49/49116.png',
      chats: 'https://cdn-icons-png.flaticon.com/512/60/60543.png',
      account: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
    };

    const IconComponent = ({ iconUrl, isActive }: { iconUrl: string; isActive: boolean }) => (
      <Image
        source={{ uri: iconUrl }}
        style={{
          width: 24,
          height: 24,
          tintColor: isActive ? COLORS.primary : COLORS.grey,
          opacity: isActive ? 1 : 0.75
        }}
        resizeMode="contain"
      />
    );

    const tabs: { id: 'home' | 'search' | 'sell' | 'chats' | 'account'; label: string; icon: string }[] = [
      { id: 'home', label: 'Home', icon: iconUrls.home },
      { id: 'search', label: 'Search', icon: iconUrls.search },
      { id: 'sell', label: 'Sell', icon: '+' as unknown as string },
      { id: 'chats', label: 'Chats', icon: iconUrls.chats },
      { id: 'account', label: 'Account', icon: iconUrls.account }
    ];

    return (
      <View style={[styles.bottomBar, styles.borderTop]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={styles.bottomItem}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.bottomIconWrap,
                  tab.id === 'sell' && { backgroundColor: COLORS.primary }
                ]}
              >
                {tab.id === 'sell' ? (
                  <Text style={{ fontSize: 20, color: COLORS.white, fontWeight: '800' }}>
                    {tab.icon}
                  </Text>
                ) : (
                  <IconComponent iconUrl={tab.icon} isActive={isActive} />
                )}
              </View>
              <Text style={[styles.bottomLabel, { color: isActive ? COLORS.primary : COLORS.grey, fontWeight: isActive ? '700' : '600' }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {/* Header */}
            <View style={[styles.header, styles.borderBottom]}>
              <Text style={styles.title}>UR Marketplace</Text>

              {/* Search Bar */}
              <View style={[styles.searchBar, styles.borderSubtle]}>
                <Text style={{ color: COLORS.grey, marginRight: 10, fontSize: 14 }}>🔍</Text>
                <TextInput
                  placeholder="Search products..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.searchInput}
                  placeholderTextColor={COLORS.grey}
                />
              </View>
            </View>

            {/* Categories */}
            <View style={styles.categoriesWrap}>
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
            <ScrollView style={styles.productsScroll} contentContainerStyle={{ paddingBottom: 20 }}>
              <View style={styles.productsHeader}>
                <Text style={styles.sectionTitle}>
                  {selectedCategory === 0 ? 'All Products' : CATEGORIES.find(cat => cat.id === selectedCategory)?.name}
                </Text>
                <Text style={styles.countChip}>
                  {filteredProducts.length} items
                </Text>
              </View>

              <View style={styles.grid}>
                {filteredProducts.map((product) => (
                  <View key={product.id} style={{ width: '49%' }}>
                    <ProductCard product={product} />
                  </View>
                ))}
              </View>

              {filteredProducts.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>No products found</Text>
                  <Text style={styles.emptyText}>Try adjusting your search or category</Text>
                </View>
              )}
            </ScrollView>
          </>
        );

      case 'search':
        return (
          <View style={styles.centerBlock}>
            <Text style={styles.centerTitle}>Search</Text>
            <Text style={styles.centerText}>Advanced search functionality coming soon</Text>
          </View>
        );

      case 'sell':
        return (
          <View style={styles.centerBlock}>
            <Text style={styles.centerTitle}>Sell Item</Text>
            <Text style={styles.centerText}>Create a new listing coming soon</Text>
          </View>
        );

      case 'chats':
        return (
          <View style={styles.centerBlock}>
            <Text style={styles.centerTitle}>Chats</Text>
            <Text style={styles.centerText}>Your conversations coming soon</Text>
          </View>
        );

      case 'account':
        return (
          <View style={styles.centerBlock}>
            <Text style={styles.centerTitle}>My Account</Text>
            <Text style={styles.centerText}>Account settings coming soon</Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Shell
  header: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoriesWrap: {
    backgroundColor: COLORS.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  productsScroll: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 6,
    paddingTop: 12,
  },

  // Typography
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.surface, // assume dark text token
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.surface,
    letterSpacing: -0.2,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderColor: COLORS.surfaceLight,
  },
  searchInput: {
    flex: 1,
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '500',
  },

  // Category pills
  catBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
  },
  catBtnIdle: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: COLORS.surfaceLight,
  },
  catBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Product card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  borderSubtle: {
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceLight,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  cardImage: {
    width: '100%',
    height: 208,
    borderRadius: 16,
    marginBottom: 10,
  },
  productName: {
    color: COLORS.surface,
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 6,
  },
  productMeta: {
    color: COLORS.grey,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  productPrice: {
    color: COLORS.surface,
    fontWeight: '900',
    fontSize: 18,
  },

  // Grid & counts
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  countChip: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.surface,
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Empty state
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyText: {
    color: COLORS.grey,
    fontSize: 15,
    textAlign: 'center',
  },

  // Center blocks for other tabs
  centerBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  centerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.surface,
    marginBottom: 6,
  },
  centerText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
  },

  // Bottom nav
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingHorizontal: 0,
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomIconWrap: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderRadius: 999,
  },
  bottomLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomePage;
