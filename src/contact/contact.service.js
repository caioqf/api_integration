export default class ContactService {

	constructor(hubspotClient, sheetsService) {
		this.hubspotClient = hubspotClient;
		this.sheetService = sheetsService;
	}
	async getContacts() {

		try {
			const apiResponse = await this.hubspotClient.crm.contacts.getAll();

			return apiResponse;

		} catch (e) {

			console.log(e);

			return {
				status: 400,
				message: "Erro ao obter contato."
			};

		}

	}

	async saveContact(contactData) {

		try {

			const SimplePublicObjectInput = { properties: contactData };

			const apiResponse = await this.hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);

			return apiResponse;

		} catch (e) {
			return {
				status: e.code,
				message: e.body.message
			};

		}

	}

	async import(sheetId) {
		try {

			const sheet = await this.sheetService.getSheet(sheetId);

			const parsedSheet = await this.sheetService.parseSheet(sheet.values);

			let errors = [];

			for (let contact of parsedSheet) {

				const isEmailValid = this.validateEmail(contact.email);

				if (isEmailValid === false) {
					errors.push({
						status: 400,
						message: "Invalid email. Corporative emails only.",
						email: contact.email
					});
					continue;
				}

				const saved = await this.saveContact(contact);

				// adicionando contatos ja cadastrados anteriormente num array para informar 
				if (saved.status === 409) {
					errors.push({
						status: 400,
						message: "Repeated email",
						email: contact.email
					});
				}
			}

			if (errors.length > 0) {
				return {
					status: 400,
					message: "Error while saving the following emails",
					data: errors
				};
			}

			return {
				status: 200,
				message: "Saved."
			};

		} catch (error) {
			console.log(error);
			return {
				status: 500,
				message: "Unexpected error."
			};
		}
	}

	validateEmail(email) {

		// domonios publicos comuns, mas provavelmente existe algum serviço verificador pra isso
		// que consegue cobrir a maior parte dos casos
		const invalidDomains = [
			"gmail",
			"yahoo",
			"outlook",
		];

		//Capturar o dominio
		let domain = email.split("@");
		domain = domain[1].split(".")[0];

		if (invalidDomains.includes(domain)) return false;

		return true;
	}
}