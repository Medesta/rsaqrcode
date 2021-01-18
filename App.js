import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Button, TextInput, Avatar } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Camera from './camera';

class App extends Component {
  state = {
    qrBody: "Hello",
  }

  onChangeText = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>QR Code Scaning and Demonstrating RSA Application</Text>
          </Text>
          <Button style={{
            width: 250,
            marginTop: 50,
            marginBottom: 20

          }} color={"#fff"} icon="camera" mode="contained" onPress={() => this.props.navigation.navigate("Scan QR")}>
            Scan QR
      </Button>
          <Text style={styles.centerText}>
            <View style={styles.nameBox}>
              <Text style={styles.textBold}>Group Members :</Text>
            </View>
            <View>
              <Text style={styles.normalText}> M.Mehdi Raza (CS172034)</Text>
              <Text style={styles.normalText}>Waqas Bhambha (CS172034)</Text>
            </View>
          </Text>
        </LinearGradient>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameBox: {
    // flex:1,
    // height:300,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding:34,
    fontWeight: '200',
    color: '#fff',
    textAlign: 'center'

  },
  normalText: {
    flex: 1,
    fontSize: 18,
    padding:10,
    fontWeight: '200',
    color: '#fff',
    textAlign: 'center'

  },
  textBold: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 24,
    width: '100%'
  },
  qrInput: {
    width: "80%",
    height: 100,
    marginVertical: 20
  }
})
export default () => {
  const AppStack = createAppContainer(
    createStackNavigator({
      App: App,
      "Scan QR": Camera,
    }, {
      defaultNavigationOptions: {
        headerShown: false,
      }
    })
  )
  return <PaperProvider settings={{
    icon: props => <AwesomeIcon {...props} />,
  }}>
    <AppStack />
  </PaperProvider>
};