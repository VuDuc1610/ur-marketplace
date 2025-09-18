import { ListingData } from "../sell";
import { COLORS } from "../_layout";
import { View, Text, TextInput } from "react-native";
import { CategoryGrid } from "./category-grid";

export const ListingDetails = ({
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
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey, marginBottom: 12 }}>Listing Details</Text>

    <Text style={{ fontSize: 14, fontWeight: '600', color: COLORS.grey, marginBottom: 8 }}>Title</Text>
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
        borderColor: COLORS.surfaceLight,
      }}
    />

    <Text style={{ fontSize: 14, fontWeight: '600', color: COLORS.grey, marginBottom: 8 }}>Description</Text>
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
        textAlignVertical: 'top',
        marginBottom: 16,
      }}
    />

    <CategoryGrid
      selectedCategory={listingData.categoryId}
      onCategorySelect={(categoryId) => handleInputChange('categoryId', categoryId)}
    />
  </View>
);