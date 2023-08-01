import * as mongodb from "mongodb";
 
export interface Customer {
   name: string;
   address: string;
   _id?: mongodb.ObjectId;
}