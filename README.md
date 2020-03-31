# React Native Application

> A native application built with React Native

# Package manager (Yarn)
- Refer to this website for the instructions on how to install yarn package manager: https://classic.yarnpkg.com/en/docs/install/#windows-stable

# Info
- expo tabs template has been used as starting point
- uses `@react-navigation/native` for navigation (imported differently from standard docs)
- For UI Component the options currently are:
  - React Native Components (basically the built in ones) [DOCS HERE](https://facebook.github.io/react-native/docs/components-and-apis.html)
  - React Native Paper (external; already in installed) [DOCS HERE](https://callstack.github.io/react-native-paper/getting-started.html)

# Install dependencies
```
yarn global add expo-cli
yarn install
```


# Run 
1. Run `expo start`
2. Open the URL provided
3. Set connection mode to `tunnel` (this mode will require internet)
4. Scan QR Code with expo app on Android or iOS

# To Generate Types
```bash 
apollo client:codegen \
  --excludes=node_modules/* \
  --includes=**/*.tsx \
  --endpoint http://gavelapi.ontariotechu.xyz:8000/graphql/ \
  --target typescript \
  --tagName=gql \
  --outputFlat constants/generated \
  --tsFileExtension=tsx
```
