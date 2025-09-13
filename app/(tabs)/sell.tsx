import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from './_layout';

interface ListingData {
  title: string;
  description: string;
  price: string;
  openToOffer: boolean;
  photos: string[];
}

export default function SellScreen() {
  const [listingData, setListingData] = useState<ListingData>({
    title: '',
    description: '',
    price: '',
    openToOffer: false,
    photos: [],
  });
  const handleInputChange = (field, value) => {
    setListingData({...listingData, [field]: value});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.surfaceLight
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{position: 'absolute', left: 0}}
        >
      <Text style={{color: COLORS.primary, fontSize: 16, fontWeight: '600'}}>← Back</Text>
        </TouchableOpacity>
        <Text style={{color: COLORS.grey, fontSize: 18, fontWeight: 'bold'}}>Create Listing</Text>      </View>

      {/* main */}
      <ScrollView>
        {/* Photos */}
        <View style={{
          backgroundColor: COLORS.surface,
          margin: 16,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: COLORS.surfaceLight
        }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.grey, marginBottom: 12}}>Photos</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Photo feature coming soon')}
            style={{
              backgroundColor: COLORS.surfaceLight,
              padding: 20,
              borderRadius: 8,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: COLORS.surfaceLight,
              borderStyle: 'dashed'
            }}
          >
            <Text style={{fontSize: 24, marginBottom: 8}}>+</Text>
            <Text style={{fontSize: 16, fontWeight: '600', color: COLORS.grey}}>
              Add Photos ({listingData.photos.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{
          backgroundColor: COLORS.surface,
          margin: 16,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: COLORS.surfaceLight
        }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.grey, marginBottom: 12}}>Listing Details</Text>

          <Text style={{fontSize: 14, fontWeight: '600', color: COLORS.grey, marginBottom: 8}}>Title</Text>
          <TextInput
            placeholder="Enter title"
            value={listingData.title}
            onChangeText={(value) => handleInputChange('title', value)}
            style={{
              backgroundColor: COLORS.surfaceLight,
              padding: 12,
              borderRadius: 8,
              fontSize: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: COLORS.surfaceLight
            }}
          />

          <Text style={{fontSize: 14, fontWeight: '600', color: COLORS.grey, marginBottom: 8}}>Description</Text>
          <TextInput
            placeholder="Enter description"
            value={listingData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            multiline
            numberOfLines={3}
            style={{
              backgroundColor: COLORS.surfaceLight,
              padding: 12,
              borderRadius: 8,
              fontSize: 16,
              borderWidth: 1,
              borderColor: COLORS.surfaceLight,
              textAlignVertical: 'top'
            }}
          />
        </View>

        <View style={{
          backgroundColor: COLORS.surface,
          margin: 16,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: COLORS.surfaceLight
        }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.grey, marginBottom: 12}}>Pricing</Text>

          <Text style={{fontSize: 14, fontWeight: '600', color: COLORS.grey, marginBottom: 8}}>Price</Text>
          <TextInput
            placeholder="0.00"
            value={listingData.price}
            onChangeText={(value) => handleInputChange('price', value)}
            keyboardType="numeric"
            style={{
              backgroundColor: COLORS.surfaceLight,
              padding: 12,
              borderRadius: 8,
              fontSize: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: COLORS.surfaceLight
            }}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600', color: COLORS.grey}}>Open to offers</Text>
            <Switch
              value={listingData.openToOffer}
              onValueChange={(value) => handleInputChange('openToOffer', value)}
              trackColor={{false: COLORS.surfaceLight, true: COLORS.primary}}
              thumbColor={COLORS.surface}
            />
          </View>
        </View>

        <View style={{
          margin: 16,
          paddingBottom: 20
        }}>
          <TouchableOpacity
            onPress={() => {
              if (!listingData.title || !listingData.description || !listingData.price) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
              }
              Alert.alert('Success', 'Listing published!', [
                {
                  text: 'OK',
                  onPress: () => {
                    // Clear the form
                    setListingData({
                      title: '',
                      description: '',
                      price: '',
                      openToOffer: false,
                      photos: []
                    });
                  }
                }
              ]);
            }}
            style={{
              backgroundColor: (!listingData.title || !listingData.description || !listingData.price)
                ? COLORS.surfaceLight
                : COLORS.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 12
            }}
          >
            <Text style={{
              color: (!listingData.title || !listingData.description || !listingData.price)
                ? COLORS.grey
                : COLORS.white,
              fontSize: 16,
              fontWeight: 'bold'
            }}>
              Publish Listing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Alert.alert('Coming soon')}
            style={{
              backgroundColor: 'transparent',
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: COLORS.primary
            }}
          >
            <Text style={{color: COLORS.primary, fontSize: 16, fontWeight: '600'}}>Save Draft</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}