import { useSignIn, useSignUp, useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
  const { isLoaded: signInLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();

  // ✅ include verify_signup mode
  const [mode, setMode] = useState<"signin" | "signup" | "verify_signup">("signin");

  // shared fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ verification code state
  const [signupCode, setSignupCode] = useState("");

  // Google SSO
  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });
      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/domain-gate");
      }
    } catch (e) {
      Alert.alert("Google sign-in failed", "Please try again.");
    }
  };

  // Sign up (email/username/password)
  const handleSignUp = async () => {
    if (!signUpLoaded) return;
    if (!email || !username || !password) {
      return Alert.alert("Missing info", "All fields are required.");
    }
    if (!email.toLowerCase().endsWith(REQUIRED_DOMAIN)) {
      return Alert.alert("Not allowed", `Use your ${REQUIRED_DOMAIN} email.`);
    }
    try {
      await signUp.create({ emailAddress: email, username, password });
      if (signUp) {
        if (signUp) {
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        } else {
          Alert.alert("Error", "Sign-up is not available. Please try again later.");
        }
      } else {
        Alert.alert("Error", "Sign-up is not available. Please try again later.");
      }

      // ✅ switch UI to verification code entry
      setMode("verify_signup");
    } catch (err: any) {
      Alert.alert("Sign up failed", err.errors?.[0]?.message || "Try again.");
    }
  };

  // ✅ Verify email code (complete sign up)
  const handleVerifySignupCode = async () => {
    if (!signUpLoaded) return;
    if (!signupCode.trim()) {
      return Alert.alert("Missing code", "Enter the 6-digit code we sent to your email.");
    }
    try {
      const res = await signUp.attemptEmailAddressVerification({ code: signupCode.trim() });
      if (res.status === "complete" && setActiveSignUp) {
        setActiveSignUp({ session: res.createdSessionId });
        router.replace("/(tabs)");
      } else {
        Alert.alert("Verification needed", "Please complete the verification step.");
      }
    } catch (err: any) {
      Alert.alert("Invalid code", err.errors?.[0]?.message || "Please try again.");
    }
  };

  // ✅ Resend verification code
  const handleResendSignupCode = async () => {
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Alert.alert("Code sent", "We emailed you a new verification code.");
    } catch (err: any) {
      Alert.alert("Could not resend", err.errors?.[0]?.message || "Please try again.");
    }
  };

  // Sign in
  const handleSignIn = async () => {
    if (!signInLoaded) return;
    const identifier = email || username;
    if (!identifier || !password) {
      return Alert.alert("Missing info", "Email/username and password required.");
    }
    if (identifier.includes("@") && !identifier.toLowerCase().endsWith(REQUIRED_DOMAIN)) {
      return Alert.alert("Not allowed", `Use your ${REQUIRED_DOMAIN} email.`);
    }
    try {
      const result = await signIn.create({ identifier, password });
      if (result.status === "complete" && setActiveSignIn) {
        setActiveSignIn({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      Alert.alert("Sign in failed", err.errors?.[0]?.message || "Try again.");
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

        {/* ---------- VERIFY SIGNUP MODE ---------- */}
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

            <TouchableOpacity style={styles.signInButton} onPress={handleVerifySignupCode}>
              <Text style={styles.signInText}>Verify & Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendLink} onPress={handleResendSignupCode}>
              <Text style={styles.linkText}>Resend code</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 8 }} onPress={() => setMode("signup")}>
              <Text style={styles.linkText}>Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* ---------- SIGN-IN / SIGN-UP MODES ---------- */}
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
            />

            {mode === "signup" && (
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
              />
            )}

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />

            {mode === "signin" ? (
              <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
                <Text style={styles.signInText}>Create Account</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
              style={{ marginTop: 8 }}
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
            >
              <Ionicons name="logo-google" size={20} color={COLORS.surface} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
