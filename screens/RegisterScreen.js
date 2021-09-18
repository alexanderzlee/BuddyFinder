import * as React from 'react';
import { View, Text } from 'react-native';
import { Input } from 'react-native-elements';


export default function RegisterScreen({ navigation }) { // (pass the `navigation` prop to every screen component)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Register Screen</Text>
            <Input
                placeholder='Full Name'
            />
            <Input
                placeholder='Phone Number'
            />
            <Input
                placeholder='Password'
            />
        </View>
    );
}