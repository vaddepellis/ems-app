import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SignUpScreen({ navigation }) {
  return (
    <View>
      <Text>Sign Up Screen</Text>
      <Button title="Go to Sign In" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}
