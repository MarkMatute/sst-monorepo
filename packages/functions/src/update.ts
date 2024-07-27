import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Util } from "@sst-monorepo/core/util";
import { Resource } from "sst";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const params = {
    TableName: Resource.Notes.name,
    Key: {
      userId: "123",
      noteId: event?.pathParameters?.id,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
  };

  await dynamoDb.send(new UpdateCommand(params));

  return JSON.stringify({ status: true });
});