import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, Text } from '@rneui/themed';
import { BASE_URL } from '@env';
const SignUpScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.lastname.trim()) newErrors.lastname = 'Lastname is required';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.password.trim()) newErrors.password = 'Password is required';
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = 'Confirm Password is required';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const signUp = () => {
    if (validateForm()) {
      console.log(BASE_URL,'Form is valid. Proceed with sign up...',form);
      // Proceed with API call or next steps
    } else {
      console.log('Form has validation errors.');
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError({ ...error, [key]: '' }); // Clear error on input change
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.darkBlue} h3>Please enter details</Text>
      <View>
        <Input
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
          errorStyle={{ color: 'red' }}
          errorMessage={error.name}
        />
        <Input
          placeholder="Lastname"
          value={form.lastname}
          onChangeText={(text) => handleChange('lastname', text)}
          errorStyle={{ color: 'red' }}
          errorMessage={error.lastname}
        />
        <Input
          placeholder="Mobile"
          value={form.mobile}
          onChangeText={(text) => handleChange('mobile', text)}
          errorStyle={{ color: 'red' }}
          errorMessage={error.mobile}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          errorStyle={{ color: 'red' }}
          errorMessage={error.email}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          errorStyle={{ color: 'red' }}
          errorMessage={error.password}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={form.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          errorStyle={{ color: 'red' }}
          errorMessage={error.confirmPassword}
        />
        <Button
          title="Sign Up"
          buttonStyle={{
            backgroundColor: '#00008b',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 0,
            marginVertical: 5,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={signUp}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  darkBlue: {
    color: '#00008b',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SignUpScreen;
