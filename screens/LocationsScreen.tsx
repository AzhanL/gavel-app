import React, { useState } from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Spinner,
  Title
  } from 'native-base';
import { GET_COURTS } from '../constants/graphql';
import { GetCourts, GetCourts_courts } from '../constants/generated/GetCourts';
import { List, Menu, ActivityIndicator, Colors } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks';

export default function LocationScreen({ navigation }) {
  const { loading, error, data, refetch } = useQuery<GetCourts>(GET_COURTS);
  const [courtInfo, setCourtInfo] = useState(null);
  // 3 Dot menu - top right
  const [moreMenuVisible, setMoreMenuVisiblity] = useState(false);
  // Storage for various court types
  const [provincialCourts, setProvincialCourts] = useState(null);
  const [provincialSuperiorCourts, setProvincialSuperiorCourts] = useState(
    null
  );
  const [provincialAppealCourts, setProvincialAppealCourts] = useState(null);

  if (data && !courtInfo && !loading && !error) {
    setCourtInfo({ data: data.courts });

    // Initialize provincial courts arrays
    let provincial_courts: Object[] = [];
    let provincial_superior_courts: Object[] = [];
    let provincial_appeal_courts: Object[] = [];

    // Loop through every court in the province
    data.courts?.forEach(court => {
      // Provincial courts
      if (court.courtBranch === "P") {
        // General
        if (court.courtType == "G") {
          provincial_courts.push(court);
        }
        // Superior
        else if (court.courtType == "S") {
          provincial_superior_courts.push(court);
        }
        // Appeal
        else if (court.courtType == "A") {
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
      {/* TODO: Change header from native-base to appbar from papertheme */}
      <Header>
        <Left>
          <Button transparent>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
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
            <Menu
              visible={moreMenuVisible}
              onDismiss={() => setMoreMenuVisiblity(false)}
              anchor={
                <Icon name="more" onPress={() => setMoreMenuVisiblity(true)} />
              }
            >
              <Menu.Item
                title="Refresh Locations"
                onPress={() => {
                  refetch();
                }}
                key={1}
              />
            </Menu>
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
            <List.Accordion
              title={`Provincial Courts (${provincialCourts.length})`}
            >
              {provincialCourts.map(({ name }, i) => (
                <List.Item
                  title={name}
                  key={i}
                  left={props => <List.Icon {...props} icon="bank" />}
                />
              ))}
            </List.Accordion>

            {/* Provincial Superior Courts */}
            <List.Accordion
              title={`Superior Courts (${provincialSuperiorCourts.length})`}
            >
              {provincialSuperiorCourts.map((courtInfo, i) => (
                <List.Item
                  title={courtInfo["name"]}
                  key={i}
                  left={props => <List.Icon {...props} icon="bank" />}
                  right={props => <List.Icon {...props} icon="arrow-right" />}
                  onPress={() =>
                    navigation.navigate("Modals", {
                      screen: "CourtDetail",
                      params: { courtInfo: courtInfo, name: courtInfo["name"] }
                    })
                  }
                />
              ))}
            </List.Accordion>

            {/* Provincial Appeal Courts */}
            <List.Accordion
              title={`Superior Courts (${provincialAppealCourts.length})`}
            >
              {provincialAppealCourts.map((courtInfo, i) => (
                <List.Item
                  title={courtInfo["name"]}
                  key={i}
                  left={props => <List.Icon {...props} icon="bank" />}
                  right={props => <List.Icon {...props} icon="arrow-right" />}
                  onPress={() =>
                    navigation.navigate("Modals", {
                      screen: "CourtDetail",
                      params: { courtInfo: courtInfo, name: courtInfo["name"] }
                    })
                  }
                />
              ))}
            </List.Accordion>
          </>
        ) : (
          <ActivityIndicator animating={true} color={Colors.grey700} />
        )}
      </Content>
    </Container>
  );
}
