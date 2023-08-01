import * as mongodb from "mongodb";
import { Customer } from "./customer";
 
export const collections: {
   customers?: mongodb.Collection<Customer>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("meanStackExample");
   await applySchemaValidation(db);
 
   const customersCollection = db.collection<Customer>("customers");
   collections.customers = customersCollection;
}
 
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name", "address"],
           additionalProperties: false,
           properties: {
               _id: {},
               name: {
                   bsonType: "string",
                   description: "'name' is required and is a string",
               },
               address: {
                   bsonType: "string",
                   description: "'address' is required and is a string",
                   minLength: 5
               },
           },
       },
   };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "customers",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("customers", {validator: jsonSchema});
       }
   });
}