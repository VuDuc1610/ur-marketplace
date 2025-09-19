import { View, ScrollView } from 'react-native';
import { Header } from './(sell)/header';
import { UserProfile } from 'components/UserProfile';

export default function AccountScreen() {

  const buyingSellingItems = [
    { icon: "file-text", title: "Listings" },
    { icon: "shopping-bag", title: "Purchases" },
    { icon: "heart", title: "Favorites" },
  ];

  return (
    <View className="flex-1 bg-gray-100 pb-5">
      <Header title="My Account" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 10 }}>
        <UserProfile />
      </ScrollView>
    </View>
  );
}
