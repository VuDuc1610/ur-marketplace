import { View } from "react-native";
import { COLORS } from "../_layout";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { router } from 'expo-router';

export const Header = ({ title }: { title: string }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  }}>
    <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 16 }}>
      <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: '600' }}>← Back</Text>
    </TouchableOpacity>
    <Text style={{ color: COLORS.grey, fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
  </View>
);