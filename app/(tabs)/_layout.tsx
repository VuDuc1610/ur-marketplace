import { Tabs } from 'expo-router';
import { Image, View, Text } from 'react-native';

const COLORS = {
  primary: '#1e3a8a', // navy blue
  secondary: '#ffffff', // white
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fafafa',
          borderTopColor: '#e5e5e5',
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
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
                opacity: focused ? 1 : 0.6,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/49/49116.png' }}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
                opacity: focused ? 1 : 0.6,
              }}
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
                width: 40,
                height: 40,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary, // navy
                marginTop: -4, // lift the middle button a bit
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
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/60/60543.png' }}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
                opacity: focused ? 1 : 0.6,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
                opacity: focused ? 1 : 0.6,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
