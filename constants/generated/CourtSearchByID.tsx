/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CourtCourtBranch, CourtCourtType, CourtCourtSpecialization, LocationProvince, OperationalDayWeekDay } from "./globalTypes";

// ====================================================
// GraphQL query operation: CourtSearchByID
// ====================================================

export interface CourtSearchByID_courts_locations_operationalDays_timeSlots {
  __typename: "TimeSlotType";
  openTime: any;
  closeTime: any;
}

export interface CourtSearchByID_courts_locations_operationalDays {
  __typename: "OperationalDaysType";
  weekDay: OperationalDayWeekDay;
  timeSlots: CourtSearchByID_courts_locations_operationalDays_timeSlots[];
}

export interface CourtSearchByID_courts_locations {
  __typename: "LocationType";
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string | null;
  city: string;
  province: LocationProvince;
  phoneNumber: string;
  faxNumber: string;
  operationalDays: CourtSearchByID_courts_locations_operationalDays[];
}

export interface CourtSearchByID_courts {
  __typename: "CourtType";
  id: string;
  name: string;
  courtBranch: CourtCourtBranch;
  courtType: CourtCourtType;
  courtSpecialization: CourtCourtSpecialization;
  locations: CourtSearchByID_courts_locations[];
}

export interface CourtSearchByID {
  courts: (CourtSearchByID_courts | null)[] | null;
}

export interface CourtSearchByIDVariables {
  CourtID?: number | null;
}
