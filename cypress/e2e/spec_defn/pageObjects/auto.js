/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const fName = faker.name.firstName();
const lName = faker.name.lastName();

class autoPage {
	elements = {
		topcart: () => cy.get('.dropdown-toggle > .cart_total'),
		topcartCounter: () => cy.get('.dropdown-toggle > .label'),
		checkoutOnTopCart: () => cy.get('.row > :nth-child(2) > .btn > .fa'),
		guestCheckout: () => cy.get('#accountFrm_accountguest'),
		continueOnCheckoutSelection: () => cy.get('#accountFrm > fieldset > .btn'),
		pageTitle: () => cy.get('.maintext'),
		firstName: () => cy.get('#guestFrm_firstname'),
		lastName: () => cy.get('#guestFrm_lastname'),
		email: () => cy.get('#guestFrm_email'),
		phoneNumber: () => cy.get('#guestFrm_telephone'),
		address1: () => cy.get('#guestFrm_address_1'),
		zip: () => cy.get('#guestFrm_postcode'),
		zone: () => cy.get('#guestFrm_zone_id'),
		city: () => cy.get('#guestFrm_city'),
		guestContinueButton: () => cy.get('.col-md-12 > .btn-orange'),
		checkoutConfirmMsg: () => cy.get('.maintext'),
		confirmOrder: () => cy.get('#checkout_btn'),
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
	populatePhone = () => {
		this.elements.phoneNumber().type(faker.phone.number());
	};
	populateAddress1 = () => {
		this.elements.address1().type(faker.address.streetAddress());
	};
	populateCity = () => {
		this.elements.city().type(faker.address.city());
	};
	populateZip = () => {
		this.elements.zip().type(faker.address.zipCode());
	};
	selectZone = () => {
		cy.getRandomNumber1(3513, 3612).then(rand => {
			this.elements.zone().select(`${rand}`);
		});
	};
}

// If you are working with Cypress, it uses ES6 modules,
//so export default new autoPage() is the recommended syntax for exporting the billPage instance.
//module.exports = new autoPage(); // commonJS
export default new autoPage();
