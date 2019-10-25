import AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export enum AppDynamoTables {
  users = 'HubUsers'
}

export default class DynamoClient {
  docClientInstance?: AWS.DynamoDB.DocumentClient;

  get docClient(): AWS.DynamoDB.DocumentClient {
    if (!this.docClientInstance) {
      this.docClientInstance = new AWS.DynamoDB.DocumentClient({
        maxRetries: 1,
        httpOptions: { connectTimeout: 200 }
      });
    }
    return this.docClientInstance;
  }

  getDynamoResponse(
    data:
      | PromiseResult<AWS.DynamoDB.DocumentClient.QueryOutput, AWS.AWSError>
      | PromiseResult<AWS.DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError>
  ): any | any[] {
    if (DynamoClient.isDynamoItems(data)) {
      return data.Items;
    } else if (DynamoClient.isDynamoItem(data)) {
      return data.Item;
    }

    return;
  }

  static isDynamoItems = (
    data: any
  ): data is PromiseResult<
    AWS.DynamoDB.DocumentClient.QueryOutput,
    AWS.AWSError
  > => data.Items || false;

  static isDynamoItem = (
    data: any
  ): data is PromiseResult<
    AWS.DynamoDB.DocumentClient.GetItemOutput,
    AWS.AWSError
  > => data.Item || false;
}
