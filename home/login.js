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

const LoginScreen = ({ navigation }) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = async () => {
    const API_URL = 'http://10.0.2.2:8080/auth/login';
    const payload = {
      userName,
      password,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại');
      }

      const result = await response.json();
      if (result.code === 1000) {
        if (result.result.role === '[ADMIN]') {
          navigation.navigate('DashboardAdmin', { token: result.result.token, role: result.result.role });
          Alert.alert('Thông báo', 'Đăng nhập thành công');
        }
        if (result.result.role === '[USER]') {
          navigation.navigate('Home', { token: result.result.token, role: result.result.role });
          Alert.alert('Thông báo', 'Đăng nhập thành công');
        }
        if (result.result.role === '[MANAGER]') {
          navigation.navigate('Home', { token: result.result.token, role: result.result.role });
          Alert.alert('Thông báo', 'Đăng nhập thành công');
        }
      } else {
        Alert.alert('Đăng nhập thất bại', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.topContainer}>
        <Text style={styles.title}>Hệ thống đăng nhập</Text>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <SafeAreaView style={styles.inputContainer}>
          <Image source={require('./assets/user.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Tài khoản"
            placeholderTextColor="#888"
            onChangeText={setUsername}
            value={userName}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Image source={require('./assets/lock.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword} // Toggle visibility
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? require('./assets/eye-off.png') : require('./assets/eye.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <TouchableHighlight style={styles.button} onPress={handleLogin} underlayColor="#000000">
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableHighlight>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupButtonText}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    fontWeight: 'bold',
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
  },
  input: {
    flex: 1,
    height: 60,
    color: '#333',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#333',
  },
  signupButtonText: {
    color: '#005cfb',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
