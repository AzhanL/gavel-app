import React, { useState, useEffect } from "react";
import {
  Appbar,
  Searchbar,
  Colors,
  List,
  Menu,
  Portal,
  Dialog,
  Button,
  RadioButton,
  Paragraph
} from "react-native-paper";
import { Content, View, Container } from "native-base";
import { useLazyQuery } from "@apollo/react-hooks";
import { SEARCH_HEARINGS_BY_PARTYNAME } from "../constants/graphql";
import { SearchHearingsByPartyName_hearings } from "../constants/generated/SearchHearingsByPartyName";
import { MiddleLoadingBar } from "../components/MiddleLoadingBar";


export default function HearingsScreen({ navigation }) {
  // 3 Dot menu - top right
  const [moreMenuVisible, setMoreMenuVisiblity] = useState(false);
  // Search Setting Dialog for 3 dot menu item
  const [searchSettingDialog, setSearchSettingDialog] = useState(false);
  // Ouptut Setting Dialog for 3 dot menu item
  const [outputSettingDialog, setOutputSettingDialog] = useState(false);

  // Search Setting Dialog for 3 dot menu item
  const [searchSettingValue, setSearchSettingValue] = useState("partyName");
  // Ouptut Setting Dialog for 3 dot menu item
  const [outputSettingValue, setOutputSettingValue] = useState(
    "courtFileNumber"
  );

  // Store the value of the searchbar
  const [searchBarValue, setSearchBarValue] = useState("");
  // Check if the user wants to search or not
  const [searching, setSearchingToggle] = useState(false);
  // Loading search is needed for new search
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Sorted by Category
  const [sortedDataByCategory, setSortedDataByCategory] = useState(null);
  const [sortedDataReady, setSortedDataReady] = useState(false);
  // Sort Function
  let sortData = data => {
    let sorted_data = {};

    // Loop through each hearing
    data.hearings.forEach(hearing => {
      let hearingCategory = hearing["hearingType"];
      // Create the category array if it doesnt exist
      if (Object.keys(sorted_data).indexOf(hearingCategory) <= -1) {
        sorted_data[hearingCategory] = [];
      }
      // Unpack the hearing and push it to the end
      sorted_data[hearingCategory].push({ ...hearing });
    });
    setSortedDataByCategory(sorted_data);
  };

  // Remove searchbar
  let removeSearchBar = () => {
    setSearchingToggle(false);
  };

  // GQL data,loading, and error state variables extracted from query
  const [searchByName, { data, loading, error }] = useLazyQuery(
    SEARCH_HEARINGS_BY_PARTYNAME,
    {
      onCompleted: query_result => {
        sortData(query_result);
        setSortedDataReady(true);
        setLoadingSearch(false);
      }
    }
  );

  useEffect(() => {
    // Set the data to ready if it was cached
    if (data && !loading && !error) {
      setSortedDataReady(true);
    }
  });

  return (
    <Container>
      {!searching ? (
        // Regular Default Header
        <Appbar.Header style={{ height: 70 }}>
          <Appbar.Action icon="gavel" />
          <Appbar.Content title="Hearing" />

          <Appbar.Action
            icon="magnify"
            onPress={() => setSearchingToggle(true)}
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
            <Menu.Item
              title="Search Type"
              onPress={() => {
                setSearchSettingDialog(true);
              }}
              key={1}
            />
            <Menu.Item
              title="Output Setting"
              onPress={() => {
                setOutputSettingDialog(true);
              }}
              key={2}
            />
          </Menu>
        </Appbar.Header>
      ) : (
        // Search Header
        <Appbar.Header style={{ height: 70 }}>
          <Content padder>
            <Searchbar
              placeholder="Search"
              onChangeText={value => {
                setSearchBarValue(value);
              }}
              value={searchBarValue}
              onEndEditing={() => {
                setSearchingToggle(false);
              }}
              onBlur={() => {
                setSearchingToggle(false);
              }}
              onSubmitEditing={() => {
                setSortedDataReady(false);
                setLoadingSearch(true);
                if (searchSettingValue === "courtFileNumber") {
                  // TODO: Add Search By File Number
                } else if (searchSettingValue === "partyName") {
                  searchByName({ variables: { partyName: searchBarValue } });
                }
              }}
            />
          </Content>
        </Appbar.Header>
      )}

      {/* Helper Text */}
      {!loading && !loadingSearch && !sortedDataReady && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Paragraph>Try Searching</Paragraph>
          <List.Icon icon="magnify" />
        </View>
      )}

      {/* Loading Searching */}
      {(loading || loadingSearch) && (
        <MiddleLoadingBar />
      )}

      {/* Hearing Categories and List */}
      {sortedDataByCategory &&
        sortedDataReady &&
        Object.keys(sortedDataByCategory).length > 0 && (
          <Content padder>
            {Object.keys(sortedDataByCategory).map((category, i) => (
              <List.Accordion
                title={category}
                key={i}
                onPress={() => {
                  removeSearchBar();
                }}
                left={props => <List.Icon {...props} icon="file-tree" />}
              >
                {sortedDataByCategory[category].map(
                  (hearing_details: SearchHearingsByPartyName_hearings, j) => (
                    // Output title
                    <List.Item
                      title={hearing_details[outputSettingValue]}
                      key={j + 10000}
                      right={props => (
                        <List.Icon {...props} icon="arrow-right" />
                      )}
                      style={{ backgroundColor: Colors.grey300 }}
                      onPress={() => {
                        navigation.navigate("Modals", {
                          screen: "HearingDetail",
                          params: {
                            courtFileNumber: hearing_details.courtFileNumber,
                            hearingID: hearing_details.id
                          }
                        });
                      }}
                      left={props => (
                        <List.Icon {...props} icon="folder-account" />
                      )}
                    />
                  )
                )}
              </List.Accordion>
            ))}
          </Content>
        )}

      {/* No search result */}
      {sortedDataByCategory &&
        sortedDataReady &&
        Object.keys(sortedDataByCategory).length <= 0 && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Paragraph>No search results</Paragraph>
            <List.Icon icon="magnify" />
          </View>
        )}

      {/* Search Setting Dialong */}
      {searchSettingDialog ? (
        <Portal>
          <Dialog
            visible={searchSettingDialog}
            onDismiss={() => {
              () => {
                setSearchSettingDialog(false);
              };
            }}
          >
            <Dialog.Title>Select a Search Type</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={value => {
                  setSearchSettingValue(value);
                }}
                value={searchSettingValue}
              >
                {/* Disabled as titles are not alway present
                  <RadioButton.Item label="Title" value="title">
                   */}
                <RadioButton.Item
                  label="Court File Number"
                  value="courtFileNumber"
                />
                <RadioButton.Item label="Party Name" value="partyName" />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setSearchSettingDialog(false);
                }}
              >
                Done
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : (
        <></>
      )}

      {/* Output Setting Dialong */}
      {outputSettingDialog ? (
        <Portal>
          <Dialog
            visible={outputSettingDialog}
            onDismiss={() => {
              () => {
                setOutputSettingDialog(false);
              };
            }}
          >
            {/* Change the output view setting */}
            <Dialog.Title>Select an Output View</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={value => {
                  setOutputSettingValue(value);
                }}
                value={outputSettingValue}
              >
                {/* Disabled as titles are not alway present
                  <RadioButton.Item label="Title" value="title">
                   */}
                <RadioButton.Item
                  label="Court File Number"
                  value="courtFileNumber"
                />
                <RadioButton.Item label="Party Name" value="partyName" />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setOutputSettingDialog(false);
                }}
              >
                Done
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : (
        <></>
      )}
    </Container>
  );
}
