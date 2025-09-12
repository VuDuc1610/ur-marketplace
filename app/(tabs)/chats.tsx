import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';

export default function ChatsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-black mb-2">Chats</Text>
        <Text className="text-base text-gray-600 text-center">Your conversations coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
