import { APIGatewayProxyHandler } from 'aws-lambda'

const AWS = require("aws-sdk");

export const getCard: APIGatewayProxyHandler = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan({ TableName: "CardsTable" }).promise();
  const card = result.Items;

  return {
    statusCode: 200,
    body: JSON.stringify({card}),
  };
};