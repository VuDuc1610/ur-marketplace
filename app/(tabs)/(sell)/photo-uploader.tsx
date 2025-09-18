import { View } from "react-native";
import { COLORS } from "../_layout";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

export const PhotoUploader = ({ photos, onAddPhoto }: { photos: string[]; onAddPhoto: () => void }) => (
  <View style={{
    backgroundColor: COLORS.surface,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey, marginBottom: 12 }}>Photos</Text>
    <TouchableOpacity
      onPress={onAddPhoto}
      style={{
        backgroundColor: COLORS.surfaceLight,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.surfaceLight,
        borderStyle: 'dashed',
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 8 }}>+</Text>
      <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.grey }}>
        Add Photos ({photos.length})
      </Text>
    </TouchableOpacity>
  </View>
);
