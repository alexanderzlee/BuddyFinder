import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { auth, registerWithEmailPhoneAndPassword } from "../src/FirebaseAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import WelcomeGraphic from "../components/WelcomeGraphic";

function RegisterScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // TODO: loading screen
      return;
    }
    if (user) {
      navigation.navigate("Home");
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
        <WelcomeGraphic />
        <TextInput style={styles.top}
            placeholder="Name"
            onChangeText={setName}
            value={name}
        />
        <TextInput style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
        />
        <TextInput style={styles.input}
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
        />
        <TextInput style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
        />
        <TouchableOpacity
        style={styles.greenbutton}
        onPress={() => registerWithEmailPhoneAndPassword(name, email, phoneNumber, password)}
        >
        <Text style={styles.whiteText}>REGISTER</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#f2eeeb',
        alignItems: 'center',
    },
    top: {
      fontSize: 20,
      marginTop: 5,
    },

    input: {
      marginTop: 3,
      fontSize: 20,
    },

    whiteText: {
      fontSize: 20,
      color: "#f2eeeb",
      alignItems: 'center',
    },

    greenbutton: {
      borderRadius: 25,
      backgroundColor: "#025940",
      paddingHorizontal: 135,
      bottom: 0,
      position: "absolute",
      marginBottom: 36,
      padding: 20
    },
});

export default RegisterScreen;