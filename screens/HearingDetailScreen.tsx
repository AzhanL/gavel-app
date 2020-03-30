import React, { useEffect, useState, useContext } from "react";
import {
  Appbar,
  Snackbar,
  ProgressBar,
  ActivityIndicator,
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  Divider,
  Subheading,
  Menu
} from "react-native-paper";
import { Body, Container, Content } from "native-base";
import { SearchHearingsByPartyName_hearings } from "../constants/generated/SearchHearingsByPartyName";
import { SearchHearingsByCourtFileNumber } from "../constants/generated/SearchHearingsByCourtFileNumber";
import { IsSubscribedTo } from "../constants/generated/IsSubscribedTo";
import { Subscriptions } from "../constants/generated/Subscriptions";
import { Text } from "react-native-paper";
import { DatabaseContext, SUBSCRIBE, UNSUBSCRIBE } from "../constants/database";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  SUBSCRIBE_HEARING,
  UNSUBSCRIBE_HEARING,
  SEARCH_HEARINGS_BY_FILENUMBER,
  SUBSCRIPTIONS,
  IS_SUBSCRIBED_TO
} from "../constants/graphql";
import { View } from "react-native";

// TODO: Add a way to sync ID changes and location changes

export default function HearingDetailScreen({ navigation, route }) {
  // Get the database
  const database = useContext(DatabaseContext);

  // Retreive the hearing details from the passed parameters
  const court_file_number: string = route.params?.courtFileNumber;
  // All hearings with the same file-number
  const [hearings, setHearings] = useState(null);

  // Get all court hearing with the same court file number
  const {
    data: all_hearings,
    loading: loading_hearings,
    error: error_hearings
  } = useQuery<SearchHearingsByCourtFileNumber>(SEARCH_HEARINGS_BY_FILENUMBER, {
    variables: {
      courtFileNumber: court_file_number
    }
  });

  // Database checker to check if the file number is subscribed
  const [
    getSubscriptionStatus,
    {
      data: subscription_status,
      loading: subscription_status_loading,
      error: subscription_status_error
    }
  ] = useLazyQuery<IsSubscribedTo>(IS_SUBSCRIBED_TO, {
    variables: {
      courtFileNumber: court_file_number
    },
    onCompleted: status => {
      setBookmarked(status?.isSubscribedTo);
    },
    fetchPolicy: "no-cache"
  });

  // Create functions for subscribte and unsubscribe
  const [
    subscribe,
    { data: subscribe_data, loading: subscribe_loading, error: subscibe_error }
  ] = useMutation(SUBSCRIBE_HEARING);
  const [
    unsubscribe,
    {
      data: unsubscribe_data,
      loading: unsubscribe_loading,
      error: unsubscribe_error
    }
  ] = useMutation(UNSUBSCRIBE_HEARING);

  // 3 Dot menu - top right
  const [moreMenuVisible, setMoreMenuVisiblity] = useState(false);

  // Manage bookmark states
  const [bookmarked, setBookmarked] = useState(false);

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
      all_hearings.hearings.forEach(hearing => {
        subscribe({
          variables: {
            courtFileNumber: court_file_number,
            hearingID: hearing.id
          }
        });

        setSnackbarMessage("File Number Bookmarked");
        setSnackbarVisibility(true);
      });
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

  // Returns a fullname in format "FirstName LastName" from "LastName, FirstName"
  const fullname = (comma_seperated_name: string) => {
    let split_name = comma_seperated_name.split(",");
    return `${split_name[1]} ${split_name[0]}`.trim();
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
        <Appbar.Content title={court_file_number} />

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
      {/* Content  - Display all the hearings that have taken place*/}
      {all_hearings ? (
        <Content padder>
          {all_hearings.hearings.map((hearing, i) => (
            <View key={i}>
              <Card>
                <Card.Title
                  title={fullname(hearing.partyName)}
                  subtitle={hearing.hearingType}
                  left={props => <Avatar.Icon {...props} icon="gavel" />}
                />
                <Card.Content>
                  <Title>{hearing.hearingType}</Title>
                  <Paragraph>Lawyer: {fullname(hearing.lawyer)}</Paragraph>

                  <Paragraph>
                    {`Date: ${formatDatetimeStringFromDatetimeAndOffset(
                      hearing.dateTime,
                      hearing.dateTimeOffset
                    )}`}
                  </Paragraph>
                  <Paragraph>
                    {`Timezone: ${hearing.dateTimeOffset
                      .trim()
                      .substring(
                        0,
                        3
                      )}:${hearing.dateTimeOffset.trim().substring(3, 5)}`}
                  </Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button>Transcript</Button>
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
      {/* Loading */}
      {loading_hearings ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating={true} color="#20272F" size="large" />
        </View>
      ) : (
        <></>
      )}
      {/* Snackbar for messages */}
      {snackbarVisibility ? (
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
      ) : (
        <></>
      )}
    </Container>
  );
}
