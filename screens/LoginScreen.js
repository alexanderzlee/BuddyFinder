import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../src/FirebaseAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import WelcomeGraphic from "../components/WelcomeGraphic";


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigation.navigate("Dashboard");
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
        <WelcomeGraphic />
        <Text>{"\n\n"}</Text>
        <TextInput style={styles.input}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            value={email}
        />
        <Text>{"\n"}</Text>
        <TextInput style={styles.input}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            secureTextEntry={true}
        />
        <TouchableOpacity
        style={styles.greenbutton}
        onPress={() => signInWithEmailAndPassword(email, password)}
        >
        <Text style={styles.whiteText}>LOG IN</Text>
        </TouchableOpacity>
        {loading && <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#f2eeeb',
        alignItems: 'center',
    },

    whiteText: {
      fontSize: 20,
      color: "#f2eeeb",
      alignItems: 'center',
    },

    input: {
      fontSize: 20,
    },

    greenbutton: {
        borderRadius: 25,
        backgroundColor: "#025940",
        paddingHorizontal: 139,
        padding: 20,
        bottom:0,
        position: 'absolute',
        marginBottom: 36
    },
});

export default LoginScreen;