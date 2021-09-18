import * as React from 'react';
import { Button, Text, View } from 'react-native';

export default function LoginScreen({ navigation }) { // (pass the `navigation` prop to every screen component)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <Button
                title="Dashboard"
                onPress={() => navigation.navigate('Dashboard')}
            />
        </View>
    );
}