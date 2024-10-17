import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

const UpdateModifile = ({ navigation }) => {
  const route = useRoute();
  const { userInfo, token } = route.params;

  const [fullName, setFullName] = useState(userInfo?.full_Name || '');
  const [gender, setGender] = useState(userInfo?.gender || 'Nam');
  const [phone, setPhone] = useState(userInfo?.phone || '');
  const [classId, setClassId] = useState(userInfo?.class_id || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [address, setAddress] = useState(userInfo?.address || '');

  const isValidEmail = (mail) => {
    return mail.endsWith('@gmail.com');
  };

  const isValidPhone = (phoneNumber) => {
    return /^\d+$/.test(phoneNumber);
  };

  const handleSave = async () => {
    if (!userInfo) {
      console.error('userInfo is undefined');
      return;
    }

    if (!fullName || !gender || !phone || !classId || !email || !address) {
      Alert.alert('Lỗi', 'Không được để trốn thông tin nào');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Lỗi', 'Sai định dạng mail');
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert('Lỗi', 'Số điện thoại đúng không định dạng');
      return;
    }

    try {
      const response = await axios.put(
        'http://10.0.2.2:8080/api/users/updateInfo',
        {
          userName: userInfo.userName,
          full_Name: fullName,
          gender: gender,
          class_id: classId,
          email: email,
          phone: phone,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 1000) {
        console.log('Cập nhật thành công', response.data.result);
        Alert.alert('Thành công', 'Cập nhật hồ sơ thành công', [
          { text: 'OK', onPress: () => navigation.navigate('ModifilePersonal', { updatedUserInfo: response.data.result, token: token }) },
        ]);
      } else {
        console.error('Cập nhật thất bại:', response.data);
        Alert.alert('Thất bại', 'Cập nhật hồ sơ thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật hồ sơ');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container_header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
          </TouchableOpacity>
          <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        </View>

        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            {/* Profile Picture */}
            <Image
              source={require('./assets/profile-icon.png')}
              style={styles.avatar}
            />
          </View>

          {/* Info Section */}
          <ScrollView style={styles.infoContainer}>
            {renderInputField('Tên', fullName, setFullName)}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Giới tính</Text>
              <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
                <View style={styles.radioButtonContainer}>
                  <View style={styles.radioButton}>
                    <Text>Nam</Text>
                    <RadioButton value="Nam" />
                  </View>
                  <View style={styles.radioButton}>
                    <Text>Nữ</Text>
                    <RadioButton value="Nữ" />
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            {renderInputField('Lớp', classId, setClassId)}
            {renderInputField('Điện thoại', phone, setPhone)}
            {renderInputField('Email', email, setEmail)}
            {renderInputField('Địa chỉ', address, setAddress)}

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

// Helper function to render an input field
const renderInputField = (label, value, setValue) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    marginHorizontal: 50,
    alignItems: 'center',
  },
  container_header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 16,
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0,
  },
  saveButton: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 25,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default UpdateModifile;
