import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import LinearGradient from 'react-native-linear-gradient';

const LanguageSettings = ({ navigation }) => {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Tiếng Việt',
      value: 'vietnamese',
      selected: true, // Default selected language
    },
    {
      id: '2',
      label: 'English',
      value: 'english',
      selected: false,
    },
  ]);

  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
    // Xử lý logic chọn ngôn ngữ ở đây
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#C5D8EC', '#1975D7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}>
        <View style={styles.container_header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./assets/back_page.png')} style={styles.icon_back} />
          </TouchableOpacity>
          <Text style={styles.title}>Ngôn ngữ</Text>
        </View>
        <View style={styles.content}>
          <FlatList
            data={radioButtons}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item.label}</Text>
                <RadioGroup
                  radioButtons={[item]}
                  onPress={onPressRadioButton}
                  layout="row"
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
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
  content: {
    padding: 16,
    marginTop: 30,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  listItemText: {
    fontSize: 20,
    color: 'black',
  },
});

export default LanguageSettings;
