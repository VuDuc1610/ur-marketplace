import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export function UserProfile() {
  return (
    <View className="px-4">
      <TouchableOpacity className="flex-row justify-between items-center bg-surface p-3 rounded-xl" activeOpacity={0.7}>
        <View className="flex-row items-center">

          <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center">
            <Text className="text-secondary text-lg">😊</Text>
          </View>

          <View className="flex-row items-center ml-3">
            <Text className="text-gray-900 font-medium text-base">duc</Text>
          </View>
        </View>

        <Feather name="chevron-right" size={20} color="#9BA3AF" />
      </TouchableOpacity>
    </View>
  );
}
