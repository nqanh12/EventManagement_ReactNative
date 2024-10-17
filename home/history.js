import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, RefreshControl, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';

const HistoryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const { token } = route.params;

  const fetchEventName = async (eventId) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/events/getEventName/${eventId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.code === 1000) {
        return data.result.name;
      }
    } catch (error) {
      console.error(error);
    }
    return `Event ${eventId}`; // Fallback name
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/getRegisteredEvents', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.code === 1000) {
        const fetchedEvents = await Promise.all(data.result.eventsRegistered.map(async (event) => {
          const eventName = await fetchEventName(event.eventId);
          let statusText = 'Đang xử lý';
          let statusColor = '#FF0000'; // Red for processing

          if (event.checkInStatus && event.checkOutStatus) {
            statusText = 'Đã hoàn thành';
            statusColor = '#00FF00'; // Green for completed
          } else if(!event.checkInStatus && !event.checkOutStatus)
            {
              statusText = 'Đang xử lý';
              statusColor = '#FF0000';
            }
           else if (!event.checkInStatus) {
            statusText = 'Chưa check-in';
            statusColor = '#FFA500'; // Orange for not checked in
          } else if (!event.checkOutStatus) {
            statusText = 'Chưa check-out';
            statusColor = '#FFA500'; // Yellow for checked in but not checked out
          }

          return {
            id: event.eventId,
            name: eventName,
            registrationDate: event.registrationDate.split('T')[0],
            checkInStatus: event.checkInStatus,
            checkInTime: event.checkInTime,
            checkOutStatus: event.checkOutStatus,
            checkOutTime: event.checkOutTime,
            statusText,
            statusColor,
          };
        }));
        setEvents(fetchedEvents);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents().then(() => setRefreshing(false));
  };

  const filteredEvents = events.filter((event) => {
    return event.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderItem = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.eventTitle}>{item.name}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.eventDate}>
              Check-in:
              <Image
                source={item.checkInStatus ? require('./assets/checkIN.png') : require('./assets/uncheck.png')}
                style={styles.statusIcon}
              />
            </Text>
            <Text style={styles.eventDate}>
              Thời gian ra: {item.checkInTime || 'Chưa cập nhật'}
            </Text>
            <Text style={styles.eventDate}>
              Check-out:
              <Image
                source={item.checkOutStatus ? require('./assets/checkIN.png') : require('./assets/uncheck.png')}
                style={styles.statusIcon}
              />
            </Text>
            <Text style={styles.eventDate}>
              Thời gian ra: {item.checkOutTime || 'Chưa cập nhật'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, { color: item.statusColor }]}>
          {item.statusText}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#ADD8E6', '#005cfb']} style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Trạng thái</Text>
      </View>
      <View style={styles.sub_container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm sự kiện..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
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
  container_header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#1975D7',
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
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 0,
  },
  eventTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
  },
  eventDate: {
    fontSize: 16,
    color: '#888',
    marginTop: 3,
    marginBottom: 3,
  },
  statusIcon: {
    width: 20,
    height: 20,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  searchBar: {
    height: 70,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default HistoryScreen;
