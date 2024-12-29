import { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Title,
  Surface,
} from "react-native-paper";

function Register(props) {
    const[showPassword, setShowPassword] = useState(true);


  const handleRegister = () => {
    props.navigation.navigate("Go-Login");
  };

  const handleSignIn = () => {
    props.navigation.navigate("Go-Login");
  };

  return (  
    <SafeAreaView style={styles.container}>
      <Surface style={styles.registerContainer}>
        <Title style={styles.registerTitle}>Create Account</Title>

        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Username"
            style={styles.input}
            outlineColor="#ddd"
            activeOutlineColor="#6D5ACD"
          />

          <TextInput
            mode="outlined"
            label="Email"
            style={styles.input}
            outlineColor="#ddd"
            activeOutlineColor="#6D5ACD"
            keyboardType="email-address"
          />

          <TextInput
            mode="outlined"
            label="Password"
            style={styles.input}
            outlineColor="#ddd"
            activeOutlineColor="#6D5ACD"
            secureTextEntry={showPassword}
            right={<TextInput.Icon icon={"eye"}
            onPress={()=>{setShowPassword(!showPassword)}}/>}
          />

          <TextInput
            mode="outlined"
            label="Phone Number"
            keyboardType="number-pad"
            style={styles.input}
            outlineColor="#ddd"
            activeOutlineColor="#6D5ACD"
            
          />
        </View>

        <Button
          onPress={handleRegister}
          mode="contained"
          style={styles.registerBtn}
          buttonColor="#6D5ACD"
         
        >
          Register
        </Button>

        {/* <View style={styles.socialLogin}>
          <Text style={styles.socialLoginText}>Or continue with</Text>
          <View style={styles.socialIcons}>
            <IconButton
              icon="Google"
              size={24}
              style={styles.socialIcon}
              iconColor="#6D5ACD"
            />
            <IconButton
              icon="twitter"
              size={24}
              style={styles.socialIcon}
              iconColor="#6D5ACD"
            />
          </View>
        </View> */}

        <View style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text onPress={handleSignIn} style={styles.loginLinkText}>
              Sign In
            </Text>
          </Text>
        </View>
      </Surface>
    </SafeAreaView>
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
  registerContainer: {
    padding: 30,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    elevation: 5,
  },
  registerTitle: {
    color: "#333",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    gap: 10,
  },
  input: {
    backgroundColor: "#f9f9f9",
  },
  registerBtn: {
    marginBottom: 20,
    paddingVertical: 5,
    borderRadius: 8,
  },
  socialLogin: {
    marginBottom: 20,
    alignItems: "center",
  },
  socialLoginText: {
    color: "#555",
    fontSize: 14,
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    backgroundColor: "#f9f9f9",
    margin: 5,
  },
  loginLink: {
    alignItems: "center",
  },
  loginText: {
    color: "#555",
    fontSize: 14,
  },
  loginLinkText: {
    color: "#6D5ACD",
    fontWeight: "bold",
  },
});

export default Register;
