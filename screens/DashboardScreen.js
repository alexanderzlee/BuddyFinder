import React, { useState, useEffect } from 'react';
import {Linking} from 'react-native';
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../src/FirebaseAuth';
import MapView from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import UserAvatar from 'react-native-user-avatar'
import { finishWalk } from '../src/FirebaseUser';

export default function DashboardScreen({ navigation }) { // (pass the `navigation` prop to every screen component)
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const getDisplayName = async () => {    
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }

    useEffect(() => {
        if (loading) {
            return;
        }
        getDisplayName();
    }, [user, loading]);
    
    return (
        <View style={styles.container}>
            <View style={styles.userCard}>
                <UserAvatar size={50} name={name} style={styles.userAvatar} />
                <Text style={styles.nameText}>
                    Hello,
                    <Text style={styles.bigName}>
                        {"\n"} { name }
                    </Text>
                </Text>
            </View>
            <View style={styles.topbuttons}>
                <TouchableOpacity
                    style={styles.greenbutton}
                    onPress={() => navigation.navigate("FindBuddy")}
                >
                    <Text style={styles.bigFind}>FIND</Text>
                    <Text style={styles.whiteText}>a Buddy</Text>
                </TouchableOpacity>
                <Text>  </Text>
                <TouchableOpacity
                    style={styles.greenbutton}
                    onPress={() => finishWalk(user)}
                >
                    <Text style={styles.whiteText}>Made it</Text>
                    <Text style={styles.bigFind}>HOME</Text>
                </TouchableOpacity>
            </View>
            <MapView style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={true}
            />
            <View style={styles.fixtotext}>
                <TouchableOpacity
                    style={styles.bluebutton}
                    onPress={() => navigation.navigate("Connections")}
                >
                    <Text style={ styles.company}>Keep a Buddy</Text>
                    <Text style={styles.whiteText}>Company</Text>
                </TouchableOpacity>
                <Text>{"   "}</Text>
                <TouchableOpacity
                    style={styles.redbutton}
                    onPress={() => {Linking.openURL('tel:911');}}
                >
                    <Text style={styles.spacing}> </Text>
                    <Text style={styles.emergency}>EMERGENCY</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2eeeb',
        alignItems: 'center',
    },

    bigName: {
        fontSize: 30,
        fontWeight: "800",
    },

    topbuttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    userCard: {
        display: "flex",
        flexDirection: "row",
        margin: 30,
        alignItems: "center",
    },

    userAvatar: {
        height: 75,
        width: 75,
        borderRadius: 100,
        marginRight: 30,
    },

    fixtotext:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
        position: 'absolute',
        marginBottom: 30,
    },

    bigFind: {
        fontSize: 35,
        color: "#f2eeeb",
        alignItems: 'center',
      },

      nameText: {
        fontSize: 20,
      },

      whiteText: {
        fontSize: 20,
        color: "#f2eeeb",
        alignItems: 'center',
        fontWeight: '800',
      },

    greenbutton: {
        borderRadius: 10,
        backgroundColor: "#025940",
        paddingHorizontal: 40,
        padding: 10,
    },

    bluebutton: {
        borderRadius: 10,
        backgroundColor: "#5364BC",
        paddingHorizontal: 50,
        padding: 10,
    },

    redbutton: {
        borderRadius: 10,
        backgroundColor: "#B13A33",
        paddingHorizontal: 15,
        padding: 10,
    },

    blueText: {
        color: "#f2eeeb",
        fontSize: 10,
        fontWeight: "500",
    },

    company: {
        color: "#f2eeeb",
        fontSize: 12,
        fontWeight: "600",
    },

    emergency: {
        color: "#f2eeeb",
        fontSize: 16,
        fontWeight: 'bold',
    },

    spacing :
    {
        fontSize: 7,
    },

    map: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 25,
        padding: 140,
        width: Dimensions.get('window').width - 80,
        height: Dimensions.get('window').height - 400,
    },
});