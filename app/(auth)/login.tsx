import { useSignIn, useSignUp, useSSO, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";

const REQUIRED_DOMAIN = "@u.rochester.edu";

export default function AuthScreen() {
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const { isSignedIn, signOut } = useAuth();

  const { isLoaded: signInLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();

  const [mode, setMode] = useState<"signin" | "signup" | "verify_signup">("signin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");
  const [loading, setLoading] = useState(false);

  // If a valid session already exists, skip auth screen
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [isSignedIn, router]);

  // Google SSO
  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (isSignedIn) await signOut();
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        // redirectUrl: Linking.createURL("sso-callback"), // optional if you set a custom path
      });
      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/domain-gate"); // or /(tabs) if that’s your post-login
      }
    } catch (e: any) {
      Alert.alert("Google sign-in failed", e?.errors?.[0]?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Sign up (email/username/password)
  const handleSignUp = async () => {
    if (!signUpLoaded || loading) return;
    if (!email || !username || !password) {
      return Alert.alert("Missing info", "All fields are required.");
    }
    if (!email.toLowerCase().endsWith(REQUIRED_DOMAIN)) {
      return Alert.alert("Not allowed", `Use your ${REQUIRED_DOMAIN} email.`);
    }
    setLoading(true);
    try {
      if (isSignedIn) await signOut();
      await signUp.create({ emailAddress: email, username, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setMode("verify_signup");
    } catch (err: any) {
      Alert.alert("Sign up failed", err?.errors?.[0]?.message || "Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify email code
  const handleVerifySignupCode = async () => {
    if (!signUpLoaded || loading) return;
    if (!signupCode.trim()) {
      return Alert.alert("Missing code", "Enter the 6-digit code we sent to your email.");
    }
    setLoading(true);
    try {
      if (isSignedIn) await signOut();
      const res = await signUp.attemptEmailAddressVerification({ code: signupCode.trim() });
      if (res.status === "complete" && setActiveSignUp) {
        await setActiveSignUp({ session: res.createdSessionId });
        router.replace("/(tabs)");
      } else {
        Alert.alert("Verification needed", "Please complete the verification step.");
      }
    } catch (err: any) {
      Alert.alert("Invalid code", err?.errors?.[0]?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Sign in
  const handleSignIn = async () => {
    if (!signInLoaded || loading) return;
    const identifier = email || username;
    if (!identifier || !password) {
      return Alert.alert("Missing info", "Email/username and password required.");
    }
    if (identifier.includes("@") && !identifier.toLowerCase().endsWith(REQUIRED_DOMAIN)) {
      return Alert.alert("Not allowed", `Use your ${REQUIRED_DOMAIN} email.`);
    }
    setLoading(true);
    try {
      if (isSignedIn) await signOut();
      const result = await signIn.create({ identifier, password });
      if (result.status === "complete" && setActiveSignIn) {
        await setActiveSignIn({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      Alert.alert("Sign in failed", err?.errors?.[0]?.message || "Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* BRAND SECTION */}
      <View style={styles.brandSection}>
        <Image
          source={require("../../assets/rochester-logo.png")}
          style={{ width: 60, height: 60 }}
        />
        <Text style={styles.appName}>UR-MARKETPLACE</Text>
      </View>

      {/* FORM */}
      <View style={styles.loginSection}>
        {mode === "verify_signup" ? (
          <View style={styles.formCard}>
            <Text style={styles.subtitle}>Verify your email</Text>
            <Text style={styles.helperText}>
              We sent a 6-digit code to {email}. Enter it below to finish creating your account.
            </Text>

            <TextInput
              style={[styles.input, styles.codeInput]}
              placeholder="Enter code"
              value={signupCode}
              onChangeText={setSignupCode}
              keyboardType="number-pad"
              maxLength={6}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.signInButton} onPress={handleVerifySignupCode} disabled={loading}>
              <Text style={styles.signInText}>{loading ? "Verifying..." : "Verify & Continue"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendLink} onPress={handleResendSignupCode} disabled={loading}>
              <Text style={styles.linkText}>Resend code</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 8 }} onPress={() => setMode("signup")} disabled={loading}>
              <Text style={styles.linkText}>Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
            />

            {mode === "signup" && (
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
                autoComplete="username-new"
              />
            )}

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              autoComplete={mode === "signin" ? "password" : "new-password"}
            />

            {mode === "signin" ? (
              <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
                <Text style={styles.signInText}>{loading ? "Signing in..." : "Sign In"}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.signInButton} onPress={handleSignUp} disabled={loading}>
                <Text style={styles.signInText}>{loading ? "Creating..." : "Create Account"}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
              style={{ marginTop: 8 }}
              disabled={loading}
            >
              <Text style={styles.linkText}>
                {mode === "signin"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              activeOpacity={0.9}
              disabled={loading}
            >
              <Ionicons name="logo-google" size={20} color={COLORS.surface} />
              <Text style={styles.googleButtonText}>
                {loading ? "Opening Google..." : "Continue with Google"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
