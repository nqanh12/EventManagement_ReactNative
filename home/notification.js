import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NotificationScreen = ({ navigation }) => {
  // Sample notifications list
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Sự kiện A đã bắt đầu',
      date: '10:30 AM, 30/08/2024',
      isRead: false,
      icon: require('./assets/notification_active.png'), // Example image
    },
    {
      id: '2',
      title: 'Cập nhật hệ thống mới',
      date: '09:15 AM, 29/08/2024',
      isRead: true,
      icon: require('./assets/notification_unactive.png'),
    },
    {
      id: '3',
      title: 'Sự kiện B đã kết thúc',
      date: '08:00 AM, 28/08/2024',
      isRead: false,
      icon: require('./assets/notification_active.png'),
    },
    {
        id: '4',
        title: 'Sự kiện B đã kết thúc',
        date: '08:00 AM, 28/08/2024',
        isRead: false,
        icon: require('./assets/notification_active.png'),
      },
      {
        id: '5',
        title: 'Sự kiện B đã kết thúc',
        date: '08:00 AM, 28/08/2024',
        isRead: false,
        icon: require('./assets/notification_active.png'),
      },
      {
        id: '6',
        title: 'Sự kiện B đã kết thúc',
        date: '08:00 AM, 28/08/2024',
        isRead: false,
        icon: require('./assets/notification_active.png'),
      },
      {
        id: '7',
        title: 'Sự kiện B đã kết thúc',
        date: '08:00 AM, 28/08/2024',
        isRead: false,
        icon: require('./assets/notification_active.png'),
      },
      {
        id: '8',
        title: 'Sự kiện B đã kết thúc',
        date: '08:00 AM, 28/08/2024',
        isRead: false,
        icon: require('./assets/notification_active.png'),
      },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    setModalVisible(false);
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    setModalVisible(false);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })));
  };

  const openMenu = (notification, event) => {
    setSelectedNotification(notification);

    // Measure the position of the menu button when pressed
    event.target.measureInWindow((x, y, width, height) => {
      setModalPosition({ top: y + height, left: x - width - 150});
      setModalVisible(true);
    });
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Image source={item.icon} style={styles.notificationIcon} />
      <View style={styles.notificationInfo}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={(event) => openMenu(item, event)}>
        <Image source={require('./assets/menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#ADD8E6', '#005cfb']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack();}}>
          <Image source={require('./assets/back_page.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Image source={require('./assets/mark_notification.png')} style={styles.checkIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.sub_container}>
              <FlatList
                    data={notifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={(item) => item.id}
                />
      </View>

      {/* Modal for individual notification actions */}
      <Modal transparent={true} visible={modalVisible} animationType="none">
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContainer, modalPosition]}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => markAsRead(selectedNotification.id)}
            >
              <Text>Đánh dấu là đã đọc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => deleteNotification(selectedNotification.id)}
            >
              <Text>Xóa thông báo</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub_container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: '#1975D7',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  checkIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationDate: {
    fontSize: 14,
    color: '#888',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
  },
  modalContainer: {
    borderWidth: 1 ,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    position: 'absolute',
    width: 200,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default NotificationScreen;
