import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'; // Import axios

// Sửa lại component Button
function Button({ name, icon, handle, navigation, token, role }) {
  return (
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate(handle, { token: token, role: role })} >
      <Image source={icon} style={styles.navIcon} />
      <Text style={styles.navText}>{name}</Text>
    </TouchableOpacity>
  );
}

function ListEvents({ events, navigation, token }) {
  return events.map(event => (
    <View key={event.eventId} style={styles.eventCard}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDetails}>Ngày: {new Date(event.dateStart).toLocaleDateString()}</Text>
      <Text style={styles.eventDetails}>Giờ: {new Date(event.dateStart).toLocaleTimeString()}</Text>
      <Text style={styles.eventDetails}>Địa điểm: {event.locationId}</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() =>
          navigation.navigate('EventDetails', {
            eventId: event.eventId,
            name: event.name,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            location: event.locationId,
            checkInStatus: event.checkInStatus,
            checkOutStatus: event.checkOutStatus,
            description: event.description,
            managerName: event.managerName,
            token: token,
          })
        }
      >
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  ));
}

function HomeScreen({ navigation }) {
  const route = useRoute();
  const { token, role } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/api/users/myInfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(response.data.result);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [token]);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/api/events/listEvent', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const upcomingEvents = response.data.result.filter(event => new Date(event.dateStart) > new Date());
      setEvents(upcomingEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchUserInfo();
    fetchEvents();
  }, [fetchUserInfo, fetchEvents]);

  // Reload data when navigation focus changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserInfo();
      fetchEvents();
    });

    return unsubscribe;
  }, [navigation, fetchUserInfo, fetchEvents]);

  return (
    <LinearGradient
      colors={['#ADD8E6', '#005cfb']} // Light blue to deep blue gradient
      style={styles.container}
    >
      {/* Header Section */}
      <View style={styles.header}>
      <Text style={styles.userName}>
        {userInfo ? (userInfo.full_Name ? userInfo.full_Name : 'Chưa cập nhật') : 'Loading...'}
      </Text>
        <TouchableOpacity style={styles.profileIconContainer}>
          <Image
            source={require('./assets/profile-icon.png')} // Profile icon
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Left Side: Upcoming Events */}
        <View style={styles.upcomingEventsContainer}>
          <Text style={styles.sectionTitle}>Sự kiện sắp tới</Text>
          <ScrollView style={styles.upcomingEvents}>
            <ListEvents events={events} navigation={navigation} token={token} />
          </ScrollView>
        </View>

        {/* Right Side: Navigation and Status */}
        <View style={styles.sidebar}>
          <View style={styles.navButtons}>
            <Button name="Sự kiện" icon={require('./assets/event-icon.png')} handle="EventList" navigation={navigation} token={token} role={role} />
            {role === '[MANAGER]' && (
              <Button name="Điểm danh" icon={require('./assets/checkin-icon.png')} handle="ChoseEvent" navigation={navigation} token={token} role={role} />
            )}
            <Button name="Trạng thái" icon={require('./assets/statistics-icon.png')} handle="History" navigation={navigation} token={token} role={role} />
            <Button name="Thông báo" icon={require('./assets/notification-icon.png')} handle="Notification" navigation={navigation} token={token} role={role} />
            <Button name="Cài đặt" icon={require('./assets/settings-icon.png')} handle="Setting" navigation={navigation} token={token} role={role} />
          </View>

          {/* Status Section */}
          <View style={styles.statusSection}>
            <Text style={styles.sectionTitle}>Thống kê</Text>
            <Text style={styles.statusText}>Đã tham gia sự kiện: {userInfo ? userInfo.participatedEventsCount : 'Loading...'}</Text>
            <Text style={styles.statusText}>Sự kiện sắp tới: {events.length}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(62, 132, 247, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  profileIconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    padding: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  upcomingEventsContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  upcomingEvents: {
    marginTop: 10,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: '#005cfb',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sidebar: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  navButtons: {
    marginBottom: 20,
    width: 150,
  },
  navButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  navText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  statusSection: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});
