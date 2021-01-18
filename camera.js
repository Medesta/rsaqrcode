
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Encrypt, Decrypt } from './helper';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput, Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

class App extends Component {
  state = {
    data: '',
    cypher: '',
    decypher: ''
  }
  onSuccess = e => {
    let ec = Encrypt(e.data);
    let ed = Decrypt(ec);
    let a = e.data;
    this.setState({ data: e.data, cypher: ec, decypher: ed })

    // Alert.alert(
    //   'Scanned Successful',
    //   // ed.join(''),
    //   ed,
    //   ec,
    //   // ec[0],  
    //   // decryt(ec),

    //   [
    //     {
    //       text: 'Ok',
    //       onPress: () => { this.setState({ data: '' }, () => this.scanner.reactivate(true)) },
    //       // onPress:()=>this.props.navigation.navigate('Login'),
    //       style: "cancel"
    //     }],
    //   { cancelable: false },
    // );
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  render() {
    return (
      <>
        {this.state.data ?
          <>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
                <Text style={styles.centerText}>
                  <Text style={styles.textBold}>Data:</Text>
                  {this.state.data}
                </Text>
                <Text style={styles.centerText}>
                  <Text style={styles.textBold}>CypherText:</Text>
                  {this.state.cypher}
                </Text>
                <Text style={styles.centerText}>
                  <Text style={styles.textBold}>Decyphered Text:</Text>
                  {this.state.decypher}
                </Text>
                <Button style={{
                  width: 250,
                  marginTop: 50,
                  marginBottom: 20

                }} color={"#fff"} icon="camera" mode="contained" onPress={() => { this.setState({ data: '', cypher: '', decypher: '' }, () => this.scanner.reactivate(true)) }}>
                  Back To Scaning QR
      </Button>
              </LinearGradient>
            </ScrollView>
          </>

          :
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <QRCodeScanner
              ref={(node) => { this.scanner = node }}
              onRead={this.onSuccess}
              flashMode={RNCamera.Constants.FlashMode.off}
              topContent={
                <Text style={styles.centerText}>
                  Go to{' '}
                  <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
              }
            // bottomContent={
            //   // <TouchableOpacity style={styles.buttonTouchable}>
            //   //   <Text style={styles.buttonText}>OK. Got it!</Text>
            //   // </TouchableOpacity>
            // }
            />
            <Button style={{
              width: 250,
              marginTop: 50,
              marginBottom: 20

            }} color={"#fff"} onPress={()=>this.props.navigation.goBack()} mode="contained" >
              Back To Home Screen
      </Button>
          </LinearGradient>
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBold: {
    fontWeight: '600',
    color: '#fff',
    fontSize:24
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default App;