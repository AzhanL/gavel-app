import gql from "graphql-tag";

// ClientHearingType - is the row in the SQLite DB that returns the
export const CLIENT_TYPEDEFS = gql`
  type ClientDBHearingType {
    id: ID!
    courtFileNumber: String!
    viewed: Boolean!
  }
  extend type Mutation {
    subscribeHearing(courtFileNumber: String!, hearingID: Int): Boolean!
    unsubscribeHearing(courtFileNumber: String!): Boolean!
  }
  extend type Query {
    subscriptions(courtFileNumber: String): [ClientDBHearingType]
    isSubscribedTo(courtFileNumber: String!): Boolean!
  }
`;

export const SUBSCRIBE_HEARING = gql`
  mutation SubscribeHearing($courtFileNumber: String!, $hearingID: Int!) {
    subscribeHearing(courtFileNumber: $courtFileNumber, hearingID: $hearingID)
      @client
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
      viewed
    }
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
