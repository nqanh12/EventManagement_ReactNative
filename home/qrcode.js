import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';

const QRCodeScreen = ({ route }) => {
  const { eventId } = route.params;
  const navigation = useNavigation();
  let  base64Logo  =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  return (
    <LinearGradient colors={['#ADD8E6', '#005cfb']} style={styles.container}>
      {/* AppBar */}
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
        </TouchableOpacity>
        <Text style={styles.title}>Mã QR</Text>
      </View>

      {/* QR Code Content */}
      <View style={styles.qrContainer}>
        <QRCode
          value={eventId}
          size={350}
          color="black"
          backgroundColor="white"
          logo = { { uri : base64Logo } }
          logoSize = { 30 }
        />
      </View>
      <View style={styles.container_bottom}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Lưu ảnh</Text>
          </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  qrContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 0,
    alignItems: 'center',
  },
  container_bottom: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default QRCodeScreen;
