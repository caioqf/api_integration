import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { Client } from "@hubspot/api-client";
import ContactService from "./contact/contact.service.js";
import SheetService from "./sheet/sheet.service.js";

const API_PORT = process.env.API_PORT;

const app = express();

const hubspotClient = new Client({
	accessToken: process.env.HUBSPOT_APP_KEY
});

const sheetService = new SheetService();
const contactService = new ContactService(hubspotClient, sheetService);

app.use(cors());
app.use(bodyParser.json());


app.get("/contact", async (req, res) => {
	const contacts = await contactService.getContacts();
	res.send(contacts);
});

app.post("/contact", async (req, res) => {
	const contato = await contactService.saveContact(req.body);
	res.send(contato);
});

app.post("/contact/import/:sheetID", async (req, res) => {
	const contato = await contactService.import(req.params.sheetID);
	res.status(contato.status).send(contato);
});



app.get("/sheet/:id", async (req, res) => {
	const data = await sheetService.getSheet(req.params.id);
	res.send(data);
});


app.listen(API_PORT, () => {
	console.log(`Listening on port ${API_PORT}`);
});

