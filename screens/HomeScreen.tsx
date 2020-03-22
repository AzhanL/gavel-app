import React from "react";
import { Text, View } from "react-native";
import { Container } from "native-base";
import { Appbar } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <Container>
      <Appbar.Header style={{ height: 70}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Title" />

        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>HomeScreen</Text>
      </View>
    </Container>
  );
}
