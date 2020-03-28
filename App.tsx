import React from "react";
import { StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenuNavigator from "./navigation/BottomNavigator";
import ModalNavigator from "./navigation/ModalNavigator";
import { ApolloProvider } from "@apollo/react-common";
import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import useLinking from "./navigation/useLinking";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import getTheme from "./native-base-theme/components";
import gavelapptheme from "./native-base-theme/variables/gavelapp.js";
import { StyleProvider } from "native-base";
import { myconfig } from "./navigation/ModalNavigator";

import { Provider as PaperProvider } from "react-native-paper";
import { GavelPaperTheme } from "./styles/PaperThemeConfig";
const RootStack = createStackNavigator();

// Create ApolloHttpLink object
const _ApolloLink = new HttpLink({
  uri: "http://gavelapi.ontariotechu.xyz:8000/graphql/"
});
// Create InMemoryCacheConfigs
const _InMemoryCacheConfig = {};
// Create InMemoryCache
const _InMemoryCache = new InMemoryCache(_InMemoryCacheConfig);

// Create apollo client options
const _ApolloClientOptions = {
  link: _ApolloLink,
  cache: _InMemoryCache
};
// Create the apollo client
const _ApolloClient = new ApolloClient(_ApolloClientOptions);

// Entry App
export default function App(props) {
  const [initialNavigationState, setInitialNavigationState] = React.useState(
    null
  );
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialCommunityIcons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });

        // Create
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
        <PaperProvider theme={GavelPaperTheme}>
          <StyleProvider style={getTheme(gavelapptheme)}>
            <ApolloProvider client={_ApolloClient}>
              <NavigationContainer
                ref={containerRef}
                initialState={initialNavigationState}
              >
                <RootStack.Navigator
                  mode="card"
                  headerMode="none"
                  initialRouteName="Root"
                  screenOptions={{
                    gestureDirection: "horizontal",
                    transitionSpec: {
                      open: myconfig,
                      close: myconfig
                    }
                  }}
                >
                  <RootStack.Screen name="Root" component={MainMenuNavigator} />
                  <RootStack.Screen name="Modals" component={ModalNavigator} />
                </RootStack.Navigator>
              </NavigationContainer>
            </ApolloProvider>
          </StyleProvider>
        </PaperProvider>
    );
  }
}

function MainMenu() {
  return <Text>Menu</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
