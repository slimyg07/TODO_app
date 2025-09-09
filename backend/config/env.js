import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV}.local`});

export const MONGO_URI = process.env.MONGO_URI ;
export const PORT = process.env.PORT || 3000;
