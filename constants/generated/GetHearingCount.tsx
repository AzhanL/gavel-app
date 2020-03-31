/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHearingCount
// ====================================================

export interface GetHearingCount_getHearingCount {
  __typename: "CountType";
  courtFileNumber: string;
  itemCount: number;
}

export interface GetHearingCount {
  getHearingCount: (GetHearingCount_getHearingCount | null)[] | null;
}
