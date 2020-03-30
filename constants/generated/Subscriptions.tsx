/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Subscriptions
// ====================================================

export interface Subscriptions_subscriptions {
  __typename: "ClientDBHearingType";
  id: string;
  courtFileNumber: string;
  viewed: boolean;
}

export interface Subscriptions {
  subscriptions: (Subscriptions_subscriptions | null)[] | null;
}

export interface SubscriptionsVariables {
  courtFileNumber?: string | null;
}
