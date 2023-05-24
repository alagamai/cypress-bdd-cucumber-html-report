// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const ecomPage = require('../e2e/spec_defn/pageObjects/pom.js');

Cypress.Commands.add('saveRestoreSessionData', custId => {
	cy.session(custId, () => {
		cy.visit('/' + 'lenovo-ideacentre-600-all-in-one-pc');
		ecomPage.clearQty();
		ecomPage.elements.qty().type(2);
		cy.wait(2000);
		ecomPage.elements.addToCart().click();
		cy.wait(2000);
		ecomPage.elements.succMsg().then(e => {
			expect(e.text()).to.be.equal(
				'The product has been added to your shopping cart'
			);
		});
	});
});
