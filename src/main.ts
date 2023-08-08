import { ApolloServer } from 'apollo-server';
// import { startStandaloneServer } from 'npm:@apollo/server@^4.1/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.listen({port : 8000}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});