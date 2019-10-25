import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda';

import { resolvers, typeDefs } from './graphql';
import DynamoClient from './lib/dynamo';
import HttpClient from './lib/http';

export interface AppUserContext {
  username: string;
  email: string;
}

export interface AppGraphQLEvent extends APIGatewayProxyEvent {
  user: AppUserContext;
}

export interface AppGraphQLContext {
  dynamoClient: DynamoClient;
  user: AppUserContext;
}

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  debug: process.env.APP_ENV === 'prod' ? false : true,
  context: ({
    event,
    context
  }: {
    event: AppGraphQLEvent;
    context: AppGraphQLContext;
  }): AppGraphQLContext => {
    return {
      dynamoClient: new DynamoClient(),
      user: event.user
    };
  }
});

export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  if (
    event.headers &&
    event.headers['Content-Type'] &&
    event.headers['Content-Type'] === 'application/graphql'
  ) {
    event.body = JSON.stringify({ query: event.body });
  }

  server.createHandler({
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true
    }
  })(event, context, (err: any, data: any) => {
    if (err) {
      HttpClient.sendErrorResponse(err, callback);
    } else {
      callback(null, data);
    }
  });
};
