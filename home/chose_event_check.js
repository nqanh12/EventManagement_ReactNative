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

const ChoseEventCheck = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Tất cả');

  const loadMoreEvents = useCallback(() => {
    const newEvents = Array.from({ length: 10 }, (_, index) => ({
      id: events.length + index,
      name: `Event ${events.length + index}`,
      startDate: getFormattedDate(events.length + index),
      description: `Mô tả cho sự kiện ${events.length + index}`,
    }));

    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
    setFilteredEvents((prevEvents) => [...prevEvents, ...newEvents]);
  }, [events.length]);

  useEffect(() => {
    loadMoreEvents(); // Load initial events
  }, [loadMoreEvents]);

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
      onPress={() =>
        navigation.navigate('EventDetails', {
          name: item.name,
          startDate: item.startDate,
          description: item.description,
        })
      }
    >
      <View style={styles.eventDetailsContainer}>
        {/* Event Details on the Left */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.name}</Text>
          <Text style={styles.eventDate}>Ngày bắt đầu: {item.startDate}</Text>
        </View>

        {/* Icon on the Right */}
        <TouchableOpacity onPress={() => navigation.navigate('ScanQR', { id: item.id })}>
          <Image
            source={require('./assets/scan_qr.png')} // Thay đổi với icon của bạn
            style={styles.iconscan}
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
        <Text style={styles.title}>Điểm danh</Text>
      </View>

      <View style={styles.sub_container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sự kiện..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Picker for filtering */}
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
          renderItem={renderEventCard} // Ensure you pass the render function correctly
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
    backgroundColor: '#1975D7', // Adding a gradient to the header could be considered
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon_back: {
    width: 30,
    height: 30,
    tintColor: '#fff', // Make the back icon white for contrast
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff', // White title for contrast against a darker background
    textAlign: 'center',
    flex: 1,
    marginEnd: 30, // Ensures the title is centered
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
    flexDirection: 'row', // Added for inline icon
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
    padding: 20, // Increased padding for better spacing
    borderRadius: 15, // More rounded edges
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // Optional gradient background:
  },
  eventTitle: {
    fontSize: 20, // Slightly increased font size
    fontWeight: 'bold',
    color: '#1975D7', // Accent color for event name
  },
  eventDate: {
    fontSize: 14,
    color: '#888', // Lighter color for date to contrast with the title
  },

  // Design Event List Card

  eventDetailsContainer: {
    flexDirection: 'row', // Đặt chi tiết và icon theo chiều ngang
    justifyContent: 'space-between', // Đẩy icon sang bên phải
    alignItems: 'center', // Căn giữa icon và thông tin
  },
  eventInfo: {
    flex: 1, // Để thông tin sự kiện chiếm toàn bộ bên trái
  },
  iconscan: {
    width: 80,
    height: 80,
    tintColor: '#1975D7', // Màu của icon, bạn có thể tùy chỉnh
  },
});

export default ChoseEventCheck;
