import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu và xác nhận mật khẩu không trùng khớp.');
    } else {
      Alert.alert('Đăng ký thành công', `Chào mừng ${username}!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background} />
      <View style={styles.topContainer}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Image source={require('./assets/user.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Tài khoản"
            placeholderTextColor="#888"
            onChangeText={setUsername}
            value={username}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('./assets/lock.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#888"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('./assets/lock.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu"
            placeholderTextColor="#888"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>

        <TouchableHighlight style={styles.button} onPress={handleRegister} underlayColor="#000000">
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableHighlight>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Bạn có tài khoản?</Text>
          <TouchableOpacity>
            <Text style={styles.loginButtonText} onPress={() => navigation.navigate('Login')}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f6fc',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#c5d8ec',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30,
    marginTop: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#333',
    borderRadius: 30,
    height: 60,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#005cfb',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#333',
  },
  loginButtonText: {
    color: '#005cfb',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default RegisterScreen;
