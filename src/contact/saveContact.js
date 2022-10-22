import { Client } from "@hubspot/api-client";

export default async function createCRMContact(req, res) {

  const hubspotClient = new Client({
    accessToken: process.env.HUBSPOT_APP_KEY
  });

  const SimplePublicObjectInput = { properties: req.body };


  try {

    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
    res.send(apiResponse)

  } catch (e) {

    if (e.body.message) {
      return res.status(400).send({
        status: 400,
        message: "Contato já existente."
      })

    }

    return res.status(500).send({
      status: 400,
      message: "Erro ao cadastrar contato."
    })

  }


}