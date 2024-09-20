import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './login';
import HomeScreen from './homepage';
import RegisterScreen from './signup';
import EventsScreen from './event_list';
import HistoryScreen from './history';
import NotificationScreen from './notification';
import ChoseEventCheck from './chose_event_check';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  name="Login" component={LoginScreen} options={ {headerShown:false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={ {headerShown:false}} />
        <Stack.Screen name="Signup" component={RegisterScreen} options={ {headerShown:false}}/>
        <Stack.Screen name="EventList" component={EventsScreen} options={{headerShown:false}} />
        <Stack.Screen name="History" component={HistoryScreen} options={{headerShown:false}} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={{headerShown:false}} />
        <Stack.Screen name="ChoseEvent" component={ChoseEventCheck} options={{headerShown:false}} />
        {/* <Stack.Screen name='ScanQR' component={ScanQRCodeScreen} options={{headerShown:false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
