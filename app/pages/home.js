import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Screen1 extends React.Component{
    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this,pros.navigation.navigate('Screen1')}>
                    <Text>Hello world</Text>
                </TouchableOpacity>
            </View>
        );
    }
}