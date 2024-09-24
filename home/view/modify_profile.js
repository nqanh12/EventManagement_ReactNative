import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const UpdatePersonalScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('./assets/background.png')} // Replace with your image
        style={styles.backgroundImage}>
          <View style={styles.container_header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
              </TouchableOpacity>
              <Text style={styles.title}>Hồ sơ</Text>
          </View>
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            {/* Profile Picture */}
            <Image
              source={require('./assets/profile-icon.png')} // Replace with your avatar image
              style={styles.avatar}
            />
            <Text style={styles.name}>Nguyễn QuốcAnh</Text>
            <Text style={styles.subtitle}>Thông tin cá nhân</Text>
          </View>

          {/* Info Section */}
          <ScrollView style={styles.infoContainer}>
            {renderInfoRow('Giới tính', 'Nam')}
            {renderInfoRow('Ngày sinh', '12/05/2003')}
            {renderInfoRow('Điện thoại', '+84 98 728 46 71')}

            {/* Edit Button */}
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

// Helper function to render an info row
const renderInfoRow = (label, value) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 16,
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay on the background image
    paddingTop: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: 'black',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  editButton: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 15,
    borderRadius: 25,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default UpdatePersonalScreen;
