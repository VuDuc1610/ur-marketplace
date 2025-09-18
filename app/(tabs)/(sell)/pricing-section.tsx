import { ListingData } from "../sell";
import { View, Text, TextInput } from "react-native";
import { COLORS } from "../_layout";
import { Switch } from "react-native";

export const PricingSection = ({
  listingData,
  handleInputChange,
}: {
  listingData: ListingData;
  handleInputChange: <K extends keyof ListingData>(field: K, value: ListingData[K]) => void;
}) => (
  <View style={{
    backgroundColor: COLORS.surface,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey, marginBottom: 12 }}>Pricing</Text>

    <Text style={{ fontSize: 14, fontWeight: '600', color: COLORS.grey, marginBottom: 8 }}>Price</Text>
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
        borderColor: COLORS.surfaceLight,
      }}
    />

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.grey }}>Open to offers</Text>
      <Switch
        value={listingData.openToOffer}
        onValueChange={(value) => handleInputChange('openToOffer', value)}
        trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary }}
        thumbColor={COLORS.surface}
      />
    </View>
  </View>
);

