import gql from "graphql-tag";

export const GET_COURTS = gql`
  query GetCourts{
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

export const SEARCH_HEARINGS_BY_PARTYNAME = gql`
  query searchHearingsByPartyName($partyName: String) {
    hearings(partyName: $partyName) {
      id
      courtFileNumber
      title
      partyName
      dateTime
      lawyer
      hearingType
    }
  }
`;
