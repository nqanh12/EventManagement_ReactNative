/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Card } from 'react-native-paper'; // Optional package for Card UI
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const EventDetailsScreen = ({ route }) => {
  const { name, dateStart, dateEnd, location, description, checkInStatus, checkOutStatus, managerId } = route.params;
  const navigation = useNavigation();

  return (
    <LinearGradient
        colors={['#ADD8E6', '#005cfb']} // Light blue to deep blue gradient
        style={styles.container}>
      {/* AppBar */}
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Chi tiết</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Event Info Card */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.eventName}>{name}</Text>
            <View style={styles.row}>
              <Text style={styles.icon}>📅</Text>
              <Text style={styles.eventDetail}>{`${dateStart} - ${dateEnd}`}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.icon}>📍</Text>
              <Text style={styles.eventDetail}>{location}</Text>
            </View>
          </View>
        </Card>

        {/* Description */}
        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Card style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>{description}</Text>
        </Card>

        {/* Manager and Status Section */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.icon}>👤</Text>
              <Text style={styles.eventDetail}>Manager ID: {managerId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={checkInStatus ? styles.statusCheckIn : styles.statusNotCheckIn}>
                {checkInStatus ? 'Đã check-in' : 'Chưa check-in'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={checkOutStatus ? styles.statusCheckOut : styles.statusNotCheckOut}>
                {checkOutStatus ? 'Đã check-out' : 'Chưa check-out'}
              </Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#00ab34' }]}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} disabled>
            <Text style={styles.buttonText}>Huỷ đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'blue' }]}
            onPress={() => navigation.navigate('QRCodeScreen', { id: 'sv201930' })}>
            <Text style={styles.buttonText}>Lấy mã QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1975D7',
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
  appBar: {
    height: 70,
    backgroundColor: '#1975D7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  appBarTitle: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    elevation: 10,
    padding: 16,
  },
  card: {
    borderRadius: 15,
    elevation: 10,
    marginBottom: 20,
  },
  cardContent: {
    padding: 16,
  },
  eventName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  eventDetail: {
    fontSize: 16,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  descriptionCard: {
    borderRadius: 10,
    elevation: 10,
    padding: 12,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
  },
  statusCheckIn: {
    color: 'green',
    fontSize: 16,
  },
  statusNotCheckIn: {
    color: 'red',
    fontSize: 16,
  },
  statusCheckOut: {
    color: 'green',
    fontSize: 16,
  },
  statusNotCheckOut: {
    color: 'red',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default EventDetailsScreen;
