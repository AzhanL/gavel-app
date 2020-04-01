import React from "react";
import { View } from "react-native";
import { ProgressBar, Paragraph } from "react-native-paper";

export function TopLoadingBar() {
  return (
    <View>
      <ProgressBar indeterminate={true} color="#20272F" />
    </View>
  );
}
