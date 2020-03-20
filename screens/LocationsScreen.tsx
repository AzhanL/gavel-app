import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { GET_COURTS } from "../constants/graphql";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Icon,
  Content,
  List,
  ListItem,
  Spinner,
  CardItem,
  Card
} from "native-base";
import { List as PaperList, Checkbox } from "react-native-paper";

export default function LocationScreen({ props, navigation, route }) {
  const { loading, error, data, refetch } = useQuery(GET_COURTS);
  const [courtInfo, setCourtInfo] = useState(null);

  // Storage for various court types
  const [provincialCourts, setProvincialCourts] = useState(null);
  const [provincialSuperiorCourts, setProvincialSuperiorCourts] = useState(
    null
  );
  const [provincialAppealCourts, setProvincialAppealCourts] = useState(null);

  if (data && !courtInfo && !loading && !error) {
    setCourtInfo({ data: data.courts });

    // Extract provincial general courts
    let provincial_courts: [Object] = [0];
    let provincial_superior_courts: [Object] = [0];
    let provincial_appeal_courts: [Object] = [0];
    // Extract the initializer
    provincial_courts.pop();
    provincial_superior_courts.pop();
    provincial_appeal_courts.pop();

    // Loop through every court in the province
    data.courts.forEach(court => {
      // Provincial courts
      if (court["courtBranch"] === "P") {
        // General
        if (court["courtType"] == "G") {
          provincial_courts.push(court);
        }
        // Superior
        else if (court["courtType"] == "S") {
          provincial_superior_courts.push(court);
        }
        // Appeal
        else if (court["courtType"] == "A") {
          provincial_appeal_courts.push(court);
        }
      }
    });
    // Set the provincial general courts
    setProvincialCourts(provincial_courts);
    // Set the provincial superior courts
    setProvincialSuperiorCourts(provincial_superior_courts);
    // Set the provincial appeal courts
    setProvincialAppealCourts(provincial_appeal_courts);
  }
  return (
    <Container>
      {/* <View
        style={{
          ...CustomStatusBarStyles.statusBarPadding,
          backgroundColor: "black"
        }}
      /> */}
      <Header>
        <Left>
          <Button transparent>
            <MaterialCommunityIcons
              name="arrow-left"
              size={32}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </Button>
        </Left>
        <Body>
          <Title>Locations</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search" />
          </Button>
          <Button transparent>
            <Icon name="heart" />
          </Button>
          <Button transparent>
            <Icon name="more" />
          </Button>
        </Right>
      </Header>
      <Content
        padder
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        {courtInfo ? (
          <>
            {/* Provincial General Courts */}
            <PaperList.Accordion title="Provincial Courts">
              {provincialCourts.map(({ name }, i) => (
                <PaperList.Item
                  title={name}
                  key={i}
                  left={props => <PaperList.Icon {...props} icon="bank" />}
                />
              ))}
            </PaperList.Accordion>

            {/* Provincial Superior Courts */}
            <PaperList.Accordion title="Superior Courts">
              {provincialSuperiorCourts.map((courtInfo, i) => (
                <PaperList.Item
                  title={courtInfo["name"]}
                  key={i}
                  left={props => <PaperList.Icon {...props} icon="bank" />}
                  right={props => (
                    <PaperList.Icon {...props} icon="arrow-right" />
                  )}
                  onPress={() =>
                    navigation.navigate("Modals", {
                      screen: "CourtDetail",
                      params: { courtInfo: courtInfo, name: courtInfo["name"] }
                    })
                  }
                />
              ))}
            </PaperList.Accordion>

            {/* Provincial Appeal Courts */}
            <PaperList.Accordion title="Appeal Courts">
              {provincialAppealCourts.map(({ name }, i) => (
                <PaperList.Item
                  title={name}
                  key={i}
                  left={props => <PaperList.Icon {...props} icon="bank" />}
                />
              ))}
            </PaperList.Accordion>
          </>
        ) : (
          <Spinner color="#20272F" />
        )}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mb: {
    marginBottom: 15
  }
});
