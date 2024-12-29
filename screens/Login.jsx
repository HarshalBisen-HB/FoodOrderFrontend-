import { useContext, useState } from "react";
import { StyleSheet, View, SafeAreaView, ActivityIndicator } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Surface,
  Portal,
  Provider,
  IconButton,
  useTheme,
  Divider,
  Snackbar,
} from "react-native-paper";
import UserContext from "../Context/UserContext";
import axios from "axios";

function Login(props) {
  const theme = useTheme();
  const userNameFromContext = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  
  const url = `http://localhost:9090/api/loginP`;

  const handleSignIn = async () => {
    if (!credentials.userName || !credentials.password) {
      setSnackMessage("Please fill in all fields");
      setSnackVisible(true);
      return;
    }

    setLoading(true);
    try {
      const userNameEncoded = btoa(credentials.userName);
      const passwordEncoded = btoa(credentials.password);

      const response = await axios.post(url, {
        userName: userNameEncoded,
        password: passwordEncoded
      });

      if (response.data.token) {
       
        props.navigation.navigate("Go-Menu");
      } else {
        setSnackMessage("Invalid credentials");
        setSnackVisible(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setSnackMessage("An error occurred. Please try again.");
      setSnackVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    props.navigation.navigate("Go-Register");
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Surface style={styles.loginContainer} elevation={4}>
          <Text variant="headlineMedium" style={styles.loginTitle}>
            Welcome Back
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Username"
              value={credentials.userName}
              onChangeText={(value) =>
                setCredentials({ ...credentials, userName: value })
              }
              style={styles.input}
              activeOutlineColor="#6D5ACD"
              disabled={loading}
            />

            <TextInput
              mode="outlined"
              label="Password"
              value={credentials.password}
              secureTextEntry={showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              onChangeText={(value) =>
                setCredentials({ ...credentials, password: value })
              }
              style={styles.input}
              activeOutlineColor="#6D5ACD"
              disabled={loading}
            />
          </View>

          <Button
            mode="text"
            onPress={() => {}}
            textColor="#6D5ACD"
            style={styles.forgotPassword}
            disabled={loading}
          >
            Forgot Password?
          </Button>

          <Button
            mode="contained"
            onPress={handleSignIn}
            style={styles.signInBtn}
            buttonColor="#6D5ACD"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              "Sign In"
            )}
          </Button>

          <View style={styles.socialLogin}>
            <View style={styles.dividerContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.socialLoginText}>Or continue with</Text>
              <Divider style={styles.divider} />
            </View>

            <View style={styles.socialIcons}>
              <IconButton
                icon="google"
                size={24}
                mode="outlined"
                containerColor="#f9f9f9"
                iconColor="#6D5ACD"
                onPress={() => {}}
                disabled={loading}
              />
              <IconButton
                icon="twitter"
                size={24}
                mode="outlined"
                containerColor="#f9f9f9"
                iconColor="#6D5ACD"
                onPress={() => {}}
                disabled={loading}
              />
            </View>
          </View>

          <View style={styles.signupLink}>
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text onPress={handleSignUp} style={styles.signupLinkText}>
                Sign Up
              </Text>
            </Text>
          </View>
        </Surface>

        <Portal>
          <Snackbar
            visible={snackVisible}
            onDismiss={() => setSnackVisible(false)}
            duration={3000}
            action={{
              label: "Close",
              onPress: () => setSnackVisible(false),
            }}
          >
            {snackMessage}
          </Snackbar>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    padding: 20,
  },
  loginContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
  },
  loginTitle: {
    color: "#333",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  signInBtn: {
    borderRadius: 8,
    marginBottom: 20,
    paddingVertical: 6,
  },
  socialLogin: {
    marginBottom: 20,
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  divider: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  socialLoginText: {
    color: "#555",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  signupLink: {
    alignItems: "center",
  },
  signupText: {
    color: "#555",
    fontSize: 14,
  },
  signupLinkText: {
    color: "#6D5ACD",
    fontWeight: "bold",
  },
});

export default Login;