import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './_layout';

export default function SearchScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8 }}>Search</Text>
        <Text style={{ fontSize: 16, color: COLORS.grey, textAlign: 'center' }}>Advanced search functionality coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
