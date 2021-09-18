import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import LocationMap from '../components/LocationMap';

export default function DashboardScreen({ navigation }) { // (pass the `navigation` prop to every screen component)
    return (
        <View style={styles.container}>
            <Text>Your Location</Text>
            <LocationMap />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2eeeb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 4,
    },
});