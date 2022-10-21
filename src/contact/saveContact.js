import { Client } from "@hubspot/api-client";

export default async function createCRMContact(req, res) {
  const hubspotClient = new Client({
    accessToken: process.env.HUBSPOT_APP_KEY
  });
  console.log(req);
  const SimplePublicObjectInput = { properties: req.body };

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
    res.send(apiResponse)

  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }


}