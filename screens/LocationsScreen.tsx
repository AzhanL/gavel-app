import React, { useState } from "react";
import {
  Container,
  Content} from "native-base";

import { GET_COURTS } from "../constants/graphql";
import { GetCourts } from "../constants/generated/GetCourts";
import {
  List,
  Appbar
} from "react-native-paper";
import { useQuery } from "@apollo/react-hooks";
import { MiddleLoadingBar } from "../components/MiddleLoadingBar";

export default function LocationScreen({ navigation }) {
  const { loading, error, data } = useQuery<GetCourts>(GET_COURTS);
  const [courtInfo, setCourtInfo] = useState(null);
  // 3 Dot menu - top right
  const [] = useState(false);
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
      {/* App bar  */}
      <Appbar.Header style={{ height: 70 }}>
        <Appbar.Action icon="map" />
        <Appbar.Content title="Location" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      {/* Main content with locations */}
      {courtInfo && (
        <Content
          padder
          style={{ backgroundColor: "white" }}
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center"
          }}
        >
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
        </Content>
      )}

      {/* Loading Bar  */}
      {(loading || !courtInfo) && <MiddleLoadingBar />}
    </Container>
  );
}
