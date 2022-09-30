// import { APIGatewayProxyHandler } from 'aws-lambda'
// import 'source-map-support/register'

export const test = async (event,_context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v2.0! Your function executed successfully!"
      },
    ),
  };
};
