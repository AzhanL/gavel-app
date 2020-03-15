import * as React from 'react';
import {View, Text } from 'react-native';
import {Header } from 'react-native-elements';



function Criminal({ navigation }) {
    return (
      <View>
        <Header
            leftComponent={{ icon: 'menu', size: 30, color: '#fff', onPress:() => {navigation.toggleDrawer()} }}
            centerComponent={{ text: 'Criminal-Cases', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
            backgroundColor='black'
        />
        
        <View style={{alignItems: 'center'}}>
          <Text style={{marginTop:300}}>Criminal Cases</Text>
        </View>
          
      </View>
  
    );
  }

  export default Criminal;