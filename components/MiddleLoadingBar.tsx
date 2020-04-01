import React, { useState } from "react";
import { View } from "react-native";
import { ProgressBar, Paragraph } from "react-native-paper";

export function MiddleLoadingBar() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 70 }}>
      <ProgressBar indeterminate={true} color="#20272F" />
      <Paragraph>Loading...</Paragraph>
    </View>
  );
}
