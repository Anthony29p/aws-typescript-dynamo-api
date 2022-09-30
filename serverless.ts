import type { AWS } from '@serverless/typescript';

// import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'aws-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    region:'us-east-2',
  },
  // import the function via paths
  functions: { 
    test: {
      handler: 'src/functions/test.test',
      events: [
        {
          http: {
            method: 'get',
            path: 'test',
          }
        }
      ]
    },
    getCard: {
      handler: 'src/functions/getCard.getCard',
      events: [
        {
          http: {
            method: 'get',
            path: 'getCard',
          }
        }
      ]
    },
    postCard: {
      handler: 'src/functions/postCard.postCard',
      events: [
        {
          http: {
            method: 'get',
            path: 'postCard',
          }
        }
      ]
    } 
  },
  resources:{
    Resources: {
      CardsTable:{
        Type: 'AWS::DynamoDB::Table',
        Properties:{
          TableName: "CardsTable",
          KeySchema: [
            {
            AttributeName: "id",
            KeyType: "HASH"
          },
          {
            AttributeName: "card_number",
            KeyType: "RANGE"
          }
          ],
          AttributeDefinitions: [
            {
            AttributeName: "id",
            AttributeType: "S",
            },
            {
              AttributeName: "card_number",
              AttributeType: "N",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
        }
      }
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
