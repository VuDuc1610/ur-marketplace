import { Tabs } from 'expo-router';
import { Image, View, Text } from 'react-native';

export const COLORS = {
  primary: "#00205B",     // Rochester Navy
  secondary: "#FFD100",   // Dandelion Yellow (use as accent, not body text)
  background: "#F5F7FA",
  surface: "#FFFFFF",
  surfaceLight: "#F2F4F7",
  white: "#FFFFFF",
  grey: "#414141",        // UR's neutral ~90% black
} as const;


export default function TabLayout() {
  return (
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
            <View style={{
              padding: 6,
              borderRadius: 8,
              backgroundColor: focused ? COLORS.surfaceLight : 'transparent',
            }}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              padding: 6,
              borderRadius: 8,
              backgroundColor: focused ? COLORS.surfaceLight : 'transparent',
            }}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/49/49116.png' }}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
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
                backgroundColor: COLORS.primary, // navy
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
            <View style={{
              padding: 6,
              borderRadius: 8,
              backgroundColor: focused ? COLORS.surfaceLight : 'transparent',
            }}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/60/60543.png' }}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              padding: 6,
              borderRadius: 8,
              backgroundColor: focused ? COLORS.surfaceLight : 'transparent',
            }}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
