import { Client } from "@hubspot/api-client";

export default async function getCRMContact(req, res) {

  const hubspotClient = new Client({
    accessToken: process.env.HUBSPOT_APP_KEY
  });

  try {
    const apiResponse = await hubspotClient.crm.contacts.getAll();

    res.send(apiResponse)

  } catch (e) {

    return res.status(500).send({
      status: 400,
      message: "Erro ao obter contato."
    })

  }


}