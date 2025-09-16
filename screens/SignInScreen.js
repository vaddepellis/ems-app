import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SignInScreen({ navigation, onLogin }) {
  return (
    <View>
      <Text>Sign In Screen</Text>
      <Button title="Sign In" onPress={onLogin} />
      <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}
