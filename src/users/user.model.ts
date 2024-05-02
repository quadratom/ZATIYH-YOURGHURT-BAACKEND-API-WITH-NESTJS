import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    dateOfBirth: { type: Date, required: false },
    address: { type: String },
    phoneNumber: { type: String, required: true },

});

export interface Users {
    _id?: string;
    username: string;
    email: string;
    password: string;
    fullname: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
}