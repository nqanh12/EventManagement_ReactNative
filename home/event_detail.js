import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Card } from 'react-native-paper'; // Optional package for Card UI
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { format, isBefore } from 'date-fns'; // Import date-fns
import axios from 'axios'; // Import axios

const EventDetailsScreen = () => {
  const route = useRoute();
  const { name, dateStart, dateEnd, location, description, managerName, eventId, token } = route.params;
  const navigation = useNavigation();
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const fetchQRCode = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8080/api/users/getQRCode/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        navigation.navigate('QRCodeScreen', { qrCode: response.data.result.eventsRegistered[0].qrCode });
      } else {
        Alert.alert('Lỗi', 'Không thể lấy mã QR');
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy mã QR');
    }
  };

  const registerEventintoUser = async () => {
    try {
      const response = await axios.post(`http://10.0.2.2:8080/api/users/registerEvent/${eventId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        console.log('Event registered successfully');
        // Optionally, you can update the state to reflect the registration status
      } else {
        Alert.alert('Lỗi', 'Không thể đăng ký sự kiện');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng ký sự kiện');
    }
  };

  const registerEventintoEvent = async () => {
    try {
      const response = await axios.post(`http://10.0.2.2:8080/api/events/addParticipant/${eventId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        Alert.alert('Thành công', 'Đăng ký sự kiện thành công');
        // Optionally, you can update the state to reflect the registration status
      } else {
        Alert.alert('Lỗi', 'Không thể đăng ký sự kiện');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng ký sự kiện');
    }
  };

  const unregisterEvent = async () => {
    try {
      const response = await axios.delete(`http://10.0.2.2:8080/api/users/deleteRegisteredEvent/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        Alert.alert('Thành công', 'Huỷ đăng ký sự kiện thành công');
      } else {
        Alert.alert('Lỗi', 'Không thể huỷ đăng ký sự kiện');
      }
    } catch (error) {
      console.error('Error unregistering for event:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi huỷ đăng ký sự kiện');
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`http://10.0.2.2:8080/api/events/deleteParticipant/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        console.log('User deleted successfully');
      } else {
        Alert.alert('Lỗi', 'Không thể huỷ đăng ký sự kiện');
      }
    } catch (error) {
      console.error('Error unregistering for event:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi huỷ đăng ký sự kiện');
    }
  };

  const fetchRegisteredEvents = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/api/users/getRegisteredEvents', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        const eventIds = response.data.result.eventsRegistered.map(event => event.eventId);
        setRegisteredEventIds(eventIds);
        setRegisteredEvents(response.data.result.eventsRegistered);
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchRegisteredEvents();
  }, [fetchRegisteredEvents]);

  const handleRegisterEvent = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng ký sự kiện này không?',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            await registerEventintoUser();
            await registerEventintoEvent();
            navigation.replace('EventDetails', { ...route.params }); // Reload the page
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteEvent = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn huỷ đăng ký sự kiện này không?',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            await deleteUser();
            await unregisterEvent();
            fetchRegisteredEvents();
            navigation.replace('EventDetails', { ...route.params }); // Reload the page
          },
        },
      ],
      { cancelable: false }
    );
  };

  const isBeforeDateStart = isBefore(new Date(), new Date(dateStart));
  const isRegistered = registeredEventIds.includes(eventId);

  const currentEvent = registeredEvents.find(event => event.eventId === eventId);

  return (
    <LinearGradient
      colors={['#ADD8E6', '#005cfb']} // Light blue to deep blue gradient
      style={styles.container}>
      {/* AppBar */}
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Chi tiết</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Event Info Card */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.eventName}>{name}</Text>
            <View style={styles.row}>
              <Text style={styles.icon}>📅</Text>
              <Text style={styles.eventDetail}>
                {`Ngày bắt đầu: ${format(new Date(dateStart), 'dd/MM/yyyy hh:mm a')}`}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.icon}>📅</Text>
              <Text style={styles.eventDetail}>
                {`Ngày kết thúc: ${format(new Date(dateEnd), 'dd/MM/yyyy hh:mm a')}`}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.icon}>📍</Text>
              <Text style={styles.eventDetail}>Địa điểm : {location}</Text>
            </View>
          </View>
        </Card>

        {/* Description */}
        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Card style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>{description}</Text>
        </Card>

        {/* Manager and Status Section */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.icon}>👤</Text>
              <Text style={styles.eventDetail}>Quản lí: {managerName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.eventDetail}>Trạng thái check-in: </Text>
              {currentEvent?.checkInStatus ? (
                <Image
                  source={require('./assets/true.png')} // Thay đổi với đường dẫn tới hình ảnh check-in của bạn
                  style={styles.statusIcon}
                />
              ) : (
                <Image
                  source={require('./assets/false.png')} // Thay đổi với đường dẫn tới hình ảnh chưa check-in của bạn
                  style={styles.statusIcon}
                />
              )}
            </View>
            <View style={styles.row}>
              <Text style={styles.eventDetail}>Trạng thái check-out: </Text>
              {currentEvent?.checkOutStatus ? (
                <Image
                  source={require('./assets/true.png')} // Thay đổi với đường dẫn tới hình ảnh check-out của bạn
                  style={styles.statusIcon}
                />
              ) : (
                <Image
                  source={require('./assets/false.png')} // Thay đổi với đường dẫn tới hình ảnh chưa check-out của bạn
                  style={styles.statusIcon}
                />
              )}
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, isRegistered || !isBeforeDateStart ? styles.disabledButton : styles.registerButton]}
            disabled={isRegistered || !isBeforeDateStart}
            onPress={handleRegisterEvent}
          >
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isRegistered && isBeforeDateStart ? styles.unregisterButton : styles.disabledButton]}
            disabled={!isRegistered || !isBeforeDateStart}
            onPress={handleDeleteEvent}
          >
            <Text style={styles.buttonText}>Huỷ đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isRegistered ? styles.qrButton : styles.disabledButton]}
            disabled={!isRegistered}
            onPress={fetchQRCode}
          >
            <Text style={styles.buttonText}>Lấy mã QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1975D7',
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
  appBar: {
    height: 70,
    backgroundColor: '#1975D7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  appBarTitle: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  statusIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  content: {
    elevation: 10,
    padding: 16,
  },
  card: {
    borderRadius: 15,
    elevation: 20,
    marginBottom: 20,
  },
  cardContent: {
    padding: 16,
  },
  eventName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  eventDetail: {
    fontSize: 16,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  descriptionCard: {
    borderRadius: 10,
    elevation: 10,
    padding: 12,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
  },
  statusCheckIn: {
    color: 'green',
    fontSize: 16,
  },
  statusNotCheckIn: {
    color: 'red',
    fontSize: 16,
  },
  statusCheckOut: {
    color: 'green',
    fontSize: 16,
  },
  statusNotCheckOut: {
    color: 'red',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#00ab34',
    opacity: 1,
  },
  unregisterButton: {
    backgroundColor: '#ff0000',
    opacity: 1,
  },
  qrButton: {
    backgroundColor: 'blue',
    opacity: 1,
  },
  disabledButton: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
});

export default EventDetailsScreen;
