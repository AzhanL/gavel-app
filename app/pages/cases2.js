import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Screen2 extends React.Component{
    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this,pros.navigation.navigate('Ascreen')}>
                    <Text>Hello world</Text>
                </TouchableOpacity>
            </View>
        );
    }
}