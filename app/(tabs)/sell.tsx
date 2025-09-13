import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from './_layout';
import { launchCameraAsync, launchImageLibraryAsync, requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync, MediaTypeOptions } from 'expo-image-picker';

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
        photos: [],
    });

    const handleGoBack = () => {
        router.back();
    };

    const handleTakePhoto = async () => {
        const { status } = await requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Camera permission is required to take photos');
            return;
        }

        const result = await launchCameraAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setListingData({
                ...listingData,
                photos: [...listingData.photos, result.assets[0].uri],
            });
        }
    };

    const handlePickImage = async () => {
        const { status } = await requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Photo library permission is required to select photos');
            return;
        }

        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setListingData({
                ...listingData,
                photos: [...listingData.photos, result.assets[0].uri],
            });
        }
    };

    const handleRemovePhoto = (index: number) => {
        const newPhotos = listingData.photos.filter((_, i) => i !== index);
        setListingData({ ...listingData, photos: newPhotos });
    };

    const handlePublish = () => {
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
                            photos: [],
                        });
                        router.back();
                    },
                },
            ]
        );
    };

    const isFormValid = listingData.title && listingData.description && listingData.price;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />

            {/* Header */}
            <View style={{ backgroundColor: COLORS.background, paddingHorizontal: 20, paddingVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceLight }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.primary }}>
                            ← Back
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary }}>Create Listing</Text>
                    <View style={{ width: 50 }} />
                </View>
            </View>

            <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 16 }}>
                {/* Photos Section */}
                <View style={{ backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: COLORS.surfaceLight }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>Photos</Text>
                    
                    {/* Photo Grid */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
                        {listingData.photos.map((photo, index) => (
                            <View key={index} style={{ position: 'relative', marginRight: 8, marginBottom: 8 }}>
                                <Image source={{ uri: photo }} style={{ width: 80, height: 80, borderRadius: 8 }} />
                                <TouchableOpacity
                                    onPress={() => handleRemovePhoto(index)}
                                    style={{
                                        position: 'absolute',
                                        top: -5,
                                        right: -5,
                                        backgroundColor: COLORS.primary,
                                        borderRadius: 10,
                                        width: 20,
                                        height: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>×</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Add Photo Buttons */}
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TouchableOpacity
                            onPress={handleTakePhoto}
                            style={{
                                flex: 1,
                                backgroundColor: COLORS.primary,
                                paddingVertical: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: '600' }}>📷 Take Photo</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={handlePickImage}
                            style={{
                                flex: 1,
                                backgroundColor: COLORS.surfaceLight,
                                paddingVertical: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: COLORS.primary,
                            }}
                        >
                            <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: '600' }}>🖼️ Choose Photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Title Section */}
                <View style={{ backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: COLORS.surfaceLight }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>Title *</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: COLORS.surfaceLight, borderRadius: 8, padding: 12, fontSize: 16, color: COLORS.primary, backgroundColor: COLORS.background }}
                        placeholder="Enter item title"
                        placeholderTextColor={COLORS.grey}
                        value={listingData.title}
                        onChangeText={(text) => setListingData({ ...listingData, title: text })}
                    />
                </View>

                {/* Description Section */}
                <View style={{ backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: COLORS.surfaceLight }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>Description *</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: COLORS.surfaceLight, borderRadius: 8, padding: 12, fontSize: 16, color: COLORS.primary, backgroundColor: COLORS.background, height: 100, textAlignVertical: 'top' }}
                        placeholder="Describe your item"
                        placeholderTextColor={COLORS.grey}
                        multiline
                        numberOfLines={4}
                        value={listingData.description}
                        onChangeText={(text) => setListingData({ ...listingData, description: text })}
                    />
                </View>

                {/* Price Section */}
                <View style={{ backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: COLORS.surfaceLight }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>Price *</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: COLORS.primary, marginRight: 8 }}>$</Text>
                        <TextInput
                            style={{ flex: 1, borderWidth: 1, borderColor: COLORS.surfaceLight, borderRadius: 8, padding: 12, fontSize: 16, color: COLORS.primary, backgroundColor: COLORS.background }}
                            placeholder="0.00"
                            placeholderTextColor={COLORS.grey}
                            keyboardType="numeric"
                            value={listingData.price}
                            onChangeText={(text) => setListingData({ ...listingData, price: text })}
                        />
                    </View>
                </View>

                {/* Publish Button */}
                <TouchableOpacity
                    onPress={handlePublish}
                    disabled={!isFormValid}
                    style={{
                        backgroundColor: isFormValid ? COLORS.primary : COLORS.grey,
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 40,
                    }}
                >
                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
                        Publish Listing
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}