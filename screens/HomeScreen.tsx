import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Container, Content } from "native-base";
import {
  Appbar,
  ActivityIndicator,
  List,
  Card,
  Button,
  Badge,
  Colors,
  Paragraph,
  ProgressBar
} from "react-native-paper";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import {
  GetUnread,
  GetUnread_getUnread
} from "../constants/generated/GetUnread";
import { GET_UNREAD, SET_VIEWED } from "../constants/graphql";
import { database } from "../constants/database";
import { SetViewed } from "../constants/generated/SetViewed";
import { MiddleLoadingBar } from "../components/MiddleLoadingBar";

export default function HomeScreen({ navigation }) {
  // Storage for the sorted subscriptions
  const [sortedSubscriptions, setSortedSubscriptions] = useState<
    GetUnread_getUnread[]
  >([]);
  const sortSubscription = (
    first: GetUnread_getUnread,
    second: GetUnread_getUnread
  ): number => {
    return second.itemCount - first.itemCount;
  };

  // Query All Subscriptions and Unread status every 1 sec
  const {
    data: subscriptions,
    loading: subscriptions_loading,
    error: subscriptions_error
  } = useQuery<GetUnread>(GET_UNREAD, {
    onCompleted: data => {
      // Sort them according to the options set
      data.getUnread.sort((first, second) => sortSubscription(first, second));
      // Set the sorted subscriptions
      setSortedSubscriptions(data.getUnread);
    },
    onError: error => {},
    // Don't cache anything
    fetchPolicy: "no-cache",
    // Poll every 1 second
    pollInterval: 500
  });

  // useEffect Hook
  useEffect(() => {
    if (subscriptions) {
      setSortedSubscriptions(
        subscriptions.getUnread.sort((first, second) =>
          sortSubscription(first, second)
        )
      );
    }
  });

  // Return generated content
  return (
    <Container>
      {/* App bar  */}
      <Appbar.Header style={{ height: 70 }}>
        <Appbar.Action icon="home" />
        <Appbar.Content title="Home" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      {/* Loading circle at start */}
      {subscriptions_loading && (
        <MiddleLoadingBar />
      )}

      {/* Display content when done loading*/}
      {!subscriptions_loading && subscriptions.getUnread.length >= 1 && (
        <Content>
          {sortedSubscriptions.map((subscription, i) => (
            <List.Item
              key={i}
              title={subscription.courtFileNumber}
              style={{ backgroundColor: Colors.grey300 }}
              // Set the description to "n new hearings"
              description={
                subscription.itemCount > 0
                  ? subscription.itemCount.toString() +
                    " new " +
                    // Plural/Singular
                    (subscription.itemCount >= 1 ? "hearings" : "hearing")
                  : ""
              }
              left={props => <List.Icon {...props} icon="folder-account" />}
              right={props => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => {
                // Open the navigation
                navigation.navigate("Modals", {
                  screen: "HearingDetail",
                  params: {
                    courtFileNumber: subscription.courtFileNumber
                  }
                });
              }}
              // Bold the title if there are any unread hearings
              titleStyle={
                subscription.itemCount > 0
                  ? {
                      fontWeight: "bold"
                    }
                  : {}
              }
            />
          ))}
        </Content>
      )}

      {/* No bookmarks */}
      {!subscriptions_loading && subscriptions.getUnread.length <= 0 &&  (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Paragraph>No bookmarks yet</Paragraph>
          <List.Icon icon="bookmark" />
        </View>
      )}
    </Container>
  );
}
