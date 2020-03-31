import React from "react";
import { Appbar, DataTable } from "react-native-paper";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Paragraph,
  Title
} from "react-native-paper";
import { Container, Content, View } from "native-base";
import { Linking } from "expo";

export default function CourtDetailScreen({ route, navigation }) {
  // Extract court info from params
  const { courtInfo } = route.params;
  // Court Info
  let court_category: string = "";
  let locations: Array<Object> = courtInfo["locations"];
  let province: string = locations[0]["province"];

  // Returns earliest opening and closing time
  let calcaulteTimeSlot = (timeSlots: Array<any>): [string, string] => {
    let last_timeslot = timeSlots.length;

    if (timeSlots.length >= 1) {
      return [
        timeSlots[0]["openTime"],
        timeSlots[last_timeslot - 1]["closeTime"]
      ];
    } else {
      return ["Closed", "Closed"];
    }
  };

  // Day Short hand to long hand
  let dayShortToLong = (shortForm: string) => {
    if (shortForm == "MO") return "Monday";
    else if (shortForm == "TU") return "Tuesday";
    else if (shortForm == "WE") return "Wednesday";
    else if (shortForm == "TH") return "Thursday";
    else if (shortForm == "FR") return "Friday";
    else if (shortForm == "SA") return "Saturday";
    else if (shortForm == "SU") return "Sunday";
  };
  // Edit name for provincal branch
  if (courtInfo["courtBranch"] == "P") {
    // Provincial Superior Courts Name Convention
    if (courtInfo["courtType"] == "S" && locations.length > 0) {
      // Ontario & Quebec
      if (["ON", "QB"].indexOf(province) >= 0) {
        court_category = "Superior Court";
      }
      //  Alberta, Saskatchewan, Manitoba, and New Brunswick
      else if (["AB", "SK", "MB", "NB"].indexOf(province) >= 0) {
        court_category = "Court of Queen's Bench";
      }
      // Newfoundland and Labrador, British Columbia, Nova Scotia, Prince Edward Island, Yukon, and the Northwest Territories
      if (["NL", "BC", "NS", "PE", "YT", "NT"].indexOf(province) >= 0) {
        court_category = "Supreme Court";
      }
    }
  }
  const buttonMode: String = "text";
  return (
    <Container>
      <Appbar.Header style={{ height: 70 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={courtInfo["name"]} subtitle={court_category} />
      </Appbar.Header>
      <Content padder>
        {locations.map((court_location, i) => (
          <View key={i}>
            <Card>
              <Card.Title
                title={"Location " + (i + 1)}
                subtitle=""
                left={props => <Avatar.Icon {...props} icon="map" />}
              />
              <Card.Content>
                <Title>Address</Title>
                {/* Name */}
                {court_location["name"] ? (
                  <Paragraph>{court_location["name"]}</Paragraph>
                ) : (
                  <></>
                )}
                {/* Address Line 1 */}
                {court_location["addressLine1"] ? (
                  <Paragraph>{court_location["addressLine1"]}</Paragraph>
                ) : (
                  <></>
                )}

                {/* Address Line 2 */}
                {court_location["addressLine2"] ? (
                  <Paragraph>{court_location["addressLine2"]}</Paragraph>
                ) : (
                  <></>
                )}

                {/* City, Province */}
                {court_location["city"] && province ? (
                  <Paragraph>
                    {court_location["city"]}, {province}
                  </Paragraph>
                ) : (
                  <></>
                )}

                {/* Postal Code*/}
                {court_location["postalCode"] ? (
                  <Paragraph>{court_location["postalCode"]}</Paragraph>
                ) : (
                  <></>
                )}

                {/* Phone Number*/}
                {court_location["phoneNumber"] ? (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Avatar.Icon size={21} icon="phone" />
                    <Paragraph
                      style={{ flex: 1 }}
                      onPress={() => {
                        Linking.openURL("tel:" + court_location["phoneNumber"]);
                      }}
                    >
                      {" " + court_location["phoneNumber"]}
                    </Paragraph>
                  </View>
                ) : (
                  <></>
                )}
                {/* Phone Number*/}
                {court_location["faxNumber"] ? (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Avatar.Icon size={21} icon="fax" />
                    <Paragraph>{" " + court_location["faxNumber"]}</Paragraph>
                  </View>
                ) : (
                  <></>
                )}

                {/* Table for hours */}
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Day</DataTable.Title>
                    <DataTable.Title numeric>Opening Time</DataTable.Title>
                    <DataTable.Title numeric>Closing Time</DataTable.Title>
                  </DataTable.Header>

                  {court_location["operationalDays"] ? (
                    court_location["operationalDays"].map((data, j) => (
                      <DataTable.Row key={j + 1000}>
                        <DataTable.Cell>
                          {dayShortToLong(data["weekDay"])}
                        </DataTable.Cell>
                        {calcaulteTimeSlot(data["timeSlots"])[0] !==
                        "Closed" ? (
                          <>
                            <DataTable.Cell numeric>
                              {calcaulteTimeSlot(data["timeSlots"])[0]}
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              {calcaulteTimeSlot(data["timeSlots"])[1]}
                            </DataTable.Cell>
                          </>
                        ) : (
                          <DataTable.Cell
                            numeric
                            style={{ justifyContent: "center" }}
                          >
                            {calcaulteTimeSlot(data["timeSlots"])[0]}
                          </DataTable.Cell>
                        )}
                      </DataTable.Row>
                    ))
                  ) : (
                    <></>
                  )}
                </DataTable>
              </Card.Content>
              {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
              <Card.Actions style={{ justifyContent: "space-between" }}>
                {/* Formulate the url and open it */}
                {court_location["phoneNumber"] ? (
                  <Button
                    onPress={() => {
                      Linking.openURL("tel:" + court_location["phoneNumber"]);
                    }}
                    mode={buttonMode as any}
                  >
                    Call
                  </Button>
                ) : (
                  <></>
                )}

                <Button
                  onPress={() => {
                    Linking.openURL(
                      "https://www.google.com/maps/place/" +
                        [
                          court_location["addressLine1"],
                          court_location["postalCode"],
                          court_location["city"],
                          province
                        ].join(",")
                    );
                  }}
                  mode={buttonMode as any}
                >
                  Open in Google Maps
                </Button>
              </Card.Actions>
            </Card>

            {/* Divider only between and not at bottom */}
            {i + 1 !== locations.length ? (
              <Divider style={{ marginBottom: 10 }} />
            ) : (
              <></>
            )}
          </View>
        ))}
      </Content>
    </Container>
  );
}
