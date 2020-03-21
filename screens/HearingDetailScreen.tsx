import React from "react";
import { View } from "react-native";
import { Container, Header, Content, Footer, Body } from "native-base";
import { Appbar, DataTable } from "react-native-paper";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Text
} from "react-native-paper";
import { searchHearingsByPartyName_hearings } from "../constants/generated/searchHearingsByPartyName";

export default function HearingDetailScreen({ navigation, route }) {
  const hearingDetails: searchHearingsByPartyName_hearings =
    route.params.hearingDetails;
  const category: string = route.params.name;
  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={hearingDetails.courtFileNumber} />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => console.log(hearingDetails)}
        />
      </Appbar.Header>
      <Body>
        <Text>Hearing Screen</Text>
      </Body>
    </Container>
  );
}
