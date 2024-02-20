import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../services/AuthService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigation = useNavigation();

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  const handleLogin = async () => {
    const result = await loginUser(email, password);

    if (result.success) {
      navigation.navigate("Home");
    } else {
      // Handle login error
      setError(result.error);
      console.error("Login error:", result.error);
    }
  };

  return (
    // <View style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
        <Text style={[styles.inputLabel, isEmailFocused && { top: -10, fontSize: 12, color: "#4f23ff" }]}> Email </Text>
        <View style={[styles.inputHighlight, isEmailFocused && { width: "100%" }]} />
        {error && <Text style={{ color: "red", fontSize: 11, letterSpacing: 0.5, alignSelf: "flex-start", position:"absolute", marginTop: 55 }}>{error}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          autoCapitalize="none"
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <Text style={[styles.inputLabel, isPasswordFocused && { top: -10, fontSize: 12, color: "#4f23ff" }]}> Password  </Text>
        <View style={[styles.inputHighlight, isPasswordFocused && { width: "100%" }]} />
        {error && <Text style={{ color: "red", fontSize: 11, letterSpacing: 0.5, alignSelf: "flex-start", position:"absolute", marginTop: 55 }}>{error}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} title="Login" onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.formText}>
        Don't have an account?{" "}
        <Text style={styles.signupLink} onPress={handleSignup}>
          Signup
        </Text>
      </Text>
      </View>
      
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    gap: 10,
    // alignItems: "center",
  },
  // Input container
  inputContainer: {
    position: "relative",
    margin: 10,
    gap: 10,
  },

  // Input field
  inputField: {
    display: "flex", // React Native doesn't have 'block' display
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    borderWidth: 0, // No border
    outline: "none",
    backgroundColor: "transparent",
  },

  // Input label
  inputLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    fontSize: 16,
    color: "rgba(204, 204, 204, 0)",
    pointerEvents: "none",
    transitionProperty: "all",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease",
  },

  // Input highlight
  inputHighlight: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
    width: 0,
    backgroundColor: "#4f23ff",
    transitionProperty: "all",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease",
  },

  // Input field:focus styles
  inputFieldFocus: {
    "+ inputLabel": {
      top: -20,
      fontSize: 12,
      color: "#4f23ff",
    },
    "+ inputLabel + inputHighlight": {
      width: "100%",
    },
  },
  title:{
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 60,
    paddingLeft: 20,
    letterSpacing: 1,

  },
  buttonContainer: {
    margin: 20,
  },
  button: {
    backgroundColor: "#101010",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    height: 42,
    borderRadius: 5,
    
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    alignContent: "center",
    justifyContent: "center",
  },
  formText: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  signupLink: {
    color: "#4f23ff",
    textAlign: "center",
    // textDecorationLine: "underline",
  }
});

export default LoginScreen;
