import React, {useState, Component}  from 'react';
import {View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import {Header } from 'react-native-elements';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider,graphql,useQuery  } from '@apollo/react-hooks';
import gql from 'graphql-tag';


export default function Notifications() {
    // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link: new HttpLink({uri: 'http://gavelapi.ontariotechu.xyz:8000/graphql/'}),
    cache: new InMemoryCache()
  });


  const Gavel_Query = gql`
    query{
      locations{
        id
        city
      }
    }
  `;

  const { data } = useQuery(Gavel_Query);

    return (
      <ApolloProvider client={client}>
        <View>
          <Header
              leftComponent={{ icon: 'menu', size: 30, color: '#fff', onPress:() => {navigation.toggleDrawer()} }}
              centerComponent={{ text: 'Notifications', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
              backgroundColor='black'
          />
          <View style={{alignItems: 'center'}}>
              <View>
                {data.locations.map(locations => (
                  <Text key={locations.id} value={locations.city}>
                    {locations.city}
                  </Text>
                ))}
              </View>
          <Image source={require('../assets/logo.png')}  style={{ width: 340, height: 320, alignContent:'center', marginTop:90, }} />
          </View>
        </View>
      </ApolloProvider>
  
    );
  
}

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