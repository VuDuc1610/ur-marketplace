import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from './_layout';
import { CATEGORIES } from '../data';
import { Header } from './(sell)/header';
import { PhotoUploader } from './(sell)/photo-uploader';
import { ListingDetails } from './(sell)/listing-data';
import { PricingSection } from './(sell)/pricing-section';
// import { Picker } from '@react-native-picker/picker';


export interface ListingData {
  id: string;
  title: string;
  description: string;
  price: string;
  openToOffer: boolean;
  photos: string[];
  createdAt: string;
  status: 'draft' | 'published';
  categoryId: number;
}

export default function SellScreen() {
  const [listingData, setListingData] = useState<ListingData>({
    id: '',
    title: '',
    description: '',
    price: '',
    openToOffer: false,
    photos: [],
    createdAt: '',
    status: 'draft',
    categoryId: 0,
  });

  const handleInputChange = <K extends keyof ListingData>(field: K, value: ListingData[K]) => {
    setListingData({ ...listingData, [field]: value });
  };

  const validateListing = () => {
    if (!listingData.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return false;
    }
    if (!listingData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }
    if (!listingData.price.trim() || isNaN(parseFloat(listingData.price))) {
      Alert.alert('Error', 'Please enter a valid price');
      return false;
    }
    if (listingData.categoryId === 0) {
      Alert.alert('Error', 'Please select a category');
      return false;
    }
    return true;
  };

  const saveListing = async (listingStatus: 'draft' | 'published') => {
    if (!validateListing()) {
      return;
    }

    try {
      const newListingData = {
        ...listingData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: listingStatus,
        photos: listingData.photos.length > 0
          ? listingData.photos
          : ['https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg'],
      };

      const existingData = await AsyncStorage.getItem('listings');
      const existingListings = existingData ? JSON.parse(existingData) : [];

      existingListings.push(newListingData);

      await AsyncStorage.setItem('listings', JSON.stringify(existingListings));

      Alert.alert('Success', listingStatus === 'published' ? 'Listing Published!' : 'Draft Saved!');
      router.back(); // Navigate back to HomeScreen after saving
    } catch (error) {
      console.error('Error saving listing:', error);
      Alert.alert('Error', 'Failed to save listing. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>


      <Header title="Create Listing" />



      {/* Main Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        
        <PhotoUploader photos={listingData.photos} onAddPhoto={() => Alert.alert('Info', 'Photo upload feature coming soon')} />

        <ListingDetails listingData={listingData} handleInputChange={handleInputChange}/>

        <PricingSection listingData={listingData} handleInputChange={handleInputChange} />


        {/* Action Buttons */}
        <View style={{ margin: 16 }}>
          <TouchableOpacity
            onPress={() => saveListing('published')}
            style={{
              backgroundColor: COLORS.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>Publish Listing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => saveListing('draft')}
            style={{
              backgroundColor: 'transparent',
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          >
            <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: '600' }}>Save Draft</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}