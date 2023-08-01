import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const customerRouter = express.Router();
customerRouter.use(express.json());
 
customerRouter.get("/", async (_req, res) => {
   try {
       const customers = await collections.customers.find({}).toArray();
       res.status(200).send(customers);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

customerRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const customer = await collections.customers.findOne(query);
  
        if (customer) {
            res.status(200).send(customer);
        } else {
            res.status(404).send(`Failed to find an customer: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an customer: ID ${req?.params?.id}`);
    }
 });

 customerRouter.post("/", async (req, res) => {
    try {
        const customer = req.body;
        const result = await collections.customers.insertOne(customer);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new customer: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new customer.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 customerRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const customer = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.customers.updateOne(query, { $set: customer });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an customer: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an customer: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an customer: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 customerRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.customers.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an customer: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an customer: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an customer: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

