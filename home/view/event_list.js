import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Tất cả');

  const loadMoreEvents = useCallback(() => {
    const newEvents = Array.from({ length: 10 }, (_, index) => ({
      id: events.length + index,
      name: `Event ${events.length + index}`,
      startDate: getFormattedDate(events.length + index),
      endDate: getFormattedDate(events.length + index + 1),
      location: `Địa điểm: ${events.length + index}`,
      description: `Mô tả cho sự kiện ${events.length + index}`,
      checkInStatus: Math.random() < 0.5,
      checkOutStatus: Math.random() < 0.5,
      managerId: Math.floor(Math.random() * 1000),
    }));

    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
    setFilteredEvents((prevEvents) => [...prevEvents, ...newEvents]);
  }, [events.length]);

  useEffect(() => {
    loadMoreEvents();
  }, []);

  const getFormattedDate = (index) => {
    const now = new Date();
    const date = new Date(now.setDate(now.getDate() + index));
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

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

  const handleFilter = (value) => {
    setFilter(value);
    // Add your filter logic here if needed
  };

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() =>null
      }
    >
      <View style={styles.eventDetailsContainer}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.name}</Text>
          <Text style={styles.eventDate}>Ngày bắt đầu: {item.startDate}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EventDetails', {
                    id: item.id,
                    name: item.name,
                    dateStart: item.startDate,
                    dateEnd: item.endDate,
                    location: item.location,
                    checkInStatus: item.checkInStatus,
                    checkOutStatus: item.checkOutStatus,
                    description: item.description,
                    managerId: item.managerId,
                  })}>
          <Image
            source={require('./assets/detail_icon.png')} // Thay đổi với icon của bạn
            style={styles.detailIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#ADD8E6', '#005cfb']} // Light blue to deep blue gradient
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
            </Picker>
          </View>
        </View>

        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreEvents}
          onEndReachedThreshold={0.5}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0ecff', // Light blue gradient
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1975D7',
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
    tintColor: '#1975D7',
  },
});

export default EventListScreen;
