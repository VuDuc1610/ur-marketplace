import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Alert,
    Switch,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS } from './_layout';

interface ListingData {
    title: string;
    description: string;
    price: string;
    openToOffers: boolean;
    photos: string[];
}

export default function SellScreen() {
    const [listingData, setListingData] = useState<ListingData>({
        title: '',
        description: '',
        price: '',
        openToOffers: false,
        photos: []
    });

    const [isDraft, setIsDraft] = useState(false);

    const handleInputChange = (field: keyof ListingData, value: string | boolean) => {
        setListingData(prev => ({
            ...prev,
            [field]: value
        }));
        setIsDraft(true);
    };

    const handleSaveDraft = () => {
        // In a real app, you'd save to AsyncStorage
        setIsDraft(false);
        Alert.alert('Success', 'Draft saved successfully!');
    };

    const handleTakePhoto = () => {
        // Mock photo taking functionality
        const mockPhoto = `photo_${Date.now()}.jpg`;
        setListingData(prev => ({
            ...prev,
            photos: [...prev.photos, mockPhoto]
        }));
        setIsDraft(true);
        Alert.alert('Success', 'Photo added successfully!');
    };

    const handlePublishListing = () => {
        if (!listingData.title || !listingData.description || !listingData.price) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        Alert.alert(
            'Success',
            'Listing published successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Reset form
                        setListingData({
                            title: '',
                            description: '',
                            price: '',
                            openToOffers: false,
                            photos: []
                        });
                        setIsDraft(false);
                        // Navigate back to home
                        router.back();
                    }
                }
            ]
        );
    };

    const handleGoBack = () => {
        if (isDraft) {
            Alert.alert(
                'Unsaved Changes',
                'You have unsaved changes. Do you want to save as draft?',
                [
                    { text: 'Discard', onPress: () => router.back() },
                    { text: 'Save Draft', onPress: handleSaveDraft },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        } else {
            router.back();
        }
    };

    const isFormValid = listingData.title && listingData.description && listingData.price;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />

            {/* Header */}
            <View className="bg-gray-50 px-5 py-3 shadow-sm border-b border-gray-200">
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity onPress={handleGoBack}>
                        <Text className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                            ← Back
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-black">Create Listing</Text>
                    {isDraft && (
                        <TouchableOpacity
                            onPress={handleSaveDraft}
                            style={{
                                backgroundColor: COLORS.surfaceLight,
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: COLORS.primary,
                            }}
                        >
                            <Text style={{ color: COLORS.primary, fontSize: 12, fontWeight: '600' }}>
                                Save Draft
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView className="flex-1 px-5 py-4">
                {/* Photos Section */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                    <Text className="text-lg font-bold text-black mb-3">Photos</Text>
                    <TouchableOpacity
                        onPress={handleTakePhoto}
                        className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 items-center justify-center"
                        style={{ minHeight: 120 }}
                    >
                        <Text className="text-4xl mb-2">📸</Text>
                        <Text className="text-base font-semibold text-gray-700">
                            Take Photos ({listingData.photos.length})
                        </Text>
                        <Text className="text-sm text-gray-500 mt-1">
                            Tap to add photos
                        </Text>
                    </TouchableOpacity>
                    {listingData.photos.length > 0 && (
                        <Text className="text-sm text-gray-600 mt-2">
                            {listingData.photos.length} photo(s) added
                        </Text>
                    )}
                </View>

                {/* Listing Details */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                    <Text className="text-lg font-bold text-black mb-4">Listing Details</Text>

                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-700 mb-2">Title *</Text>
                        <TextInput
                            placeholder="What are you selling?"
                            value={listingData.title}
                            onChangeText={(value) => handleInputChange('title', value)}
                            className="bg-gray-50 rounded-xl px-4 py-3 text-base font-medium text-black border border-gray-200"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-700 mb-2">Description *</Text>
                        <TextInput
                            placeholder="Describe your item..."
                            value={listingData.description}
                            onChangeText={(value) => handleInputChange('description', value)}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            className="bg-gray-50 rounded-xl px-4 py-3 text-base font-medium text-black border border-gray-200"
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                {/* Pricing */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                    <Text className="text-lg font-bold text-black mb-4">Pricing</Text>

                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-700 mb-2">Listing Type</Text>
                        <View
                            className="rounded-xl p-3 flex-row items-center"
                            style={{ backgroundColor: COLORS.surfaceLight }}
                        >
                            <View
                                className="w-2 h-2 rounded-full mr-3"
                                style={{ backgroundColor: COLORS.primary }}
                            />
                            <Text className="text-base font-medium text-black">For Sale</Text>
                        </View>
                    </View>

                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-700 mb-2">Price *</Text>
                        <View className="relative">
                            <TextInput
                                placeholder="0.00"
                                value={listingData.price}
                                onChangeText={(value) => handleInputChange('price', value)}
                                keyboardType="numeric"
                                className="bg-gray-50 rounded-xl pl-8 pr-4 py-3 text-base font-medium text-black border border-gray-200"
                                placeholderTextColor="#999"
                            />
                            <Text className="absolute left-4 top-3 text-base text-gray-600">$</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-base font-medium text-black">Open to offers</Text>
                        <Switch
                            value={listingData.openToOffers}
                            onValueChange={(value) => handleInputChange('openToOffers', value)}
                            trackColor={{ false: '#e5e5e5', true: COLORS.primary }}
                            thumbColor="#ffffff"
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="space-y-3 pb-8">
                    <TouchableOpacity
                        onPress={handlePublishListing}
                        disabled={!isFormValid}
                        style={{
                            backgroundColor: isFormValid ? COLORS.primary : '#d1d5db',
                            paddingVertical: 16,
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
                                color: isFormValid ? COLORS.white : '#6b7280',
                                fontSize: 16,
                                fontWeight: '700',
                                textAlign: 'center',
                            }}
                        >
                            Publish Listing
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Alert.alert('Feature Coming Soon', 'Message functionality will be available soon!')}
                        className="border-2 rounded-xl py-4"
                        style={{ borderColor: COLORS.primary }}
                    >
                        <View className="flex-row items-center justify-center">
                            <Text className="text-2xl mr-2">💬</Text>
                            <Text
                                style={{
                                    color: COLORS.primary,
                                    fontSize: 16,
                                    fontWeight: '700',
                                }}
                            >
                                Message Seller
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}