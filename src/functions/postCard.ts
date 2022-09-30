import { APIGatewayProxyHandler } from 'aws-lambda'
import * as validations from '../validations/cardValidation';
const { v4 } = require('uuid');
const AWS = require('aws-sdk')
const jwt =  require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const postCard: APIGatewayProxyHandler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let { card_number,cvv,expiration_month,expiration_year,email } = JSON.parse(event.body);

  const date = new Date();
  let createdAt = date.toString()

  const id = v4()
  const token:string =jwt.sign({id},'tokenKey',{expiresIn:15*60*1000})

  let error:string = 'error at';
  if(!validations.cardValidation(card_number)){error +=' card_number'}
  if(!validations.cvvValidation(cvv)){error +=' cvv'}
  if(!validations.monthValidation(expiration_month)){error +=' expiration_month'}
  if(!validations.yearValidation(expiration_year)){error +=' expiration_year'}
  
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


  if(error==='error at'){
    return{
      statusCode: 200,
      body: JSON.stringify(newCard),
      headers: {
        'auth-token': token,
      },
    }
  } 
  else{
    return{
      statusCode: 400,
      body: JSON.stringify(error),
      
    }
  }
}


module.exports = {
  postCard,
}