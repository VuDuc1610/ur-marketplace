import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../_layout";

export const ActionButtons = ({
  onPublish,
  onSaveDraft,
}: {
  onPublish: () => void;
  onSaveDraft: () => void;
}) => (
  <View style={{ margin: 16 }}>
    <TouchableOpacity
      onPress={onPublish}
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
      onPress={onSaveDraft}
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
);