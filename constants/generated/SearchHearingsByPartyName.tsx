/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchHearingsByPartyName
// ====================================================

export interface SearchHearingsByPartyName_hearings_room {
  __typename: "RoomType";
  id: string;
}

export interface SearchHearingsByPartyName_hearings_court {
  __typename: "CourtType";
  name: string;
  id: string;
}

export interface SearchHearingsByPartyName_hearings {
  __typename: "HearingType";
  id: string;
  courtFileNumber: string;
  title: string;
  partyName: string;
  dateTime: any | null;
  dateTimeOffset: string;
  lawyer: string;
  hearingType: string;
  room: SearchHearingsByPartyName_hearings_room | null;
  court: SearchHearingsByPartyName_hearings_court | null;
}

export interface SearchHearingsByPartyName {
  hearings: (SearchHearingsByPartyName_hearings | null)[] | null;
}

export interface SearchHearingsByPartyNameVariables {
  partyName?: string | null;
}
