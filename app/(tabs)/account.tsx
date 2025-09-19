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
    <View className="flex-1 bg-background">
      <Header title="My Account"/>
      <ScrollView className='p-4 pb-10 '>
        <UserProfile />
      </ScrollView>
    </View>
  );
}
