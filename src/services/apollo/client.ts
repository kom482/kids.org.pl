import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { PrismicLink } from "apollo-link-prismic";
import config from "services/config";
import introspectionQueryResultData from "./fragmentTypes";

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const client = new ApolloClient({
    link: PrismicLink({
        uri: config.graphqlEndpoint,
    }),
    cache: new InMemoryCache({ fragmentMatcher }),
});

export default client;
