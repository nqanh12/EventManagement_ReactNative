import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import UserManagementScreen from './user_management';
import EventManagementScreen from './event_management';

const Tab = createBottomTabNavigator();


function EventListManagementScreen() {
  return (
    <LinearGradient
      colors={['#c5d8ec', '#1975d7']}
      style={styles.screenContainer}
    >
      <Text>Participant Management Screen</Text>
    </LinearGradient>
  );
}

function ExportReportScreen() {
  return (
    <LinearGradient
      colors={['#c5d8ec', '#1975d7']}
      style={styles.screenContainer}
    >
      <Text>Export Report Screen</Text>
    </LinearGradient>
  );
}

// Hàm xử lý đăng xuất
const handleLogout = (navigation) => {
  Alert.alert(
    'Đăng xuất',
    'Bạn có chắc chắn muốn đăng xuất?',
    [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        onPress: () => {

          navigation.navigate('Login');
        },
      },
    ],
    { cancelable: false }
  );
};

const screenOptions = ({ route, navigation }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconSource;
    if (route.name === 'Users') {
      iconSource = focused ? require('./assets/person.png') : require('./assets/person_outline.png');
    } else if (route.name === 'Events') {
      iconSource = focused ? require('./assets/calendar.png') : require('./assets/calendar_outline.png');
    } else if (route.name === 'Participants') {
      iconSource = focused ? require('./assets/people.png') : require('./assets/people_outline.png');
    } else if (route.name === 'Reports') {
      iconSource = focused ? require('./assets/document.png') : require('./assets/document_outline.png');
    }
    return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
  },
  tabBarActiveTintColor: '#1975d7',
  tabBarInactiveTintColor: 'gray',
  headerTitleAlign: 'center',
  headerRight: () => (
    <TouchableOpacity onPress={() => handleLogout(navigation)}>
      <Image source={require('./assets/logout.png')} style={styles.logoutButton} />
    </TouchableOpacity>
  ),
});

function AdminDashboardScreen() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Users" component={UserManagementScreen} />
      <Tab.Screen name="Events" component={EventManagementScreen} />
      <Tab.Screen name="Participants" component={EventListManagementScreen} />
      <Tab.Screen name="Reports" component={ExportReportScreen} />
    </Tab.Navigator>
  );
}

export default AdminDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1975d7',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    width: 30,
    height: 30,
  },
});
