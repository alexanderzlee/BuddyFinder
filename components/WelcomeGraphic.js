import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {TouchableOpacity} from 'react-native';

export default function WelcomeGraphic() {
  return (
    <View>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.titleText}>Buddy {"\n"}Finder</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 35,
    alignItems: 'center',
  },

  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});