import gql from "graphql-tag";

// ClientHearingType - is the row in the SQLite DB that returns the
export const CLIENT_TYPEDEFS = gql`
  type ClientDBHearingType {
    id: ID!
    courtFileNumber: String!
    unread: Boolean!
  }
  type CountType {
    courtFileNumber: String!
    itemCount: Int!
  }
  extend type Mutation {
    addHearing(hearings: [ClientDBHearingType!]!): Boolean!
    unsubscribeHearing(courtFileNumber: String!): Boolean!
    setViewed(courtFileNumber: String!): Boolean!
  }
  extend type Query {
    subscriptions(courtFileNumber: String): [ClientDBHearingType]
    isSubscribedTo(courtFileNumber: String!): Boolean!
    getUnread: [CountType]
    getHearingCount: [CountType]
  }
`;

export const ADD_HEARING = gql`
  mutation AddHearings($hearings: [ClientDBHearingType!]!) {
    addHearing(hearings: $hearings) @client
  }
`;
export const UNSUBSCRIBE_HEARING = gql`
  mutation UnsubscribeHearing($courtFileNumber: String!) {
    unsubscribeHearing(courtFileNumber: $courtFileNumber) @client
  }
`;
export const SUBSCRIPTIONS = gql`
  query Subscriptions($courtFileNumber: String) {
    subscriptions(courtFileNumber: $courtFileNumber) @client {
      id
      courtFileNumber
      unread
    }
  }
`;
export const GET_UNREAD = gql`
  query GetUnread {
    getUnread @client {
      courtFileNumber
      itemCount
    }
  }
`;
export const GET_HEARING_COUNT = gql`
  query GetHearingCount {
    getHearingCount @client {
      courtFileNumber
      itemCount
    }
  }
`;
export const SET_VIEWED = gql`
  mutation SetViewed($courtFileNumber: String!) {
    setViewed(courtFileNumber: $courtFileNumber) @client
  }
`;
export const IS_SUBSCRIBED_TO = gql`
  query IsSubscribedTo($courtFileNumber: String!) {
    isSubscribedTo(courtFileNumber: $courtFileNumber) @client
  }
`;
export const GET_COURTS = gql`
  query GetCourts {
    courts {
      name
      courtBranch
      courtType
      courtSpecialization
      locations {
        id
        name
        addressLine1
        addressLine2
        postalCode
        city
        province
        phoneNumber
        faxNumber
        operationalDays {
          weekDay
          timeSlots {
            openTime
            closeTime
          }
        }
      }
    }
  }
`;

export const COURT_SEARCH_BY_ID = gql`
  query CourtSearchByID($CourtID: Int) {
    courts(courtId: $CourtID) {
      id
      name
      courtBranch
      courtType
      courtSpecialization
      locations {
        id
        name
        addressLine1
        addressLine2
        postalCode
        city
        province
        phoneNumber
        faxNumber
        operationalDays {
          weekDay
          timeSlots {
            openTime
            closeTime
          }
        }
      }
    }
  }
`;

export const SEARCH_HEARINGS_BY_PARTYNAME = gql`
  query SearchHearingsByPartyName($partyName: String) {
    hearings(partyName: $partyName) {
      id
      courtFileNumber
      title
      partyName
      dateTime
      dateTimeOffset
      lawyer
      hearingType
      room {
        id
      }
      court {
        name
        id
      }
    }
  }
`;

export const SEARCH_HEARINGS_BY_FILENUMBER = gql`
  query SearchHearingsByCourtFileNumber($courtFileNumber: String) {
    hearings(fileNumber: $courtFileNumber) {
      id
      courtFileNumber
      title
      partyName
      dateTime
      dateTimeOffset
      lawyer
      hearingType
      room {
        id
      }
      court {
        name
        id
      }
    }
  }
`;

export const SEARCH_HEARINGS_BY_FILENUMBER_NOTIFICATION = gql`
  query SearchHearingsByCourtFileNumberForNotification($courtFileNumber: String) {
    hearings(fileNumber: $courtFileNumber) {
      id
      courtFileNumber
    }
  }
`;
