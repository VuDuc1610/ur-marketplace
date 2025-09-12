import { Tabs } from 'expo-router';
import { Image } from 'react-native';

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
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTEyIDhWMTZNNCAxMkgxNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==' }}
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
