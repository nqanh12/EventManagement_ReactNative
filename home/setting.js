import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const settingsOptions = [
  {
    title: 'Thay đổi mật khẩu',
    icon: require('./assets/lock.png'),
    screen: 'ChangePassword', // Add your navigation route name here
  },
  {
    title: 'Cập nhật thông tin cá nhân',
    icon: require('./assets/person.png'),
    screen: 'ModifilePersonal', // Add your navigation route name here
  },
  {
    title: 'Cài đặt ngôn ngữ',
    icon: require('./assets/language.png'),
    screen: 'LanguageSettingsScreen', // Add your navigation route name here
  },
  {
    title: 'Cài đặt thông báo',
    icon: require('./assets/notification_unactive.png'),
    screen: 'NotificationSettingsScreen', // Add your navigation route name here
  },
  {
    title: 'Đăng xuất',
    icon: require('./assets/logout.png'),
    screen: 'Login', // Add your login route here
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleOptionPress = (item) => {
    if (item.title === 'Đăng xuất') {
      showLogoutAlert();
    } else {
      navigation.navigate(item.screen);
    }
  };

  const showLogoutAlert = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => navigation.replace('Login'), // Assuming "Login" is the logout screen
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handleOptionPress(item)}
    >
      <View style={styles.option}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.optionText}>{item.title}</Text>
        <Image source={require('./assets/arrow.png')} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#ADD8E6', '#005cfb']} style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Lịch Sử</Text>
      </View>
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Light blue background for the screen
  },
  container_header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#1975D7',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon_back: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    marginEnd: 30,
  },
  list: {
    padding: 16,
    paddingTop: 30, // Adjust top padding for an AppBar equivalent
  },
  optionContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
    tintColor: '#1975D7', // Use a color for consistency
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#888', // Grey color for the arrow
  },
});

export default SettingsScreen;
