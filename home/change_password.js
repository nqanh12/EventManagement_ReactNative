import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ChangePasswordScreen = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = () => {
    console.log('Change password logic');
  };

  return (
      <LinearGradient
        colors={['#C5D8EC', '#1975D7']}
        style={styles.container}>
            <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Đổi mật khẩu</Text>
      </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Form Fields */}
          <View style={styles.form}>
            <Text style={styles.label_input}>Mật khẩu hiện tại</Text>
            <CustomPasswordField
              label="Nhập mật khẩu hiện tại..."
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <Text style={styles.label_input}>Mật khẩu mới</Text>
            <CustomPasswordField
              label="Nhập mật khẩu mới"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Text style={styles.label_input}>Xác nhận mật khẩu mới</Text>
            <CustomPasswordField
              label="Nhập xác nhận mật khẩu mới"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
            {/* Change Password Button */}
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.changePasswordButtonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
  );
};

const CustomPasswordField = ({ label, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder={label}
      placeholderTextColor="#333"
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={true}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
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
  label_input: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
    marginStart: 10,
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
  scrollView: {
    padding: 16,
    paddingTop: 20,
  },
  appBar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 117, 215, 1)',
    borderRadius: 8,
    marginBottom: 20,
  },
  appBarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0,5)',
  },
  changePasswordButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  changePasswordButtonText: {
    color: '#1975D7',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default ChangePasswordScreen;
