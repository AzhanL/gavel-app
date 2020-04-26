/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUnread
// ====================================================

export interface GetUnread_getUnread {
  __typename: "CountType";
  courtFileNumber: string;
  itemCount: number;
}

export interface GetUnread {
  getUnread: (GetUnread_getUnread | null)[] | null;
}
