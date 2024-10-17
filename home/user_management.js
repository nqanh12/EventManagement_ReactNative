import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const usersData = [
  {
    userName: 'nguyenvana',
    fullName: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    roles: ['Admin'],
  },
  // Add more users here
];

export default function UserManagementScreen() {
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filterUsers = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(lowerCaseQuery) ||
      user.roles.some((role) => role.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredUsers(filtered);
  };

  const toggleModal = (user) => {
    setEditingUser(user || { userName: '', fullName: '', email: '', roles: ['USER'] });
    setModalVisible(!isModalVisible);
  };

  return (
    <LinearGradient colors={['#C5D8EC', '#4A90E2']} style={styles.container}>
      <View style={styles.container}>
        {/* Gradient Background */}
        <View style={styles.gradientBackground}>
          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or role"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              filterUsers(text);
            }}
          />

          {/* User List */}
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.userName}
            renderItem={({ item }) => (
              <View style={styles.userCard}>
                <View style={styles.userDetails}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.fullName[0]}</Text>
                  </View>
                  <View>
                    <Text style={styles.userName}>{item.fullName}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => toggleModal(item)}>
                  <Image source={require('./assets/edit.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Floating Add User Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => toggleModal(null)}>
            <Image source={require('./assets/add.png')} style={styles.icon} />
          </TouchableOpacity>

          {/* Modal for Adding/Editing User */}
          {isModalVisible && (
            <Modal animationType="slide" transparent={true} visible={isModalVisible}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>{editingUser?.userName ? 'Sửa sự kiện' : 'Thêm sự kiện'}</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Username"
                    value={editingUser?.userName}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Full Name"
                    value={editingUser?.fullName}
                  />
                  {/* Close and Submit Buttons */}
                  <View style={styles.modalButtons}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Image source={require('./assets/cancel.png')} style={styles.iconCancel} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Image source={require('./assets/save.png')} style={styles.iconSave} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
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
  icon: {
    width: 30,
    height: 30,
    tintColor: 'black',
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
  iconCancel: {
    width: 28,
    height: 28,
    tintColor: '#f44336', // Color for cancel
  },
  iconSave: {
    width: 28,
    height: 28,
    tintColor: '#4caf50', // Color for save
  },
  modalTitle: {
    fontSize: 22, // Larger title
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Darker text for contrast
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
