import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Correct import for LinearGradient

// Sửa lại component Button
function Button({ name, icon, handle, navigation }) {
  return (
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate(handle)} >
      <Image source={icon} style={styles.navIcon} />
      <Text style={styles.navText}>{name}</Text>
    </TouchableOpacity>
  );
}

function ListEvents() {
  return (
    <View style={styles.eventCard}>
      <Text style={styles.eventName}>Hội thảo tổ chức sự kiện</Text>
      <Text style={styles.eventDetails}>Ngày: 28 - 5 - 2024</Text>
      <Text style={styles.eventDetails}>Giờ: 10:00 AM</Text>
      <Text style={styles.eventDetails}>Địa điểm: Hội trường C</Text>
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const route = useRoute();
  const { token, role } = route.params;

  return (
    <LinearGradient
      colors={['#ADD8E6', '#005cfb']} // Light blue to deep blue gradient
      style={styles.container}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.userName}>Nguyễn Quốc Anh</Text>
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
        <ScrollView style={styles.upcomingEvents}>
          <Text style={styles.sectionTitle}>Sự kiện sắp tới</Text>
          <ListEvents />
          <ListEvents />
          <ListEvents />
        </ScrollView>

        {/* Right Side: Navigation and Status */}
        <View style={styles.sidebar}>
          <View style={styles.navButtons}>
            <Button name="Sự kiện" icon={require('./assets/event-icon.png')} handle="EventList" navigation={navigation} />
            {role === '[MANAGER]' && (
              <Button name="Điểm danh" icon={require('./assets/checkin-icon.png')} handle="ChoseEvent" navigation={navigation} />
            )}
            <Button name="Lịch sử" icon={require('./assets/statistics-icon.png')} handle="History" navigation={navigation} />
            <Button name="Thông báo" icon={require('./assets/notification-icon.png')} handle="Notification" navigation={navigation} />
            <Button name="Cài đặt" icon={require('./assets/settings-icon.png')} handle="Setting" navigation={navigation} />
          </View>

          {/* Status Section */}
          <View style={styles.statusSection}>
            <Text style={styles.sectionTitle}>Trạng thái</Text>
            <Text style={styles.statusText}>Điểm danh vào: 9:00 AM, August 27, 2024</Text>
            <Text style={styles.sectionTitle}>Thống kê</Text>
            <Text style={styles.statusText}>Đã tham gia sự kiện: 10</Text>
            <Text style={styles.statusText}>Sự kiện sắp tới: 2</Text>
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
  upcomingEvents: {
    flex: 2,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
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
    fontSize: 12,
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
    height: 285,
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
