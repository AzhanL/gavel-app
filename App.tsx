import * as Font from "expo-font";
import gavelapptheme from "./native-base-theme/variables/gavelapp.js";
import getTheme from "./native-base-theme/components";
import MainMenuNavigator from "./navigation/BottomNavigator";
import ModalNavigator from "./navigation/ModalNavigator";
import React, { useEffect } from "react";
import useLinking from "./navigation/useLinking";
import { ApolloClient, ApolloClientOptions } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-common";
import { CLIENT_TYPEDEFS } from "./constants/graphql";
import { CREATE_TABLES, database, DatabaseContext } from "./constants/database";
import { createStackNavigator } from "@react-navigation/stack";
import { GavelPaperTheme } from "./styles/PaperThemeConfig";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { myconfig } from "./navigation/ModalNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { resolvers as client_resolvers } from "./constants/resolvers";
import { SplashScreen } from "expo";
import { StyleProvider } from "native-base";
import { StyleSheet, Text } from "react-native";
import "./components/HearingNotification"

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
const _ApolloClientOptions: ApolloClientOptions<NormalizedCacheObject> = {
  link: _ApolloLink,
  cache: _InMemoryCache,
  resolvers: client_resolvers,
  typeDefs: CLIENT_TYPEDEFS
};
// Create the apollo client
export const _ApolloClient = new ApolloClient(_ApolloClientOptions);

// Entry App
export default function App(props) {
  const [initialNavigationState, setInitialNavigationState] = React.useState(
    null
  );
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
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

        // Create Tables
        database.transaction(transaction => {
          transaction.executeSql(
            CREATE_TABLES,
            undefined,
            () => console.log("Successfully created SQLite database"),
            error => {
              console.log(error);
              return false;
            }
          );
        });
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
      <DatabaseContext.Provider value={database}>
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
      </DatabaseContext.Provider>
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
