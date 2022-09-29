import { APIGatewayProxyHandler } from 'aws-lambda'
// import 'source-map-support/register'

export const getCard: APIGatewayProxyHandler = async (event,_context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Getting Cards",
        input: event,
      },
      null,
      2
    ),
  };
};