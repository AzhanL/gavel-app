import { ApolloClient, ApolloClientOptions } from "apollo-boost";
import { CLIENT_TYPEDEFS } from "../constants/graphql";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { resolvers as client_resolvers } from "../constants/resolvers";

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