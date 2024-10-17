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
import { Picker } from '@react-native-picker/picker';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { format, isAfter, isBefore, isWithinInterval } from 'date-fns';

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Đang diễn ra');
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
      setEvents(sortedEvents);
      applyFilter(filter, sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [token, filter]);

  const fetchRegisteredEvents = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/api/users/getRegisteredEvents', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 1000) {
        setRegisteredEvents(response.data.result.eventsRegistered);
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  }, [fetchEvents, fetchRegisteredEvents]);

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
      fetchRegisteredEvents();
    }, [fetchEvents, fetchRegisteredEvents])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = events.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      applyFilter(filter, events);
    }
  };

  const applyFilter = (filterValue, eventsToFilter) => {
    let filtered;
    const now = new Date();

    switch (filterValue) {
      case 'Đang diễn ra':
        filtered = eventsToFilter.filter((event) =>
          isWithinInterval(now, {
            start: new Date(event.dateStart),
            end: new Date(event.dateEnd),
          })
        );
        break;
      case 'Sắp tới':
        filtered = eventsToFilter.filter((event) => isAfter(new Date(event.dateStart), now));
        break;
      case 'Đã qua':
        filtered = eventsToFilter.filter((event) => isBefore(new Date(event.dateEnd), now));
        break;
      case 'Tất cả':
      default:
        filtered = eventsToFilter;
        break;
    }

    setFilteredEvents(filtered);
  };

  const handleFilter = (value) => {
    setFilter(value);
    applyFilter(value, events);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents().then(() => setRefreshing(false));
    fetchRegisteredEvents().then(() => setRefreshing(false));
  };

  const isRegistered = (eventId) => {
    return registeredEvents.some((event) => event.eventId === eventId);
  };

  const isPastEvent = (dateEnd) => {
    return isAfter(new Date(), new Date(dateEnd));
  };

  const renderEventCard = ({ item }) => {
    const pastEvent = isPastEvent(item.dateEnd);
    const registered = isRegistered(item.eventId);
    return (
      <TouchableOpacity
        style={[
          styles.eventCard,
          registered && styles.registeredEventCard,
          pastEvent && styles.pastEventCard,
        ]}
        onPress={() => {
          if (!pastEvent) {
            navigation.navigate('EventDetails', {
              eventId: item.eventId,
              name: item.name,
              dateStart: item.dateStart,
              dateEnd: item.dateEnd,
              location: item.location,
              description: item.description,
              managerName: item.managerName,
              isRegistered: registered,
              token: token,
            });
          }
        }}
        disabled={pastEvent}
      >
        <View style={styles.eventDetailsContainer}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <Text style={styles.eventDate}>Ngày bắt đầu: {format(new Date(item.dateStart), 'dd/MM/yyyy HH:mm')}</Text>
            <Text style={styles.eventDate}>Ngày kết thúc: {format(new Date(item.dateEnd), 'dd/MM/yyyy HH:mm')}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (!pastEvent) {
                navigation.navigate('EventDetails', {
                  eventId: item.eventId,
                  name: item.name,
                  dateStart: item.dateStart,
                  dateEnd: item.dateEnd,
                  location: item.locationId,
                  checkInStatus: item.checkInStatus,
                  checkOutStatus: item.checkOutStatus,
                  description: item.description,
                  managerName: item.managerName,
                  isRegistered: registered,
                  token: token,
                });
              }
            }}
            disabled={pastEvent}
          >
            <Image
              source={require('./assets/detail_icon.png')}
              style={styles.detailIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#ADD8E6', '#005cfb']}
      style={styles.container}
    >
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Sự kiện</Text>
      </View>

      <View style={styles.sub_container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sự kiện..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Lọc: </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filter}
              onValueChange={(itemValue) => handleFilter(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Tất cả" value="Tất cả" />
              <Picker.Item label="Sắp tới" value="Sắp tới" />
              <Picker.Item label="Đã qua" value="Đã qua" />
              <Picker.Item label="Đang diễn ra" value="Đang diễn ra" />
            </Picker>
          </View>
        </View>

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
    elevation: 10,
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
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    elevation: 5,
  },
  registeredEventCard: {
    backgroundColor: '#d4edda',
  },
  pastEventCard: {
    backgroundColor: '#f8d7da',
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
  detailIcon: {
    width: 80,
    height: 80,
    tintColor: 'black',
  },
});

export default EventListScreen;
