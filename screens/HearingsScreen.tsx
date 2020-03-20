import React, { useState } from "react";
import {
  Appbar,
  Searchbar,
  Colors,
  ProgressBar,
  List,
  Menu,
  Portal,
  Dialog,
  Button,
  RadioButton,
  Text
} from "react-native-paper";
import { Content } from "native-base";
import { useLazyQuery } from "@apollo/react-hooks";
import { SEARCH_HEARINGS_BY_PARTYNAME } from "../constants/graphql";

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

  // Retreived Data
  const [, setRetreivedData] = useState(false);

  // Sorted by Category
  const [sortedDataByCategory, setSortedDataByCategory] = useState(null);
  const [dataReady, setDataReady] = useState(false);
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

  // GQL data,loading, and error state variables extracted from query
  const [searchByName, { data, loading }] = useLazyQuery(
    SEARCH_HEARINGS_BY_PARTYNAME,
    {
      onCompleted: query_result => {
        sortData(query_result);
        setDataReady(true);
      }
    }
  );
  return (
    <>
      {!searching ? (
        // Regular Default Header
        <Appbar.Header style={{ height: 70 }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={"Hearings"} subtitle={""} />

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
          <Searchbar
            placeholder="Search"
            onChangeText={value => {
              setSearchBarValue(value);
            }}
            value={searchBarValue}
            onFocus={() => {}}
            onEndEditing={() => {
              setSearchingToggle(false);
              setDataReady(false);
            }}
            onSubmitEditing={() => {
              setRetreivedData(false);
              setDataReady(false);
              if (searchSettingValue === "courtFileNumber") {
                // TODO: Add Search By File Number
              } else if (searchSettingValue === "partyName") {
                searchByName({ variables: { partyName: searchBarValue } });
              }
            }}
          />
        </Appbar.Header>
      )}

      {/* Hearing Categories and List */}
      <Content padder>
        <>
          {data && dataReady && sortedDataByCategory ? (
            Object.keys(sortedDataByCategory).map((category, i) => (
              <List.Accordion title={category} key={i}>
                {sortedDataByCategory[category].map((hearing_details, j) => (
                  // Output title
                  <List.Item
                    title={hearing_details[outputSettingValue]}
                    key={j + 10000}
                  />
                ))}
              </List.Accordion>
            ))
          ) : (
            // Output the progress bar only when the search is loading
            <>
              {loading ? (
                <ProgressBar color={Colors.blue700} indeterminate={loading} />
              ) : (
                <Text>Try Searching</Text>
              )}
            </>
          )}
        </>

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
      </Content>
    </>
  );
}
