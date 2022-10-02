import mongoose from 'mongoose';
const { Schema } = mongoose;

export const blogSchema = new Schema({ name: String })