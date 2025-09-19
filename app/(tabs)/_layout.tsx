import { Tabs } from 'expo-router';
import { Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

export const COLORS = {
  primary: "#00205B",     // Rochester Navy
  secondary: "#FFD100",   // Dandelion Yellow
  background: "#F5F7FA",
  surface: "#FFFFFF",
  surfaceLight: "#F2F4F7",
  white: "#FFFFFF",
  grey: "#414141",        // UR's neutral ~90% black
} as const;

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.grey,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.surfaceLight,
            borderTopWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
            height: 70,
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,    
            elevation: 0,  

          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },

          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Feather
                name="home"
                size={24}
                color={color}
                style={{ opacity: focused ? 1 : 0.7 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <Feather
                name="search"
                size={24}
                color={color}
                style={{ opacity: focused ? 1 : 0.7 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="sell"
          options={{
            title: 'Sell',
            tabBarIcon: () => (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.primary,
                  marginTop: -25,
                }}
              >
                <Text style={{ color: COLORS.secondary, fontSize: 20, fontWeight: "800" }}>
                  +
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color, focused }) => (
              <Feather
                name="message-circle"
                size={24}
                color={color}
                style={{ opacity: focused ? 1 : 0.7 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color, focused }) => (
              <Feather
                name="user"
                size={24}
                color={color}
                style={{ opacity: focused ? 1 : 0.7 }}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
