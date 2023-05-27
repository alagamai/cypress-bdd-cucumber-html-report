/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const prodList = require('../../../fixtures/product.json');

import autoPage from '../pageObjects/auto';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import 'cypress-localstorage-commands';
let custId = 0;

beforeEach(() => {
	if (custId != 0) {
		cy.saveRestoreCartItems(custId);
		cy.visit('https://automationteststore.com/');
	}
});

Given('I am on automation store home page', () => {
	cy.visit('https://automationteststore.com/');
});

When('I select product 1 and add to cart', () => {
	cy.selectProduct('Absolue Eye Precious Cells');
});

When('I select product 2 and add to cart', () => {
	cy.selectProduct('Womens high heel point toe stiletto sandals');
});

When('I select product 3 and add to cart', () => {
	cy.selectProduct('Total Moisture Facial Cream');
});

Then('I should see 3 items on item cart', () => {
	cy.get('.topcart .dropdown-toggle > .label-orange').should('have.text', '3');
});

When('I add products to cart from home page', () => {
	cy.getCookies().then(cookies => {
		cy.log(`customer id **** :  ${cookies[2].value}`);
		custId = cookies[2].value;
		console.log(`this cust id **** :${custId}`);
		cy.saveRestoreCartItems(cookies[2].value);
	});
});

Then('I should see correct item counter on item cart', () => {
	cy.visit('https://automationteststore.com/');

	autoPage.elements
		.topcartCounter()
		.should('have.text', `${prodList.products.length}`);
});

When('I click on checkout button', () => {
	autoPage.elements.topcart().trigger('mouseover');
	autoPage.elements.checkoutOnTopCart().click();
});

When('I click on checkout option as Guest checkout', () => {
	autoPage.elements.guestCheckout().check();
});

When('I click on continue', () => {
	autoPage.elements.continueOnCheckoutSelection().click();
});

Then('I should be redirected to guest step 1 page', () => {
	autoPage.elements.pageTitle().should('have.text', 'Guest Checkout - Step 1');
});

Given('I am on automation store checkout page', () => {
	cy.visit(
		'https://automationteststore.com/index.php?rt=checkout/guest_step_1'
	);
});

When('I fill out guest form', () => {
	autoPage.populateFirstName();
	autoPage.populateLastName();
	autoPage.populateEmail();
	autoPage.populatePhone();
	autoPage.populateAddress1();
	autoPage.populateCity();
	autoPage.selectZone();
	autoPage.populateZip();
});
When('I click on continue on guest form', () => {
	autoPage.elements.guestContinueButton().click();
});
Then('I should be redirected to step 2 checkout confirmation page', () => {
	autoPage.elements.pageTitle().should('have.text', ' Checkout Confirmation');
	//.should('have.text', ' Your Order Has Been Processed!');
});

Given('I am on automation store checkout confirm page', () => {
	cy.visit(
		'https://automationteststore.com/index.php?rt=checkout/guest_step_3'
	);
});
When('I click on confirm order', () => {
	autoPage.elements.confirmOrder().click();
});
Then('I should see order confirmation message', () => {
	autoPage.elements
		.pageTitle()
		.should('have.text', ' Your Order Has Been Processed!');
});
