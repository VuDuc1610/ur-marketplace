import React, { useEffect, useState, useCallback } from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { CATEGORIES } from '../data';
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
    categoryId?: number; // Added this since you're using it in filteredProducts
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

const [listings, setListings] = useState<ListingData[]>([]);

const [loading, setLoading] = useState(false);


const ProductCard = ({ product, onLongPress }: { product: ListingData; onLongPress?: () => void }) => (
    <TouchableOpacity
        className="bg-gray-50 rounded-2xl shadow-lg border border-gray-100 p-4 mb-5 overflow-hidden"
        onLongPress={onLongPress}
    >
        <Image
            source={{ uri: product.photos[0] }}
            style={{ width: '100%', height: 150, borderRadius: 12, marginBottom: 8 }}
            resizeMode="cover"
        />
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{product.title}</Text>
        <Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: '600' }}>${product.price}</Text>
        <Text style={{ fontSize: 12, color: COLORS.grey, marginTop: 4 }}>
            {CATEGORIES.find(cat => cat.id === product.categoryId)?.name || 'Uncategorized'}
        </Text>
    </TouchableOpacity>
);

const CategoryButton = ({ category, isSelected, onPress }: {
    category: Category;
    isSelected: boolean;
    onPress: () => void
}) => (
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
    const [loading, setLoading] = useState(false);

    // Function to load listings from AsyncStorage
    const loadListings = async () => {
        try {
            setLoading(true);
            const stored = await AsyncStorage.getItem('listings');
            if (stored) {
                const parsedListings = JSON.parse(stored);
                setListings(parsedListings);
                console.log('Loaded listings:', parsedListings.length);
            } else {
                setListings([]);
                console.log('No listings found in storage');
            }
        } catch (error) {
            console.error('Error loading listings:', error);
            setListings([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a specific listing
    const deleteListing = async (listingId: string) => {
        try {
            const updatedListings = listings.filter(listing => listing.id !== listingId);
            await AsyncStorage.setItem('listings', JSON.stringify(updatedListings));
            setListings(updatedListings);
            console.log('Listing deleted:', listingId);
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    };

    // Function to clear all listings (for debugging)
    const clearAllListings = async () => {
        Alert.alert(
            'Clear All Listings',
            'Confirm delete. Cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete All',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('listings');
                            setListings([]);
                            console.log('All listings cleared');
                        } catch (error) {
                            console.error('Error clearing listings:', error);
                        }
                    },
                },
            ]
        );
    };

    // Debugging AsyncStorage
    const debugAsyncStorage = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            console.log('All AsyncStorage keys:', keys);

            const allData = await AsyncStorage.multiGet(keys);
            console.log('All AsyncStorage data:', allData);

            const listings = await AsyncStorage.getItem('listings');
            console.log('Raw listings data:', listings);
        } catch (error) {
            console.error('Error debugging AsyncStorage:', error);
        }
    };

    // Handle long press on product for deletion
    const handleProductLongPress = (product: ListingData) => {
        Alert.alert(
            'Delete Listing',
            `Are you sure you want to delete "${product.title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteListing(product.id),
                },
            ]
        );
    };

    // Load listings on component mount
    useEffect(() => {
        loadListings();
    }, []);

    //Reload listings every time the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadListings();
        }, [])
    );

    const filteredProducts = listings.filter(listing => {
        const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 0 || listing.categoryId === selectedCategory;
        return matchesSearch && matchesCategory && listing.status === 'published';
    });

    const handleSellPress = () => {
        router.push('/sell');
    };

    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />

            {/* Header */}
            <View className="bg-gray-50 px-5 py-3 shadow-sm">
                <View className="flex-row justify-between items-center mb-3">
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: '900',
                            color: COLORS.secondary,
                            textShadowColor: COLORS.primary,
                            textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 4,
                            letterSpacing: -0.5,
                        }}
                    >
                        UR Marketplace
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        {/* Debug Button (remove in production) */}
                        <TouchableOpacity
                            onPress={debugAsyncStorage}
                            style={{
                                backgroundColor: 'orange',
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 12 }}>Debug</Text>
                        </TouchableOpacity>

                        {/* Clear All Button (debug only) */}
                        <TouchableOpacity
                            onPress={clearAllListings}
                            style={{
                                backgroundColor: 'red',
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 12 }}>Clear</Text>
                        </TouchableOpacity>

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
                        {filteredProducts.length} items {loading && '(loading...)'}
                    </Text>
                </View>

                <View className="flex-row flex-wrap justify-between">
                    {filteredProducts.map((product) => (
                        <View key={product.id} style={{ width: '49%' }}>
                            <ProductCard
                                product={product}
                                onLongPress={() => handleProductLongPress(product)}
                            />
                        </View>
                    ))}
                </View>

                {filteredProducts.length === 0 && !loading && (
                    <View className="flex-1 justify-center items-center py-25">
                        <Text className="text-gray-600 text-xl font-semibold mb-2">
                            No products found
                        </Text>
                        <Text className="text-gray-500 text-base text-center">
                            Try adjusting your search or category
                        </Text>
                    </View>
                )}

                {loading && (
                    <View className="flex-1 justify-center items-center py-10">
                        <Text className="text-gray-600 text-base">Loading...</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}