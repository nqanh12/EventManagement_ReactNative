import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const ScanScreen = () => {
  const [isCheckIn, setIsCheckIn] = useState(true);
  const [fullName, setFullName] = useState(null);
  const [userName, setUsername] = useState(null);
  const [scannedEventId, setScannedEventId] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId, token } = route.params;

  const onSuccess = async e => {
    try {
      const qrData = e.data;
      const scannedEventId = qrData.substring(0, 9); // Extract eventId
      const studentId = qrData.substring(9); // Extract studentId

      // Compare event IDs
      if (scannedEventId !== eventId) {
        Alert.alert('Lỗi', 'Sinh viên không có trong sự kiện');
        return;
      }

      // Fetch user full name using studentId
      const response = await axios.get(`http://10.0.2.2:8080/api/users/getFullName/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        setFullName(response.data.result);
        setUsername(studentId);
        setScannedEventId(scannedEventId);
      } else {
        Alert.alert('Lỗi', 'Không thể lấy thông tin sự kiện');
      }
    } catch (err) {
      console.error('An error occurred', err);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi quét mã QR');
    }
  };

  const handleAttendance = async () => {
    if (!scannedEventId || !userName) {
      Alert.alert('Lỗi', 'Vui lòng quét mã QR trước');
      return;
    }

    try {
      if (isCheckIn) {
        await checkInUser(scannedEventId, userName);
        await checkInEvent(scannedEventId, userName);
      } else {
        await checkOutUser(scannedEventId, userName);
        await checkOutEvent(scannedEventId, userName);
      }
    } catch (err) {
      console.error('An error occurred', err);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi điểm danh');
    }
  };

  const checkInUser = async (eventID, studentId) => {
    try {
      const response = await axios.put(`http://10.0.2.2:8080/api/users/checkIn/${eventID}/${studentId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        Alert.alert('Thành công', 'Check-in thành công');
      } else {
        Alert.alert('Lỗi', 'Không thể check-in');
      }
    } catch (err) {
      console.error('An error occurred', err);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi check-in');
    }
  };

  const checkOutUser = async (eventID, studentId) => {
    try {
      const response = await axios.put(`http://10.0.2.2:8080/api/users/checkOut/${eventID}/${studentId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        Alert.alert('Thành công', 'Check-out thành công');
      } else {
        Alert.alert('Lỗi', 'Không thể check-out');
      }
    } catch (err) {
      console.error('An error occurred', err);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi check-out');
    }
  };

  const checkInEvent = async (eventID, studentId) => {
    try {
      const response = await axios.put(`http://10.0.2.2:8080/api/events/checkIn/${eventID}/${studentId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        Alert.alert('Thành công', 'Check-in thành công');
      } else {
        Alert.alert('Lỗi', 'Không thể check-in');
      }
    } catch (err) {
      console.error('An error occurred', err);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi check-in');
    }
  };

  const checkOutEvent = async (eventID, studentId) => {
    try {
      const response = await axios.put(`http://10.0.2.2:8080/api/events/checkOut/${eventID}/${studentId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        Alert.alert('Thành công', 'Check-out thành công');
      } else {
        Alert.alert('Lỗi', 'Không thể check-out');
      }
    } catch (err) {
      console.error('An error occurred', err);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi check-out');
    }
  };

  const toggleSwitch = () => {
    setIsCheckIn(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Quét QR</Text>
      </View>
      {/* QR Code Scanner */}
      <View style={styles.qrContainer}>
            <QRCodeScanner
              onRead={onSuccess}
              flashMode={RNCamera.Constants.FlashMode.torch}
              reactivate={true}
              containerStyle={styles.scannerContainer}
              cameraStyle={styles.cameraStyle}
            />

            {/* Event Details */}
            {fullName && (
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>Họ và tên: {fullName.full_Name}</Text>
                <Text style={styles.eventDate}>MSSV : {userName}</Text>
              </View>
            )}
    </View>
      {/* Bottom Section */}
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        style={styles.bottomSection}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('ListStudentEvent', {eventId: eventId,token: token })}>
            <Image source={require('./assets/list_icon.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Xem danh sách</Text>
          </TouchableOpacity>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>{isCheckIn ? 'Check-in' : 'Check-out'}</Text>
            <Switch
              value={isCheckIn}
              onValueChange={toggleSwitch}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isCheckIn ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleAttendance}>
            <Image source={require('./assets/upload_icon.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Điểm danh</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#1975D7',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  qrContainer: {
    flex: 1,
    backgroundColor: '#1975D7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_back: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    marginEnd: 30,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraStyle: {
    height: '70%',
    marginTop: 90,
  },
  bottomSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#0066cc',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetails: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 16,
    elevation: 5,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    marginBottom: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
});

export default ScanScreen;
