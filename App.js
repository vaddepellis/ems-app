import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import LeaveScreen from './screens/leaves/LeaveScreen';
import AttendanceScreen from './screens/attendance/AttendanceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen  name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={DashboardScreen} />
      <Drawer.Screen name="Leave" component={LeaveScreen} />
      <Drawer.Screen name="Attendance" component={AppTabs} />
    </Drawer.Navigator>
  );
}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MyDrawer />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn">
            {(props) => <SignInScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
