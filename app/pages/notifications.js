import * as React from 'react';
import {View, Text, Image } from 'react-native';
import {Header } from 'react-native-elements';



function Notifications({ navigation }) {
    return (
      <View>
        <Header
            leftComponent={{ icon: 'menu', size: 30, color: '#fff', onPress:() => {navigation.toggleDrawer()} }}
            centerComponent={{ text: 'Notifications', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
            backgroundColor='black'
        />
        <View style={{alignItems: 'center'}}>
        <Image source={require('../assets/logo.png')}  style={{ width: 340, height: 320, alignContent:'center', marginTop:90, }} />
        </View>
      </View>
  
    );
  }

  export default Notifications;