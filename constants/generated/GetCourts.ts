/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CourtCourtBranch, CourtCourtType, CourtCourtSpecialization, LocationProvince, OperationalDayWeekDay } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCourts
// ====================================================

export interface GetCourts_courts_locations_operationalDays_timeSlots {
  __typename: "TimeSlotType";
  openTime: any;
  closeTime: any;
}

export interface GetCourts_courts_locations_operationalDays {
  __typename: "OperationalDaysType";
  weekDay: OperationalDayWeekDay;
  timeSlots: GetCourts_courts_locations_operationalDays_timeSlots[];
}

export interface GetCourts_courts_locations {
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
  operationalDays: GetCourts_courts_locations_operationalDays[];
}

export interface GetCourts_courts {
  __typename: "CourtType";
  name: string;
  courtBranch: CourtCourtBranch;
  courtType: CourtCourtType;
  courtSpecialization: CourtCourtSpecialization;
  locations: GetCourts_courts_locations[];
}

export interface GetCourts {
  courts: (GetCourts_courts | null)[] | null;
}
