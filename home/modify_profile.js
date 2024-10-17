import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const ModifyProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    full_Name: '',
    gender: '',
    phone: '',
    dob: '',
    class_id: '',
    email: '',
    address: '',
    training_point: '',
  });
  const route = useRoute();
  const { token } = route.params;
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8080/api/users/myInfo', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setUserInfo(response.data.result);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    if (route.params?.updatedUserInfo) {
      setUserInfo(route.params.updatedUserInfo);
    } else {
      fetchUserInfo();
    }
  }, [token, route.params?.updatedUserInfo]);


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.backgroundImage}>
        <View style={styles.container_header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
          </TouchableOpacity>
          <Text style={styles.title}>Hồ sơ</Text>
        </View>
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            {/* Profile Picture */}
            <Image
              source={require('./assets/profile-icon.png')}
              style={styles.avatar}
            />
            <Text style={styles.name}>{userInfo.full_Name || 'Chưa cập nhật'}</Text>
            <Text style={styles.subtitle}>Thông tin cá nhân</Text>
          </View>

          {/* Info Section */}
          <ScrollView style={styles.infoContainer}>
            {renderInfoRow('MSSV', userInfo.userName)}
            {renderInfoRow('Giới tính', userInfo.gender)}
            {renderInfoRow('Điện thoại', userInfo.phone)}
            {renderInfoRow('Điểm rèn luyện', userInfo.training_point)}
            {renderInfoRow('Lớp', userInfo.class_id)}
            {renderInfoRow('Email', userInfo.email)}
            {renderInfoRow('Địa chỉ', userInfo.address)}
            {/* Edit Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('UpdateModifile', { token: token, userInfo: userInfo })} // Đảm bảo tên màn hình là 'UpdateModifile'
            >
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const truncateString = (str, num) => {
  if (!str) {return '';} // Check if str is undefined or null
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

// Helper function to render an info row
const renderInfoRow = (label, value) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{truncateString(value || 'Chưa cập nhật', 20)}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay on the background image
    paddingTop: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 17,
    color: 'black',
  },
  infoValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  editButton: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 15,
    borderRadius: 25,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default ModifyProfileScreen;
