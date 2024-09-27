import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const HistoryScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('Tất cả');

  const events = [
    {
      id: '1',
      name: 'Orientation Day',
      startDate: '2024-08-01',
      endDate: '2024-08-01',
      status: 'Chưa hoàn thành',
      icon: require('./assets/warning.png'), // Example icon
      statusColor: '#FFA500', // Orange
    },
    {
      id: '2',
      name: 'Workshop on Flutter',
      startDate: '2024-08-10',
      endDate: '2024-08-10',
      status: 'Đã hoàn thành',
      icon: require('./assets/check.png'), // Example icon
      statusColor: '#00FF00', // Green
    },
    {
      id: '3',
      name: 'React Native Seminar',
      startDate: '2024-08-15',
      endDate: '2024-08-15',
      status: 'Đã Bỏ lỡ',
      icon: require('./assets/error.png'), // Example icon
      statusColor: '#FF0000', // Red
    },
    {
      id: '4',
      name: 'Hackathon',
      startDate: '2024-08-20',
      endDate: '2024-08-20',
      status: 'Đã Bỏ lỡ',
      icon: require('./assets/error.png'), // Example icon
      statusColor: '#FF0000', // Red
    },
    {
      id: '5',
      name: 'Hackathon 2',
      startDate: '2024-08-21',
      endDate: '2024-08-21',
      status: 'Đã Bỏ lỡ',
      icon: require('./assets/error.png'), // Example icon
      statusColor: '#FF0000', // Red
    },
    {
      id: '6',
      name: 'Hackathon 2',
      startDate: '2024-08-21',
      endDate: '2024-08-21',
      status: 'Đã Bỏ lỡ',
      icon: require('./assets/error.png'), // Example icon
      statusColor: '#FF0000', // Red
    },
    {
      id: '7',
      name: 'Hackathon 2',
      startDate: '2024-08-21',
      endDate: '2024-08-21',
      status: 'Đã Bỏ lỡ',
      icon: require('./assets/error.png'), // Example icon
      statusColor: '#FF0000', // Red
    },
    {
      id: '8',
      name: 'Hackathon 2',
      startDate: '2024-08-21',
      endDate: '2024-08-21',
      status: 'Đã Bỏ lỡ',
      icon: require('./assets/error.png'), // Example icon
      statusColor: '#FF0000', // Red
    },
  ];

  const handleFilter = (value) => {
    setFilter(value);
  };

  const filteredEvents = events.filter((event) => {
    if (filter === 'Tất cả') {return true;}
    if (filter === 'Sắp tới') {return new Date(event.startDate) > new Date();}
    if (filter === 'Đã qua') {return new Date(event.startDate) <= new Date();}
    return true;
  });

  const renderItem = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventInfo}>
        <Image source={item.icon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.eventTitle}>{item.name}</Text>
          <Text style={styles.eventDate}>
            BĐ: {item.startDate} {'\n'} KT: {item.endDate}
          </Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, { color: item.statusColor }]}>
          {item.status}
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
        <Text style={styles.title}>Lịch Sử</Text>
      </View>
      <View style={styles.sub_container}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Lọc: </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filter}
              onValueChange={(itemValue) => handleFilter(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Tất cả" value="Tất cả" />
              <Picker.Item label="Sắp tới" value="Sắp tới" />
              <Picker.Item label="Đã qua" value="Đã qua" />
            </Picker>
          </View>
        </View>
        <FlatList
          data={filteredEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },
  status: {
    fontSize: 16,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    marginTop: 5, // Add some spacing between the date and the status
  },
  eventTime: {
    fontSize: 14,
    alignSelf: 'flex-end',
    color: '#888',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
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
});

export default HistoryScreen;
