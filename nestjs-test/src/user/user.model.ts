import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema
(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true }
    }
)

export interface User
{
    id: string,
    username: string,
    email: string,
    phone: number,
    skillsets: string,
    hobby: string
}