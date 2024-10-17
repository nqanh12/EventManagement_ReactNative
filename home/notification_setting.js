import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NotificationSettings = ({navigation}) => {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEmailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#C5D8EC', '#1975D7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}>
        <View style={styles.container_header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
          </TouchableOpacity>
          <Text style={styles.title}>Thông báo</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Nhận thông báo</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={(value) => {
                setNotificationsEnabled(value);
                // Xử lý logic bật/tắt nhận thông báo ở đây
              }}
            />
          </View>

          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Thông báo email</Text>
            <Switch
              value={isEmailNotificationsEnabled}
              onValueChange={(value) => {
                setEmailNotificationsEnabled(value);
                // Xử lý logic bật/tắt thông báo email ở đây
              }}
            />
          </View>

          {/* Thêm các tùy chọn thông báo khác nếu cần */}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
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
  content: {
    padding: 16,
    marginTop: 30,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 20,
    color: 'black',
  },
});

export default NotificationSettings;
