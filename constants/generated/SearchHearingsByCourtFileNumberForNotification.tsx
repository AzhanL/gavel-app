/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchHearingsByCourtFileNumberForNotification
// ====================================================

export interface SearchHearingsByCourtFileNumberForNotification_hearings {
  __typename: "HearingType";
  id: string;
  courtFileNumber: string;
}

export interface SearchHearingsByCourtFileNumberForNotification {
  hearings: (SearchHearingsByCourtFileNumberForNotification_hearings | null)[] | null;
}

export interface SearchHearingsByCourtFileNumberForNotificationVariables {
  courtFileNumber?: string | null;
}
