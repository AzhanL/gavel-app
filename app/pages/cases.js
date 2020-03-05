//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
// import all basic components
import home from './home';


//Array of Item to add
items = [
      'Goa',
      'Gujrat',
      'Madhya Pradesh',
      'Assam',
      'Gujrat',
      'Karnataka',
      'Jharkhand',
      'Himachal Pradesh',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Uttarakhand',
      'West Bengal',
      'Tamil Nadu ',
      'Punjab',
      'Rajasthan',
      'Bihar',
      'Andhra Pradesh',
      'Arunachal Pradesh',
    ];
export default class Screen2 extends Component {

  //Screen2 Component
  render() {
    return (
      <View>
        <ScrollView>
          {/*Loop of JS which is like foreach loop*/}
          {items.map((item, key) => (
            //key is the index of the array 
            //item is the single item of the array
            <View key={key} style={styles.item}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('home')}>
                <Text style={styles.text}>Case No. {"\n"}{item}</Text>
                <View style={styles.separator} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({

  separator: {
    height: 3,
    backgroundColor: 'black',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: 'black',
    padding: 15,
  },
});