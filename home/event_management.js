import React, { useState, useEffect } from 'react';
import { Image, View, TextInput, Text, FlatList, TouchableOpacity, Alert, Modal, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const EventManagementScreen = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventForm, setEventForm] = useState({
    id: '',
    name: '',
    description: '',
    locationId: '',
    dateStart: new Date(),
    dateEnd: new Date(),
  });
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    loadEvents(); // Load initial events
  }, []);

  // Mock data for events
  const loadEvents = () => {
    const initialEvents = [
      {
        id: '1',
        name: 'Sự kiện A',
        description: 'Mô tả sự kiện A',
        locationId: '1',
        dateStart: new Date(),
        dateEnd: new Date(Date.now() + 86400000),
      },
      {
        id: '2',
        name: 'Sự kiện B',
        description: 'Mô tả sự kiện B',
        locationId: '2',
        dateStart: new Date(Date.now() + 172800000),
        dateEnd: new Date(Date.now() + 259200000),
      },
    ];
    setEvents(initialEvents);
    setFilteredEvents(initialEvents);
  };

  // Filter events based on search query
  const filterEvents = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredEvents(filtered);
  };

  // Save or update event
  const handleSaveEvent = () => {
    if (editMode) {
      // Edit existing event
      const updatedEvents = events.map((event) => (event.id === eventForm.id ? eventForm : event));
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        ...eventForm,
        id: Date.now().toString(), // Unique ID
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setFilteredEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setEventForm({ id: '', name: '', description: '', locationId: '', dateStart: new Date(), dateEnd: new Date() });
    setEditMode(false);
    setShowForm(false);
  };

  const handleDeleteEvent = (eventId) => {
    Alert.alert('Xóa sự kiện', 'Bạn có chắc chắn muốn xóa sự kiện này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        onPress: () => {
          const updatedEvents = events.filter((event) => event.id !== eventId);
          setEvents(updatedEvents);
          setFilteredEvents(updatedEvents);
        },
      },
    ]);
  };

  const toggleModal = (event) => {
    setEventForm(event || { id: '', name: '', description: '', locationId: '', dateStart: new Date(), dateEnd: new Date() });
    setEditMode(!!event);
    setShowForm(!showForm);
  };

  return (
    <LinearGradient colors={['#C5D8EC', '#4A90E2']} style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tên sự kiện"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          filterEvents(text);
        }}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.userDetails}>
              <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>Mô tả: {item.description}</Text>
                <Text style={styles.userEmail}>Địa điểm: {item.locationId}</Text>
                <Text style={styles.userEmail}>Bắt đầu: {item.dateStart.toLocaleString()}</Text>
                <Text style={styles.userEmail}>Kết thúc: {item.dateEnd.toLocaleString()}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleModal(item)}>
              <Image source={require('./assets/edit.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
              <Image source={require('./assets/delete.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => toggleModal()}>
        <Image source={require('./assets/add.png')} style={styles.icon} />
      </TouchableOpacity>

      {showForm && (
        <Modal animationType="slide" transparent={true} visible={showForm}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{editMode ? 'Sửa sự kiện' : 'Thêm sự kiện'}</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Tên sự kiện"
                value={eventForm.name}
                onChangeText={(text) => setEventForm({ ...eventForm, name: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Mô tả"
                value={eventForm.description}
                onChangeText={(text) => setEventForm({ ...eventForm, description: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="ID Địa điểm"
                value={eventForm.locationId}
                onChangeText={(text) => setEventForm({ ...eventForm, locationId: text })}
              />
              <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                <Text>Chọn ngày bắt đầu: {eventForm.dateStart.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePicker
                  value={eventForm.dateStart}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowStartPicker(false);
                    if (date) {
                      setEventForm({ ...eventForm, dateStart: date });
                    }
                  }}
                />
              )}
              <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                <Text>Chọn ngày kết thúc: {eventForm.dateEnd.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showEndPicker && (
                <DateTimePicker
                  value={eventForm.dateEnd}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowEndPicker(false);
                    if (date) {
                      setEventForm({ ...eventForm, dateEnd: date });
                    }
                  }}
                />
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={resetForm}>
                  <Text style={styles.cancelButton}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveEvent}>
                  <Text style={styles.submitButton}>{editMode ? 'Sửa' : 'Thêm'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'black',
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1977D7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userEmail: {
    color: '#888',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#1977D7',
    position: 'absolute',
    right: 20,
    bottom: 20,
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff', // White background
    borderRadius: 20, // Rounded corners
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22, // Larger title
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Darker text for contrast
  },
  modalInput: {
    backgroundColor: '#f9f9f9', // Slight opacity
    padding: 10,
    borderRadius: 12, // Rounded corners
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});

export default EventManagementScreen;
