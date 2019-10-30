import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import HttpClient from './lib/http';

export interface AppUserContext {
  username: string;
  email: string;
}

export interface AppGraphQLContext {
  userId: String;
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest(params: any) {
    const { request, context } = params;
    // pass the user's id from the context to underlying services
    // as a header called `user-id`
    request.http.headers.set('user-id', context.userId);
  }
}

// const getUserId = (token: string): string => token;

const server = new ApolloServer({
  gateway: new ApolloGateway({
    serviceList: [
      { name: 'accounts', url: 'http://localhost:4001/api' }
      // { name: 'posts', url: 'http://localhost:4002/api' }
    ],
    buildService({ url }) {
      return new AuthenticatedDataSource({ url });
    }
  }),
  subscriptions: false,
  debug: process.env.APP_ENV === 'prod' ? false : true,
  context: ({ req }): AppGraphQLContext => {
    // // get the user token from the headers
    // const token = req.headers.authorization || '';

    // // try to retrieve a user with the token
    // const userId = getUserId(token);

    // add the user to the context
    return { userId: 'my-user' };
  }
});

export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
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
