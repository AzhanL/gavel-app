import * as SQLite from "expo-sqlite";
import { createContext } from "react";

// Open the database
export const database = SQLite.openDatabase("gavel.db");

// Create the database context
export const DatabaseContext = createContext(database);

export const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS subscriptions (
  hearing_id PRIMARY KEY,
  file_number VARCHAR(255) NOT NULL,
  viewed BOOLEAN DEFAULT 0 NOT NULL
);
`;
export const ADD_HEARING = `
INSERT INTO
  subscriptions(hearing_id, file_number, viewed)
VALUES
  (?, ?, ?);
`;
export const UNSUBSCRIBE = `
DELETE FROM
  subscriptions 
WHERE 
  file_number = ?;
`;
export const SUBSCRIPTIONS = `
SELECT
  *
FROM
  subscriptions;
`;
export const SUBSCRIPTIONS_BY_FILENUMBER = `
SELECT
  *
FROM 
  subscriptions
WHERE 
  file_number = ?;
`;
// Returns the the file_numbers with how many hearings have not been viewed
export const UNREAD = `
SELECT 
  file_number,
  SUM(viewed)
FROM 
  subscriptions
GROUP BY
  file_number
`;
export const SET_VIEWED_FILENUMBER = `
UPDATE
  subscriptions
SET
  viewed = 1
WHERE
  file_number = ?;
`;
