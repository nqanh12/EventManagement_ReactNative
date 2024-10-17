import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { format, isWithinInterval } from 'date-fns';

const ChoseEventCheck = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const { token } = route.params;

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/api/events/listEvent', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedEvents = response.data.result.sort((b, a) => new Date(a.dateStart) - new Date(b.dateStart));
      const todayEvents = sortedEvents.filter(event =>
        isWithinInterval(new Date(), {
          start: new Date(event.dateStart),
          end: new Date(event.dateEnd),
        })
      );
      setEvents(todayEvents);
      setFilteredEvents(todayEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = events.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents().then(() => setRefreshing(false));
  };

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() =>
        navigation.navigate('EventDetails', {
          name: item.name,
          startDate: item.dateStart,
          description: item.description,
        })
      }
    >
      <View style={styles.eventDetailsContainer}>
        {/* Event Details on the Left */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.name}</Text>
          <Text style={styles.eventDate}>Ngày bắt đầu: {format(new Date(item.dateStart), 'dd/MM/yyyy HH:mm')}</Text>
          <Text style={styles.eventDate}>Ngày kết thúc: {format(new Date(item.dateEnd), 'dd/MM/yyyy HH:mm')}</Text>
        </View>

        {/* Icon on the Right */}
        <TouchableOpacity onPress={() => navigation.navigate('QRCodeScannerScreen', { eventId: item.eventId , token : token })}>
          <Image
            source={require('./assets/scan_qr.png')}
            style={styles.iconscan}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#ADD8E6', '#005cfb']}
      style={styles.container}
    >
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Điểm danh</Text>
      </View>

      <View style={styles.sub_container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sự kiện..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={fetchEvents}
          onEndReachedThreshold={0.5}
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
    backgroundColor: '#e0ecff',
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
  sub_container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginLeft: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  eventList: {
    flexGrow: 1,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },


  eventDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  iconscan: {
    width: 80,
    height: 80,
    tintColor: 'black',
  },
});

export default ChoseEventCheck;
