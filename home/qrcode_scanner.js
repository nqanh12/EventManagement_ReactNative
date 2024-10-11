import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Switch,
  Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

class ScanScreen extends Component {
  state = {
    isCheckIn: true,
  };

  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occurred', err)
    );
  };

  toggleSwitch = () => {
    this.setState({ isCheckIn: !this.state.isCheckIn });
  };

  render() {
    return (
      <View style={styles.container}>
            <View style={styles.container_header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
          </TouchableOpacity>
          <Text style={styles.title}>Quét QR</Text>
        </View>
        {/* QR Code Scanner */}
        <QRCodeScanner
          onRead={this.onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch}
          containerStyle={styles.scannerContainer}
          cameraStyle={styles.cameraStyle}
        />

        {/* Bottom Section */}
        <LinearGradient
          colors={['#4facfe', '#00f2fe']}
          style={styles.bottomSection}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Icon name="list" size={20} color="#0066cc" />
              <Text style={styles.buttonText}>Xem danh sách</Text>
            </TouchableOpacity>

            <View style={styles.switchContainer}>
              <Switch
                value={this.state.isCheckIn}
                onValueChange={this.toggleSwitch}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={this.state.isCheckIn ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>

            <TouchableOpacity style={styles.button}>
              <Icon name="refresh" size={20} color="#0066cc" />
              <Text style={styles.buttonText}>Đồng bộ</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

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
  scannerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraStyle: {
    height: '50%',
    marginTop: 48,
  },
  bottomSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#0066cc',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScanScreen;
