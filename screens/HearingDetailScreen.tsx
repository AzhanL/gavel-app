import React, { useEffect, useState } from "react";
import {
  ADD_HEARING,
  IS_SUBSCRIBED_TO,
  SEARCH_HEARINGS_BY_FILENUMBER,
  SET_VIEWED,
  UNSUBSCRIBE_HEARING
} from "../constants/graphql";
import { AddHearings } from "../constants/generated/AddHearings";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Divider,
  Menu,
  Paragraph,
  Text,
  Snackbar,
  Title,
  DataTable,
  Subheading
} from "react-native-paper";
import { Container, Content } from "native-base";
import { IsSubscribedTo } from "../constants/generated/IsSubscribedTo";
import { Linking } from "expo";
import { MiddleLoadingBar } from "../components/MiddleLoadingBar";
import { SearchHearingsByCourtFileNumber } from "../constants/generated/SearchHearingsByCourtFileNumber";
import { SetViewed } from "../constants/generated/SetViewed";
import { Subscriptions_subscriptions } from "../constants/generated/Subscriptions";
import { TopLoadingBar } from "../components/TopLoadingBar";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { View } from "react-native";
import {
  capitalizeFirstLetters,
  firstName,
  fullname
} from "../constants/utils";

// TODO: Add a way to sync ID changes and location changes

export default function HearingDetailScreen({ navigation, route }) {
  // Manage bookmark states
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkData, setBookmarkData] = useState(null);

  // Retreive the hearing details from the passed parameters
  const court_file_number: string = route.params?.courtFileNumber;
  // This query will set the hearings to viewed once they have been viewed
  const [setViewed] = useMutation<SetViewed>(SET_VIEWED, {
    variables: {
      courtFileNumber: court_file_number
    }
  });
  // All hearings with the same file-number
  const [] = useState(null);

  // Get all court hearing with the same court file number
  const {
    data: all_hearings,
    loading: loading_hearings,
    error: error_hearings
  } = useQuery<SearchHearingsByCourtFileNumber>(SEARCH_HEARINGS_BY_FILENUMBER, {
    variables: {
      courtFileNumber: court_file_number
    },
    onCompleted: async data => {
      // On completion formulate the data to gets sent for bookmarking
      let hearings_array = [];

      // Each hearing gets added to list
      data.hearings.forEach(hearing => {
        // Formulate an individual hearing
        let hearing_var: Subscriptions_subscriptions = {
          __typename: "ClientDBHearingType",
          id: hearing.id,
          courtFileNumber: hearing.courtFileNumber,
          unread: false
        };
        // Push it to the list
        hearings_array.push(hearing_var);
      });
      setBookmarkData(hearings_array);
    }
  });

  // Database checker to check if the file number is subscribed
  const [
    getSubscriptionStatus,
    { data: subscription_status, loading: subscription_status_loading }
  ] = useLazyQuery<IsSubscribedTo>(IS_SUBSCRIBED_TO, {
    variables: {
      courtFileNumber: court_file_number
    },
    onCompleted: status => {
      setBookmarked(status?.isSubscribedTo);
      if (status?.isSubscribedTo) {
        setViewed();
      }
    },
    fetchPolicy: "no-cache"
  });

  // Create functions for subscribte and unsubscribe
  const [subscribe, { loading: subscribe_loading }] = useMutation<AddHearings>(
    ADD_HEARING,
    {
      variables: {
        hearings: bookmarkData
      }
    }
  );
  const [unsubscribe, { loading: unsubscribe_loading }] = useMutation(
    UNSUBSCRIBE_HEARING
  );

  // 3 Dot menu - top right
  const [moreMenuVisible, setMoreMenuVisiblity] = useState(false);

  // Snackbar constants
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function toggle bookmark
  const toogleBookmark = () => {
    // Insert the hearing if we have the hearing details
    if (
      !bookmarked &&
      court_file_number &&
      all_hearings &&
      !loading_hearings &&
      !error_hearings
    ) {
      // Subscribe/Bookmark and give a notification
      subscribe();
      setSnackbarMessage("File Number Bookmarked");
      setSnackbarVisibility(true);
    } else if (!all_hearings && (loading_hearings || error_hearings)) {
      setSnackbarMessage("Error Bookmarking");
      setSnackbarVisibility(true);
    }
    // Remove the bookmark
    if (bookmarked) {
      unsubscribe({
        variables: {
          courtFileNumber: court_file_number
        }
      });

      setSnackbarMessage("Bookmark Removed");
      setSnackbarVisibility(true);
    }

    // Change the state of it being bookmarked
    // We set it here to speed up the animated but is consolidated when the query completes
    setBookmarked(!bookmarked);
    // The bookmark status is consolidated on the completion of this query
    getSubscriptionStatus();
  };

  // Returns the timezone from offset like "+0500" in format "+HHMM"
  // H - hour, M - minute
  const getTimezoneFromOffset = (offset: string): string => {
    let timezone = "Etc/GMT";
    let _offset: String = offset.trim();
    let offset_sign = _offset.substring(0, 1);
    // Reverse the time for GMT time
    timezone += offset_sign == "+" ? "-" : "+";
    timezone += parseInt(_offset.substring(1, 3)).toString();

    return timezone;
  };

  // Converts a datetime string with its offset to proper string
  const formatDatetimeStringFromDatetimeAndOffset = (
    datetime: string,
    offset: string
  ): string => {
    // Initilize new output string
    let datetime_str: string = "";
    // Initialize new date from date
    let new_date = new Date(datetime);
    let timezoneName = getTimezoneFromOffset(offset);
    let output_format_options: Intl.DateTimeFormatOptions = {
      timeZone: timezoneName,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    // Add date then time
    datetime_str += new_date.toLocaleTimeString(
      undefined,
      output_format_options
    );
    return datetime_str;
  };

  // State updates
  useEffect(() => {
    // Check if the user is already subscribe from the database
    if (!subscription_status && !subscription_status_loading) {
      getSubscriptionStatus();
    }
  });

  return (
    <Container>
      {/* Title bar */}
      <Appbar.Header style={{ height: 70 }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          title={court_file_number}
          titleStyle={{ fontSize: 17 }}
        />

        <Appbar.Action
          icon={bookmarked ? "bookmark" : "bookmark-outline"}
          onPress={() => {
            toogleBookmark();
          }}
        />

        <Menu
          visible={moreMenuVisible}
          onDismiss={() => setMoreMenuVisiblity(false)}
          anchor={
            <Appbar.Action
              color="white"
              icon="dots-vertical"
              onPress={() => setMoreMenuVisiblity(true)}
            />
          }
        >
          <Menu.Item title="Placeholder" onPress={() => {}} key={1} />
        </Menu>
      </Appbar.Header>

      {/* Background loading */}
      {!loading_hearings &&
        (subscription_status_loading ||
          subscribe_loading ||
          unsubscribe_loading) && <TopLoadingBar />}

      {/* Content  - Display all the hearings that have taken place*/}
      {all_hearings ? (
        <Content padder>
          {all_hearings.hearings.map((hearing, i) => (
            <View key={i}>
              <Card>
                <Card.Title
                  title={capitalizeFirstLetters(firstName(hearing.partyName))}
                  left={props => <Avatar.Icon {...props} icon="ear-hearing" />}
                />
                <Card.Content>
                  <Title>{capitalizeFirstLetters(hearing.hearingType)}</Title>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ flexWrap: "wrap" }}>
                      Full Name: {fullname(hearing.partyName, true)}
                    </Text>
                  </View>
                  <Text>Lawyer: {fullname(hearing.lawyer, true)}</Text>
                  <DataTable>
                    {/* Date */}
                    <DataTable.Row>
                      <DataTable.Cell>Date</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {new Date(hearing.dateTime).toDateString()}
                      </DataTable.Cell>
                    </DataTable.Row>
                    {/* Time */}
                    <DataTable.Row>
                      <DataTable.Cell>Time</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {formatDatetimeStringFromDatetimeAndOffset(
                          hearing.dateTime,
                          hearing.dateTimeOffset
                        )}
                      </DataTable.Cell>
                    </DataTable.Row>

                    {/* Timezone */}
                    <DataTable.Row>
                      <DataTable.Cell>Timezone</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {hearing.dateTimeOffset.substring(0, 4) +
                          ":" +
                          hearing.dateTimeOffset.substring(4, 6)}
                      </DataTable.Cell>
                    </DataTable.Row>
                  </DataTable>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "space-between" }}>
                  <Button
                    onPress={() => {
                      Linking.openURL(
                        `https://www.canlii.org/en/#search/id=${hearing.courtFileNumber}&resultIndex=1`
                      );
                    }}
                  >
                    Transcript
                  </Button>
                  <Button
                    onPress={() =>
                      navigation.navigate("Modals", {
                        screen: "CourtDetail",
                        params: {
                          courtInfo: hearing.court,
                          name: hearing.court.name
                        }
                      })
                    }
                  >
                    Court Info.
                  </Button>
                </Card.Actions>
              </Card>
              {i + 1 !== all_hearings.hearings.length ? (
                <Divider style={{ marginBottom: 10 }} />
              ) : (
                <></>
              )}
            </View>
          ))}
        </Content>
      ) : (
        <></>
      )}
      {/* Main Loading Bar*/}
      {loading_hearings && <MiddleLoadingBar />}

      {/* Snackbar for messages */}
      {snackbarVisibility && (
        <Snackbar
          visible={snackbarVisibility}
          onDismiss={() => setSnackbarVisibility(false)}
          action={{
            label: "DISMISS",
            onPress: () => {
              setSnackbarVisibility(false);
            }
          }}
          style={{
            backgroundColor: "#20272F"
          }}
        >
          {snackbarMessage}
        </Snackbar>
      )}
    </Container>
  );
}
