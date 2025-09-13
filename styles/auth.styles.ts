import { COLORS } from "../constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  brandSection: {
    alignItems: "center",
    marginTop: height * 0.12,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 42,
    fontWeight: "700",
    fontFamily: "JetBrainsMono-Medium",
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 8,
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: COLORS.grey,
    letterSpacing: 1,
    textTransform: "lowercase",
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  illustration: {
    width: width * 0.75,
    height: width * 0.75,
    maxHeight: 280,
  },
  loginSection: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.surface,
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.grey,
    maxWidth: 280,
  },
  // ⬇️ Paste these INSIDE your existing StyleSheet.create({...}) object

  // --- form wrapper (optional card look for inputs) ---
  formCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: COLORS.surface,
    padding: 18,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 2,
    alignItems: "center",
  },

  // --- text inputs ---
  input: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },
  codeInput: {
    width: "100%",
    maxWidth: 180,
    letterSpacing: 4,
    textAlign: "center",
  },
  inputError: {
    borderColor: "#ef4444",
  },

  // --- primary auth button (Sign in / Create account / Verify) ---
  signInButton: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  signInButtonDisabled: {
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  signInText: {
    color: COLORS.surface,
    fontWeight: "600",
    fontSize: 16,
  },

  // --- links / helper texts / headings ---
  linkText: {
    textAlign: "center",
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
  resendLink: {
    marginTop: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#111827",
  },
  helperText: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: "center",
    marginBottom: 16,
  },
  smallNote: {
    fontSize: 12,
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 8,
  },

  // --- "OR" divider (text-only) ---
  orText: {
    textAlign: "center",
    color: COLORS.grey,
    marginVertical: 12,
    fontSize: 14,
  },

  // --- horizontal divider (optional visual line) ---
  divider: {
    width: "100%",
    maxWidth: 300,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginVertical: 12,
  },

  // --- error text (below inputs) ---
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginBottom: 8,
    textAlign: "left",
    alignSelf: "flex-start",
    maxWidth: 300,
  },

});