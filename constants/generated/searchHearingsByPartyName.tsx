/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchHearingsByPartyName
// ====================================================

export interface searchHearingsByPartyName_hearings {
  __typename: "HearingType";
  courtFileNumber: string;
  title: string;
  partyName: string;
  dateTime: any | null;
  lawyer: string;
  hearingType: string;
}

export interface searchHearingsByPartyName {
  hearings: (searchHearingsByPartyName_hearings | null)[] | null;
}

export interface searchHearingsByPartyNameVariables {
  partyName?: string | null;
}
