import {
  database,
  UNSUBSCRIBE,
  SUBSCRIPTIONS,
  SUBSCRIPTIONS_BY_FILENUMBER,
  ADD_HEARING,
  GET_UNREAD,
  SET_READ_FILENUMBER
} from "./database";
import {
  Subscriptions_subscriptions,
  Subscriptions
} from "../constants/generated/Subscriptions";
import {
  GetUnread,
  GetUnread_getUnread
} from "../constants/generated/GetUnread";

export const resolvers = {
  Mutation: {
    // Subscribe to new hearings by adding them to the database
    // Add unviewed hearings (purpose of notification)
    addHearing: async (_root, variables, _context, _info) => {
      let return_val = true;
      async function QueryDB() {
        return new Promise((resolve, reject) => {
          database.transaction(
            tx => {
              variables.hearings.forEach(hearing => {
                tx.executeSql(
                  // Use the subscribe query
                  ADD_HEARING,
                  // Pass the parameters
                  [
                    parseInt(hearing.id),
                    hearing.courtFileNumber,
                    hearing.unread ? 1 : 0
                  ],
                  // If successful return true
                  (_, result) => {},

                  // If failure the return false
                  (_, error) => {
                    console.log(error);
                    return_val = false;
                    return false;
                  }
                );
              });
            },
            error => {
              console.log(error);
              reject(false);
            },
            () => {
              resolve(true);
            }
          );
        });
      }
      // Wait for the response from the database before returning anything
      // if successfull then return true else retrun false
      await QueryDB();
      return return_val;
    },
    // Unsubscribe to hearings to removing them from the database
    unsubscribeHearing: async (_root, variables, _context, _info) => {
      let return_val = false;
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
                return_val = true;
                resolve(true);
              },
              // If failure the return false
              (_, error) => {
                return_val = false;
                reject(false);
                return false;
              }
            );
          });
        });
      }
      // Wait for the response from the database before returning anything
      // if successfull then return true else retrun false
      await QueryDB();
      return return_val;
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
              // The query is dependant on whether or not a filenumber is provider or not
              variables.courtFileNumber
                ? SUBSCRIPTIONS_BY_FILENUMBER
                : SUBSCRIPTIONS,
              // If a the file number is provided then filter it out
              variables.courtFileNumber
                ? [variables.courtFileNumber]
                : undefined,
              // If successful return push each item into the formatted_rows for return
              (_, result) => {
                result.rows["_array"].forEach(row => {
                  // Push each row to format the object properly
                  formatted_rows.push({
                    __typename: "ClientDBHearingType",
                    id: String(row["hearing_id"]),
                    courtFileNumber: row["file_number"],
                    unread: row["unread"] == 0 ? false : true
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
      let return_subscription: Subscriptions = {
        subscriptions: formatted_rows
      };
      // Return the formatted rows; if none then returns empty array
      console.log(return_subscription);
      return return_subscription;
    },
    isSubscribedTo: async (_root, variables, { cache }, _info) => {
      let return_value = false;
      async function QueryDB() {
        return new Promise((resolve, reject) => {
          database.transaction(tx => {
            // Execute sql in transaction
            tx.executeSql(
              SUBSCRIPTIONS_BY_FILENUMBER,
              // Pass the file number that is being checked for
              [variables.courtFileNumber],
              (_, result) => {
                // Check if there are > 1 subscriptions with the same file number
                if (result.rows.length >= 1) {
                  return_value = true;
                  resolve(true);
                } else resolve(false);
              },
              // On an error, reject the promise
              (_, error) => {
                console.log(error);
                reject(error);
                return false;
              }
            );
          });
        });
      }

      // Return the subscription status; on error return false
      await QueryDB()
        .then(existence => {})
        .catch(reason => {
          console.log(reason);
        });

      return return_value;
    },
    getUnread: async (_root, variables, { cache }, _info) => {
      let return_value = [];
      async function QueryDB() {
        return new Promise((resolve, reject) => {
          database.transaction(tx => {
            // Execute sql in transaction
            tx.executeSql(
              GET_UNREAD,
              undefined,
              (_, result) => {
                result.rows["_array"].forEach(row => {
                  // For each row in the database, append a object with the data
                  let subscription: GetUnread_getUnread = {
                    __typename: "UnreadCountType",
                    courtFileNumber: row["file_number"],
                    unreadCount: row["unread_count"]
                  };
                  // Append it to the return values
                  return_value.push(subscription);
                });
                resolve(return_value);
              },
              // On an error, reject the promise
              (_, error) => {
                console.log(error);
                reject(error);
                return false;
              }
            );
          });
        });
      }

      // Return the all the subscriptions
      await QueryDB();
      return return_value;
    },
    setViewed: async (_root, variables, { cache }, _info) => {
      let return_value = true;
      async function QueryDB() {
        return new Promise((resolve, reject) => {
          database.transaction(tx => {
            // Execute sql in transaction
            tx.executeSql(
              SET_READ_FILENUMBER,
              [variables.courtFileNumber],
              (_, result) => {
                resolve(true);
              },
              // On an error, reject the promise
              (_, error) => {
                return_value = false;
                console.log(error);
                reject(error);
                return false;
              }
            );
          });
        });
      }

      // Return the all the subscriptions
      await QueryDB();
      return return_value;
    }
  }
};
