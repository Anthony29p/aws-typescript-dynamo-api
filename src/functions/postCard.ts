import { APIGatewayProxyHandler } from 'aws-lambda'
const { v4 } = require('uuid');
const AWS = require('aws-sdk')

const postCard: APIGatewayProxyHandler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { card_number,cvv,expiration_month,expiration_year,email } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4()

  const newCard = {
    id,
    card_number,
    cvv,
    expiration_month,
    expiration_year,
    email,
    createdAt,
  }

  await dynamodb
  .put({
    TableName: "CardsTable",
    Item: newCard
  })
  .promise()

  return{
    statusCode: 200,
    body: JSON.stringify(newCard)
  }
  
}


module.exports = {
  postCard,
}