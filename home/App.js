import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import Home from './homepage';
import Register from './signup';
import Events from './event_list';
import History from './history';
import Notification from './notification';
import ChoseEventCheck from './chose_event_check';
import EventDetails from './event_detail';
import Setting from './setting';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  name="Login" component={Login} options={ {headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={ {headerShown:false}} />
        <Stack.Screen name="Signup" component={Register} options={ {headerShown:false}}/>
        <Stack.Screen name="EventList" component={Events} options={{headerShown:false}} />
        <Stack.Screen name="History" component={History} options={{headerShown:false}} />
        <Stack.Screen name="Notification" component={Notification} options={{headerShown:false}} />
        <Stack.Screen name="ChoseEvent" component={ChoseEventCheck} options={{headerShown:false}} />
        <Stack.Screen name="EventDetails" component={EventDetails} options={{headerShown:false}} />
        <Stack.Screen name="Setting" component={Setting} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
