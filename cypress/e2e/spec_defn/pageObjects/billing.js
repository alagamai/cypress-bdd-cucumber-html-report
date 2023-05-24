/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const fName = faker.name.firstName();
const lName = faker.name.lastName();

class billPage {
	elements = {
		firstName: () => cy.get('#BillingNewAddress_FirstName'),
		lastName: () => cy.get('#BillingNewAddress_LastName'),
		email: () => cy.get('#BillingNewAddress_Email'),
		countryId: () => cy.get('#BillingNewAddress_CountryId'),
		state: () => cy.get('#BillingNewAddress_StateProvinceId'),
		address1: () => cy.get('#BillingNewAddress_Address1'),
		zip: () => cy.get('#BillingNewAddress_ZipPostalCode'),
		city: () => cy.get('#BillingNewAddress_City'),
		phoneNumber: () => cy.get('#BillingNewAddress_PhoneNumber'),
		billingContinueButton: () =>
			cy.get('#billing-buttons-container > .new-address-next-step-button'),
		shippingContinueButton: () =>
			cy.get(
				'#shipping-method-buttons-container > .shipping-method-next-step-button'
			),
		shippingOption2: () => cy.get('#shippingoption_2'),
		paymentContinueButton: () =>
			cy.get('#payment-method-buttons-container > .button-1'),
		paymentInfoButton: () =>
			cy.get('#payment-info-buttons-container > .button-1'),
		paymentInfoContinueButton: () =>
			cy.get('#payment-info-buttons-container > .button-1'),
		confirmOrderContinueButton: () =>
			cy.get('#confirm-order-buttons-container > .button-1'),
		checkoutCompletedMsg: () => cy.get('.section > .title > strong'),
	};

	populateFirstName = () => {
		this.elements.firstName().type(fName);
	};
	populateLastName = () => {
		this.elements.lastName().type(lName);
	};
	populateEmail = () => {
		this.elements.email().type(faker.internet.email(fName, lName));
	};
	selectCountry = () => {
		this.elements.countryId().select('United States');
	};
	selectState = () => {
		this.elements.state().select('Florida');
	};
	populateAddress1 = () => {
		this.elements.address1().type(faker.address.streetAddress());
	};
	populateZip = () => {
		this.elements.zip().type(faker.address.zipCode());
	};
	populateCity = () => {
		this.elements.city().type(faker.address.city());
	};
	populatePhone = () => {
		this.elements.phoneNumber().type(faker.phone.number());
	};
}

// If you are working with Cypress, it uses ES6 modules,
//so export default new billPage() is the recommended syntax for exporting the billPage instance.
//module.exports = new billPage(); // commonJS
export default new billPage();
