/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchHearingsByCourtFileNumber
// ====================================================

export interface SearchHearingsByCourtFileNumber_hearings_room {
  __typename: "RoomType";
  id: string;
}

export interface SearchHearingsByCourtFileNumber_hearings_court {
  __typename: "CourtType";
  name: string;
  id: string;
}

export interface SearchHearingsByCourtFileNumber_hearings {
  __typename: "HearingType";
  id: string;
  courtFileNumber: string;
  title: string;
  partyName: string;
  dateTime: any | null;
  dateTimeOffset: string;
  lawyer: string;
  hearingType: string;
  room: SearchHearingsByCourtFileNumber_hearings_room | null;
  court: SearchHearingsByCourtFileNumber_hearings_court | null;
}

export interface SearchHearingsByCourtFileNumber {
  hearings: (SearchHearingsByCourtFileNumber_hearings | null)[] | null;
}

export interface SearchHearingsByCourtFileNumberVariables {
  courtFileNumber?: string | null;
}
