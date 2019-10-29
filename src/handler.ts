import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway } from '@apollo/gateway';
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
  gateway: new ApolloGateway({
    serviceList: [{ name: 'accounts', url: 'http://localhost:4001/api' }]
  }),
  subscriptions: false,
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
      user: {
        username: 'liam',
        email: 'email.com'
      }
    };
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
