// import { connect } from "http2";
// import mongoose from "mongoose";
import { connectDataBase } from "src/database";

export const mongoTest = async (event,_context) => {
  
  const doc = await connectDataBase(_context)

  return {
    statusCode: 200,
    body: JSON.stringify(doc),
  };
};
  