import React, { useState, useEffect } from "react";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { useQuery } from "@apollo/react-hooks";
import { Notifications } from "expo";
import { GetUnread } from "../constants/generated/GetUnread";
import {
  GET_UNREAD,
  GET_HEARING_COUNT,
  SEARCH_HEARINGS_BY_FILENUMBER_NOTIFICATION,
  SEARCH_HEARINGS_BY_FILENUMBER,
  ADD_HEARING
} from "../constants/graphql";
import { _ApolloClient } from "../App";
import {
  GetHearingCount_getHearingCount,
  GetHearingCount
} from "../constants/generated/GetHearingCount";
import { SearchHearingsByCourtFileNumberForNotification } from "../constants/generated/SearchHearingsByCourtFileNumberForNotification";
import { SearchHearingsByCourtFileNumber } from "../constants/generated/SearchHearingsByCourtFileNumber";
import { Subscriptions_subscriptions } from "../constants/generated/Subscriptions";
import { AddHearings } from "../constants/generated/AddHearings";
export default function Notifier() {
  return <></>;
}

const GenericHearingNotification = {
  title: "Example Title!",
  body: "This is the body text of the local notification",
  data: { courtFileNumber: "ABC123" },
  android: {},
  ios: {
    sound: true
  }
};

TaskManager.defineTask("HearingUpdateTask", ({ data, error }) => {
  console.log("Checking for new hearings");
  // First get all the subscribed hearings
  // Query All Subscriptions and Unread status every 1 sec
  _ApolloClient
    .query<GetHearingCount>({
      query: GET_HEARING_COUNT,
      fetchPolicy: "no-cache"
    })
    .then(localdata => {
      // For each court file number -> query for hearings
      localdata.data.getHearingCount.forEach(localhearing => {
        console.log(`Checking ${localhearing.courtFileNumber}`);
        // Query for each file number - MINIMAL
        _ApolloClient
          .query<SearchHearingsByCourtFileNumberForNotification>({
            query: SEARCH_HEARINGS_BY_FILENUMBER_NOTIFICATION,
            variables: {
              courtFileNumber: localhearing.courtFileNumber
            },
            fetchPolicy: "no-cache"
          })
          .then(api_result_min => {
            // If there are more hearings on the server than in the client -> post notification
            if (api_result_min.data.hearings.length > localhearing.itemCount) {
              // Get all hearing with the same court file number - FULL - For insertion
              _ApolloClient
                .query<SearchHearingsByCourtFileNumber>({
                  query: SEARCH_HEARINGS_BY_FILENUMBER,
                  variables: {
                    courtFileNumber: localhearing.courtFileNumber
                  },
                  fetchPolicy: "no-cache"
                })
                .then(api_result_full => {
                  // For each hearing add it the database
                  let hearings_array = [];
                  // Each hearing gets added to list
                  api_result_full.data.hearings.forEach(hearing => {
                    // Formulate an individual hearing
                    let hearing_var: Subscriptions_subscriptions = {
                      __typename: "ClientDBHearingType",
                      id: hearing.id,
                      courtFileNumber: hearing.courtFileNumber,
                      unread: true
                    };
                    // Push it to the list
                    hearings_array.push(hearing_var);
                  });

                  // Add the new hearings to the DB
                  _ApolloClient.mutate<AddHearings>({
                    mutation: ADD_HEARING,
                    variables: {
                      hearings: hearings_array
                    }
                  });
                });

              // Copy a notification object
              let custom_hearing_notification = GenericHearingNotification;
              // Fill in the parameters for the notification
              custom_hearing_notification.title = "Gavel";
              // How many hearings behind is the user
              let count_difference: number =
                api_result_min.data.hearings.length - localhearing.itemCount;
              custom_hearing_notification.body =
                count_difference.toString() +
                " new " +
                // Plural/Singular
                (count_difference == 1 ? "hearing" : "hearings") +
                " for " +
                localhearing.courtFileNumber;
              // Setting data for navigation to go directly to the hearing
              custom_hearing_notification.data = {
                courtFileNumber: localhearing.courtFileNumber
              };

              // Send a notification
              Notifications.presentLocalNotificationAsync(
                custom_hearing_notification
              );
            }
          });
      });
    })
    .catch(error => {
      console.log(error);
    });
});
BackgroundFetch.setMinimumIntervalAsync(1);
BackgroundFetch.registerTaskAsync("HearingUpdateTask", {
  minimumInterval: 0,
  stopOnTerminate: false,
  startOnBoot: true
});
