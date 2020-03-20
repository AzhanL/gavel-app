import gql from "graphql-tag";

export const GET_COURTS = gql`
  query {
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
