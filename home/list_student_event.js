import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

// Get status icon based on check-in/out status
const getStatus = (participant) => {
  if (participant.checkInStatus && participant.checkOutStatus) {
    return { text: 'Hoàn thành', color: 'green' };
  } else if (participant.checkInStatus || participant.checkOutStatus) {
    return { text: 'Cảnh báo', color: 'orange' };
  } else {
    return { text: 'Chưa check', color: 'red' };
  }
};

const ParticipantItem = ({ participant, token }) => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8080/api/users/getFullName/' + participant.userName, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.code === 1000) {
          setFullName(response.data.result.full_Name);
        } else {
          Alert.alert('Lỗi', 'Không thể tải tên của sinh viên');
        }
      } catch (err) {
        console.error('An error occurred', err);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải tên đầy đủ của sinh viên');
      }
    };

    fetchFullName();
  }, [participant.userName, token]);

  const status = getStatus(participant);
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Image source={require('./assets/profile-icon.png')} style={styles.avatarImage} />
      </View>
      <View style={styles.participantInfo}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.checkStatus}>
          Check-in: <Text style={participant.checkInStatus ? styles.checkIn : styles.notCheckIn}>
            {participant.checkInStatus ? 'Đã Check-in' : 'Chưa Check-in'}
          </Text>
        </Text>
        <Text style={styles.checkStatus}>
          Check-out: <Text style={participant.checkOutStatus ? styles.checkOut : styles.notCheckOut}>
            {participant.checkOutStatus ? 'Đã Check-out' : 'Chưa Check-out'}
          </Text>
        </Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: status.color }]}>{status.text}</Text>
      </View>
    </View>
  );
};

const EventParticipantsScreen = ({ navigation }) => {
  const [participants, setParticipants] = useState([]);
  const route = useRoute();
  const { eventId , token } = route.params;

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8080/api/events/participants/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.code === 1000) {
          setParticipants(response.data.result.participants);
        } else {
          Alert.alert('Lỗi', 'Không thể tải danh sách sinh viên');
        }
      } catch (err) {
        console.error('An error occurred', err);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải danh sách sinh viên');
      }
    };

    fetchParticipants();
  }, [eventId, token]);

  // Count participants who completed both check-in and check-out
  const countCheckInAndOut = () => {
    return participants.filter((p) => p.checkInStatus && p.checkOutStatus).length;
  };

  // Total participants
  const countTotalParticipants = () => {
    return participants.length;
  };

  return (
    <LinearGradient
      colors={['#ADD8E6', '#005cfb']} // Light blue to deep blue gradient
      style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Danh sách sinh viên</Text>
      </View>
      <View style={styles.sub_container}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            Tổng số sinh viên đã hoàn thành: {countCheckInAndOut()}
          </Text>
          <Text style={styles.summaryText}>
            Tổng số sinh viên tham gia sự kiện: {countTotalParticipants()}
          </Text>
        </View>
        <FlatList
          data={participants}
          keyExtractor={(item) => item.userName}
          renderItem={({ item }) => <ParticipantItem participant={item} token={token} />}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5D8EC',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
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
  sub_container: {
    flex: 1,
    padding: 20,
  },
  summaryBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#1975D7',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  participantInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkStatus: {
    marginTop: 5,
    fontSize: 16,
  },
  checkIn: {
    color: 'green',
  },
  notCheckIn: {
    color: 'red',
  },
  checkOut: {
    color: 'green',
  },
  notCheckOut: {
    color: 'red',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventParticipantsScreen;
