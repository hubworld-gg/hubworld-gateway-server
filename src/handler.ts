import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import HttpClient from './lib/http';

interface AppGraphQLContext {
  userID: String;
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest(params: any) {
    const { request, context } = params;
    // pass the user's id from the context to underlying services
    // as a header called `user-id`
    request.http.headers.set('user-id', context.userID);
  }
}

const getUserId = (token: string): string => token;

const server = new ApolloServer({
  gateway: new ApolloGateway({
    serviceList: [
      { name: 'accounts', url: process.env.ACCOUNTS_FEDERATION_URL },
      { name: 'posts', url: process.env.POSTS_FEDERATION_URL },
      { name: 'games', url: process.env.GAMES_FEDERATION_URL }
    ],
    buildService({ url }) {
      return new AuthenticatedDataSource({ url });
    }
  }),
  subscriptions: false,
  debug: process.env.APP_ENV === 'prod' ? false : true,
  context: ({ event }): AppGraphQLContext => {
    // get the user token from the headers
    let token = undefined;
    if (event && event.headers && event.headers.authorization) {
      token = event.headers.authorization || '';
    }

    // try to retrieve a user with the token
    const userID = getUserId(token);

    // add the user to the context
    return { userID };
  }
});

export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  server.createHandler({
    cors: {
      origin: '*',
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
