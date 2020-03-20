import React from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { GET_COURTS } from "../constants/graphql";

function CourtItem({name, courtBranch, courtType, courtSpecialization, }){
    return (
        <Text>TEMp</Text>
    )
}
export default function LocationsList({navigation, route}) {
  const { loading, error, data, refetch } = useQuery(GET_COURTS);

  let message: any;

  if (loading) {
    message = <Text>Loading</Text>;
  }
  if (error) {
    message = <Text>Error</Text>;
  }

  if (data) {
    message = <Text>Done Loading</Text>;
    console.log(data);
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList  data={data.courts} keyExtractor={item => item['id']}/>
        
    </View>
  );
}
