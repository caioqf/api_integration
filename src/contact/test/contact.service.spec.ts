import ContactService from '../contact.service'
import SheetService from "../../sheet/sheet.service";
import { Client } from "@hubspot/api-client";


describe("Contact Service", () => {

	const sheetService = new SheetService()
	const client = new Client()
	const contactService = new ContactService(sheetService, client)

	describe('validateEmail function', () => {
		it('should return false given an public domain email', () => {
			// arrange 


			//act 
			const isEmailValid = contactService.validateEmail('teste@gmail.com')

			//assert
			expect(isEmailValid).toBe(false)

		})

		it('should return true given a not public domain email', () => {
			// arrange 


			//act 
			const isEmailValid = contactService.validateEmail('teste@privatedomain.com')

			//assert
			expect(isEmailValid).toBe(true)

		})
	})

})