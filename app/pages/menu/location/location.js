
import {Header } from 'react-native-elements';
import React, { Component } from 'react'
import { Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

   
class List extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Toronto',
         },
         {
            id: 1,
            name: 'Oshawa',
         }
      ]
   }

   new = ['18895993458354309','24o5iuio3454iu3534']
   screen = (item) => {
      this.props.navigation.navigate('Info', {id:this.new})
   }
   render() {
      return (
         <ScrollView>
            <Header
                leftComponent={{ icon: 'menu', size: 30, color: '#fff', onPress:() => {this.props.navigation.toggleDrawer()} }}
                centerComponent={{ text: 'Regions', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                backgroundColor='black'
            />
        
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                    key = {item.id}
                    style = {styles.container}
                    onPress = {() => this.screen(item)}>
                   
                    <Text style = {styles.text}>
                       {item.name}
                    </Text>
                  </TouchableOpacity>
               ))
            }
         </ScrollView>
      )
   }
}
export default List

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