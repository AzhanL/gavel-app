import * as SQLite from "expo-sqlite";
import { createContext } from "react";

// Open the database
export const database = SQLite.openDatabase('gavel.db');

// Create the database context
export const DatabaseContext = createContext(database);

export const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS subscriptions (
  hearing_id PRIMARY KEY,
  file_number VARCHAR(255) NOT NULL,
  viewed BOOLEAN DEFAULT 0
);
`
export const SUBSCRIBE = `
INSERT INTO subscriptions(hearing_id, file_number)
VALUES(?, ?);
`
export const UNSUBSCRIBE = `
DELETE FROM subscriptions 
WHERE file_number = ?;
`
export const SUBSCRIPTIONS = `
SELECT * FROM subscriptions;
`
export const SUBSCRIPTIONS_BY_FILENUMBER = `
SELECT * FROM subscriptions
WHERE file_number = ?;
`