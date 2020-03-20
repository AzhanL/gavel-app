import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const CustomStatusBarStyles = StyleSheet.create({
  statusBarPadding: {
    height: Constants.statusBarHeight,
    backgroundColor: "#1f262e"
  }
});
