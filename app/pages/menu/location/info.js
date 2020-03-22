import * as React from 'react';
import {View, Text,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Header} from 'react-native-elements';



function Info({ navigation, route }) {
  const { id } = route.params;
  return (
    <ScrollView>
      <Header
          leftComponent={{ icon: 'menu', size: 30, color: '#fff', onPress:() => {navigation.toggleDrawer()} }}
          centerComponent={{ text: 'Regional-Cases', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
          backgroundColor='black'
      />
      
      {
        id.map((item, index) => (
          <TouchableOpacity
            key = {index}
            style = {styles.container}
            onPress = {() => this.screen(item)}>
            
            <Text style = {styles.text}>
                {id[index]}
            </Text>
          </TouchableOpacity>
        ))
        }
        
    </ScrollView>

  );
}

  export default Info;

  const styles = StyleSheet.create ({
    container: {
       padding: 20,
       backgroundColor: 'black',
       alignItems: 'center',
       marginTop:30,
       marginLeft:20,
       marginRight:20,
       marginBottom:10,
       borderRadius: 30,
       opacity: 0.8
    },
    text: {
       color: 'white',
       fontSize:20,
       fontWeight:'bold'
    }
 })