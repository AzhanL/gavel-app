import { useLinking } from "@react-navigation/native";
import { Linking } from "expo";

export default function(containerRef) {
  return useLinking(containerRef, {
    // Routes pages can be open using gvl:// schema
    // e.g. gvl://home or gvl://hearings or gvl://locations
    // TODO: Not working to 
    prefixes: [Linking.makeUrl("/")],
    config: {
      Root: {
        path: "Root",
        screens: {
          Home: "Home",
          Hearings: "Hearings",
          Locations: "Locations"
        }
      },
      Modals: {
        path: "Modals",
        screens: {
          CourtDetail: 'CourtDetail'
        }
      }
    }
  });
}
