import {
  database,
  SUBSCRIBE,
  UNSUBSCRIBE,
  SUBSCRIPTIONS,
  SUBSCRIPTIONS_BY_FILENUMBER
} from "./database";
import { Subscriptions_subscriptions } from "../constants/generated/Subscriptions";
import { useState } from "react";
import { TempStore, storedata } from "../redux/store";
export const resolvers = {
  Mutation: {
    // Subscribe to new hearings by adding them to the database
    subscribeHearing: async (_root, variables, _context, _info) => {
      async function QueryDB() {
        return new Promise((resolve, reject) => {
          database.transaction(tx => {
            tx.executeSql(
              // Use the subscribe query
              SUBSCRIBE,
              // Pass the parameters
              [variables.hearingID, variables.courtFileNumber],
              // If successful return true
              (_, result) => {
                console.log("Inserted Successfully");
                response = true;
                resolve(true);
              },

              // If failure the return false
              (_, error) => {
                console.log("Inserted Failure");
                response = false;
                reject(false);
                return false;
              }
            );
          });
        });
      }
      await QueryDB()
        .then(value => {
          return true;
        })
        .catch(() => {
          return false;
        })
        .finally(() => {
          return false;
        });
    },
    // Unsubscribe to hearings to removing them from the database
    unsubscribeHearing: async (_root, variables, _context, _info) => {
      // Async function to query the database
      async function QueryDB() {
        return new Promise((resolve, reject) => {
          database.transaction(tx => {
            // Run the subscribe query with the variables
            tx.executeSql(
              // Use the unsubscribe query
              UNSUBSCRIBE,
              // Pass paramters
              [variables.courtFileNumber],
              // If successful return true
              (_, result) => {
                console.log("Inserted Successfully");
                resolve(true);
              },
              // If failure the return false
              (_, error) => {
                console.log("Inserted Failure");
                reject(false);
                return false;
              }
            );
          });
        });
      }
      // Wait for the response from the database before returning anything
      await QueryDB()
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        })
        .finally(() => {
          return false;
        });
    }
  },
  Query: {
    // Returns all the subscribed hearings or only the filtered ones
    subscriptions: async (_root, variables, { cache }, _info) => {
      let formatted_rows: Subscriptions_subscriptions[] = [];

      // If successfull returns the rows in the database with the coresponding file number
      async function QueryDB() {
        return new Promise((resolve, reject) => {
          database.transaction(tx => {
            // Query and get all the subscriptions
            tx.executeSql(
              // Use the subscribition query
              SUBSCRIPTIONS,
              // No variables
              undefined,
              // If successful return push each item into the formatted_rows for return
              (_, result) => {
                result.rows["_array"].forEach(row => {
                  // Push each row to format the object properly
                  formatted_rows.push({
                    __typename: "ClientDBHearingType",
                    id: String(row["hearing_id"]),
                    courtFileNumber: row["file_number"],
                    viewed: row["viewed"] == 0 ? false : true
                  });
                });
                resolve(result);
              },
              // If failure the return the error
              (_, error) => {
                reject(error);
                return false;
              }
            );
          });
        });
      }
      // Wait for the database to finish querying and getting the response
      await QueryDB();

      // Return the formatted rows; if none then returns empty array
      return formatted_rows;
    }
  }
};
