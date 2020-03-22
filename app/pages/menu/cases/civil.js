import * as React from 'react';
import {View, Text } from 'react-native';
import {Header } from 'react-native-elements';



function Civil({ navigation, route }) {
  return (
    <View>
      <Header
          leftComponent={{ icon: 'menu', size: 30, color: '#fff', onPress:() => {navigation.toggleDrawer()} }}
          centerComponent={{ text: 'Civil-Cases', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
          backgroundColor='black'
      />
      
      <View style={{alignItems: 'center'}}>
        <Text style={{marginTop:300}}>Civil Cases</Text>
      </View>
        
    </View>

  );
}

  export default Civil;