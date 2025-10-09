import React, { useState } from 'react';
import { View, StyleSheet, Alert,ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, Text, } from '@rneui/themed';

import  AsyncStorage  from '@react-native-async-storage/async-storage'
import { BASE_URL } from '@env';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const data = JSON.stringify(form);

      const config = {
        method: 'post',
        url: BASE_URL + '/register',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(async function (response) {
          // console.log('res', JSON.stringify(response.data));
          console.log('nav', navigation.getState());
          await AsyncStorage.setItem('user',JSON.stringify(response.data));
          // Alert.alert(response.data.status,response.data.message,[{text:'Ok',onPress:()=>navigation.navigate('Dashboard')}]);
          setLoading(false);
          Alert.alert(
            response.data.status,
            response.data.message,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('SignIn');
                },
              }
            ],
            { cancelable: false }
          );
          
        })
        .catch(function (error) {
          console.log(error);
          if (error.response?.status === 422) {
            const apiErrors = error.response.data.errors;
            const formattedErrors = {};

            Object.entries(apiErrors).forEach(([field, messages]) => {
              formattedErrors[field] = messages[0];
            });
            setError(prevErrors => ({
              ...prevErrors,
              ...formattedErrors
            }));
          } else {
            console.error("Unexpected error:", error.message);
          }
        });
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
        {loading && loading ? 
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} /> 
        :
        <View>
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
          onPress={(val)=>{
            signUp(val)
          }}
        />
        <Button
          title="Sign In"
          type="outline"
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
          titleStyle={{ fontWeight: 'bold',color:'#fff' }}
          onPress={()=>navigation.navigate('SignIn')}
        />
        </View>
        }
        
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
  loader: { marginTop: 20 },
});

export default SignUpScreen;
