import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CourtDetailScreen from "../screens/CourtDetailScreen";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

const ModalStack = createStackNavigator();

export const myconfig: TransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01
  }
};
export default function ModalNavigator({ navigation, route }) {
  return (
    <ModalStack.Navigator
      screenOptions={{
        gestureDirection: "horizontal",
        transitionSpec: {
          open: myconfig,
          close: myconfig
        }
      }}
      headerMode="none"
    >
      <ModalStack.Screen
        name="CourtDetail"
        component={CourtDetailScreen}
        options={{ title: route.params.name }}
      />
      <ModalStack.Screen
        name="Hearing Detail"
        component={CourtDetailScreen}
        options={{ title: route.params.name }}
      />
    </ModalStack.Navigator>
  );
}
