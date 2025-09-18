import { COLORS } from "../_layout";
import { View, Text, TouchableOpacity } from "react-native";
import { CATEGORIES } from "utils/data";

export const CategoryGrid = ({ selectedCategory, onCategorySelect }) => {
  return (
    <View>
      <Text style={{ fontSize: 14, fontWeight: '600', color: COLORS.grey, marginBottom: 12 }}>
        Category
      </Text>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
      }}>
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => onCategorySelect(category.id)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: isSelected ? COLORS.primary : COLORS.surfaceLight,
                backgroundColor: isSelected ? COLORS.primary : COLORS.surface,
                minWidth: 80,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: isSelected ? 'bold' : '600',
                color: isSelected ? COLORS.white : COLORS.grey,
              }}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {selectedCategory === 0 && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: -8, marginBottom: 8 }}>
          Please select a category
        </Text>
      )}
    </View>
  );
};
