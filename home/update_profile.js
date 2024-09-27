import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native';

const UpdateModifile = ({ navigation }) => {
  const [name, setName] = useState('Nguyễn QuốcAnh');
  const [gender, setGender] = useState('Nam');
  const [dob, setDob] = useState('12/05/2003');
  const [phone, setPhone] = useState('+84 98 728 46 71');
  const [email, setEmail] = useState('chaybon894@gmail.com');
  const [address, setAddress] = useState('566/197/25 Nguyễn Thái Sơn');
  const [class_id, setClass] = useState('12DHTH06');



  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('./assets/background.png')} // Replace with your image
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
              source={require('./assets/profile-icon.png')} // Replace with your avatar image
              style={styles.avatar}
            />
          </View>

          {/* Info Section */}
          <ScrollView style={styles.infoContainer}>
            {renderInputField('Tên', name, setName)}
            {renderInputField('Giới tính', gender, setGender)}
            {renderInputField('Lớp', class_id, setClass)}
            {renderInputField('Ngày sinh', dob, setDob)}
            {renderInputField('Điện thoại', phone, setPhone)}
            {renderInputField('Email', email, setEmail)}
            {renderInputField('Địa chỉ', address, setAddress)}


            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={() => { /* Handle save logic */ }}>
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
