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
  unread BOOLEAN DEFAULT 1 NOT NULL
);
`;
export const ADD_HEARING = `
INSERT INTO
  subscriptions(hearing_id, file_number, unread)
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
// Returns the the file_numbers with how many hearings have not been unread
export const GET_UNREAD = `
SELECT 
  file_number,
  SUM(unread) as unread_count
FROM 
  subscriptions
GROUP BY
  file_number
`;
export const SET_UNREAD_FILENUMBER = `
UPDATE
  subscriptions
SET
  unread = 1
WHERE
  file_number = ?;
`;
export const SET_READ_FILENUMBER = `
UPDATE
  subscriptions
SET
  unread = 0
WHERE
  file_number = ?;
`;
