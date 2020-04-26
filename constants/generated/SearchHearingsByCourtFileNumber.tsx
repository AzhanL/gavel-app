/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CourtCourtBranch, CourtCourtType, CourtCourtSpecialization, LocationProvince, OperationalDayWeekDay } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchHearingsByCourtFileNumber
// ====================================================

export interface SearchHearingsByCourtFileNumber_hearings_room {
  __typename: "RoomType";
  id: string;
}

export interface SearchHearingsByCourtFileNumber_hearings_court_locations_operationalDays_timeSlots {
  __typename: "TimeSlotType";
  openTime: any;
  closeTime: any;
}

export interface SearchHearingsByCourtFileNumber_hearings_court_locations_operationalDays {
  __typename: "OperationalDaysType";
  weekDay: OperationalDayWeekDay;
  timeSlots: SearchHearingsByCourtFileNumber_hearings_court_locations_operationalDays_timeSlots[];
}

export interface SearchHearingsByCourtFileNumber_hearings_court_locations {
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
  operationalDays: SearchHearingsByCourtFileNumber_hearings_court_locations_operationalDays[];
}

export interface SearchHearingsByCourtFileNumber_hearings_court {
  __typename: "CourtType";
  id: string;
  name: string;
  courtBranch: CourtCourtBranch;
  courtType: CourtCourtType;
  courtSpecialization: CourtCourtSpecialization;
  locations: SearchHearingsByCourtFileNumber_hearings_court_locations[];
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
