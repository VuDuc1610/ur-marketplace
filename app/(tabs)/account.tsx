import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function AccountScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-black mb-2">My Account</Text>
        <Text className="text-base text-gray-600 text-center">Account settings coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
