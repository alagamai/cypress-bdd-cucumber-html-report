/// <reference types="cypress" />

//const billPage = require('../pageObjects/billing');
//const ecomPage = require('../pageObjects/pom');
import ecomPage from '../pageObjects/pom';
import billPage from '../pageObjects/billing';

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import 'cypress-localstorage-commands';
let custId;

Given('I am on e-commerce portal', () => {
	//https://demo.nopcommerce.com/
	cy.visit('/');
});

When('I search for the item "Lenovo"', () => {
	ecomPage.elements.searchbar().type('Lenovo');
	ecomPage.elements.searchButton().click();
});

When('I click on item "Lenovo IdeaCentre 600 All-in-One PC"', () => {
	cy.contains('a', 'Lenovo IdeaCentre 600 All-in-One PC').click();
});

Then('I should be taken to item detail page', () => {
	cy.url().should(
		'contain',
		'https://demo.nopcommerce.com/lenovo-ideacentre-600-all-in-one-pc'
	);
});

Given(
	'I am on product detail page "Lenovo IdeaCentre 600 All-in-One PC"',
	() => {
		cy.visit('/' + 'lenovo-ideacentre-600-all-in-one-pc');
	}
);

When('I add 2 items to cart', () => {
	ecomPage.clearQty();
	ecomPage.elements.qty().type(2);
	cy.getCookies().then(cookies => {
		console.log(`customer id **** :  ${cookies[1].value}`);
		custId = cookies[1].value;
		console.log(`this cust id **** :${custId}`);
		cy.saveRestoreSessionData(cookies[1].value);
	});
});

Then('cart qty should be 2', () => {
	cy.visit('/' + 'lenovo-ideacentre-600-all-in-one-pc');
	ecomPage.elements.cartQty().then(cnt => {
		expect(cnt.text()).to.be.equal('(2)');
	});
});

When('I click on Shopping cart', () => {
	cy.saveRestoreSessionData(custId);
	cy.visit('/' + 'lenovo-ideacentre-600-all-in-one-pc');

	ecomPage.elements.shoppingCart().click();
});

Then('I should be taken to cart detail page', () => {
	cy.url().should('contain', 'https://demo.nopcommerce.com/cart');
});

Then('I shoud see product total and order subtotal for 2 items', () => {
	ecomPage.elements.productTotal().then(e => {
		cy.log(e.text());
		expect(e.text()).to.be.equal('$1,000.00');
	});

	ecomPage.elements.orderSubTotal().then(e => {
		cy.log(e.text());
		expect(e.text()).to.be.equal('$1,000.00');
	});
});

Given('I am on cart page', () => {
	cy.saveRestoreSessionData(custId);
	cy.visit('/' + 'cart');
});

When('I click on Checkout button', () => {
	ecomPage.elements.checkoutButton().click();
});

Then('I should see Terms of serive error', () => {
	ecomPage.elements.termsWarn().then(e => {
		expect(e.text()).to.be.equal(
			'Please accept the terms of service before the next step.'
		);
	});
});

Then('I can close the Terms of Service dialogue', () => {
	ecomPage.elements.termsWarnClose().click();
});

When('I check on Terms of Service', () => {
	ecomPage.elements.termsOfService().check();
});

When('I checkout as guest', () => {
	ecomPage.elements.checkOutAsGuest().click();
});

Then('I shoud be taken to billing page', () => {
	cy.url().should(
		'contain',
		'https://demo.nopcommerce.com/onepagecheckout#opc-billing'
	);
});

Given('I am on billing page', () => {
	cy.saveRestoreSessionData(custId);
	cy.visit('/' + 'onepagecheckout#opc-billing');
});

When('I fill out billing form', () => {
	billPage.populateFirstName();
	billPage.populateLastName();
	billPage.populateEmail();
	billPage.selectCountry();
	cy.wait(2000);
	billPage.selectState();
	billPage.populateAddress1();
	billPage.populateZip();
	billPage.populateCity();
	billPage.populatePhone();
});

When('I click on continue on billing address section', () => {
	billPage.elements.billingContinueButton().click();
});

Then('I should be taken to shipping method form', () => {
	cy.url().should(
		'contain',
		'https://demo.nopcommerce.com/onepagecheckout#opc-shipping_method'
	);
});

When('I select shipping option 2', () => {
	billPage.elements.shippingOption2().click();
});
When('I click on continue on shipping method section', () => {
	billPage.elements.shippingContinueButton().click();
});
Then('I should be taken to payment method form', () => {
	cy.url().should(
		'contain',
		'https://demo.nopcommerce.com/onepagecheckout#opc-payment_method'
	);
});

When('I click on continue on payment method section', () => {
	billPage.elements.paymentContinueButton().click();
});

When('I click on continue on payment info section', () => {
	billPage.elements.paymentInfoContinueButton().click();
});

When('I click on continue on confirm order section', () => {
	billPage.elements.confirmOrderContinueButton().click();
});

Then('I should see checkout completed message', () => {
	cy.url().should('contain', 'https://demo.nopcommerce.com/checkout/completed');
	billPage.elements
		.checkoutCompletedMsg()
		.should('contain', 'Your order has been successfully processed!');
});
