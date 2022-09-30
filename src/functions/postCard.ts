import { APIGatewayProxyHandler } from 'aws-lambda'
const { v4 } = require('uuid');
const AWS = require('aws-sdk')
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const postCard: APIGatewayProxyHandler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let { card_number,cvv,expiration_month,expiration_year,email } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4()

  const token:string =jwt.sign({id},'tokenKey',{expiresIn:15*60*1000})

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
    body: JSON.stringify(newCard),
    headers: {
      'auth-token': token,
    },
  }
  
}


module.exports = {
  postCard,
}