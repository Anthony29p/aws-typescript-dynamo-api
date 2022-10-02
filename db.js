// import {connect} from "mongoose";
const { connect } = require('mongoose');

const MONGO_USER='mongoUser'
const MONGO_PASSWORD='gatoconbotas'
const MONGO_HOST='clustertest.y3v9vzi.mongodb.net'
const DB_NAME='Muestra-02'

const pepito = () => {
  console.log('perro')
  connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${DB_NAME}`,(error) => {
    error?console.log("********Connection Error********"):console.log("********Connected********")
  })

}

pepito()
console.log('gato')