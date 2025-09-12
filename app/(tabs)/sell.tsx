import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';

export default function SellScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-black mb-2">Sell Item</Text>
        <Text className="text-base text-gray-600 text-center">Create a new listing coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
