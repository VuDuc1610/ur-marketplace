// app/domain-gate.tsx
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const REQUIRED_DOMAIN = "@u.rochester.edu";

export default function DomainGate() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const email = user?.primaryEmailAddress?.emailAddress ?? "";
    if (email.toLowerCase().endsWith(REQUIRED_DOMAIN)) {
      router.replace("/(tabs)"); // ✅ allowed → go to main app
    } else {
      Alert.alert(
        "Access restricted",
        `Sorry — you must use a University of Rochester email (ending with ${REQUIRED_DOMAIN}).`
      );
      signOut().finally(() => router.replace("/auth")); // 🚫 not allowed → sign out and go back to auth
    }
  }, [isLoaded]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 12 }}>Checking your email domain…</Text>
    </View>
  );
}
