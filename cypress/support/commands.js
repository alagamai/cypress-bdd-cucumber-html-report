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
const prodList = require('../fixtures/product.json');

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

Cypress.Commands.add('selectProduct', prodName => {
	cy.get('a.prdocutname').each(($el, index, li) => {
		cy.log($el.text() + ' index : ', +index + '  list : ' + li);
		if ($el.text().includes(prodName)) {
			cy.wrap($el).as('prod');
			cy.wait(2000);
			setTimeout(() => {
				cy.get('@prod').should('have.class', 'prdocutname').click();
			}, 2000);
			setTimeout(() => {
				cy.contains('Add to Cart').click({ force: true });
			}, 2000);
			setTimeout(() => {
				cy.get('[title="Automation Test Store"]').click({ force: true });
			}, 2000);
			return false;
		}
	});
});

Cypress.Commands.add('saveRestoreCartItems', custId => {
	cy.session(custId, () => {
		cy.visit('https://automationteststore.com/');
		cy.log(prodList);
		cy.log(` here is the len :  ${prodList.products.length}`);
		for (let index = 0; index < prodList.products.length; index++) {
			//cy.contains('Brunette expressions Conditioner', { force: true })

			cy.contains(prodList.products[index].trim(), { force: true })
				.closest('.fixed_wrapper')
				.siblings('.thumbnail')
				.find('i.fa.fa-cart-plus.fa-fw')
				.click({ force: true });
			// .within(() => {
			// 	cy.get('i.fa.fa-cart-plus.fa-fw').click({ force: true });
			// });
			// to list elements
			// .each($el => {
			// 	cy.log($el.text());
			// 	cy.wrap($el).click();
			// });
		}

		// cy.get(
		// 	'#block_frame_featured_1769 > .thumbnails > :nth-child(3) > .thumbnail > .pricetag > .productcart > .fa'
		// ).click();
		// cy.get(
		// 	'#block_frame_bestsellers_1771 > .thumbnails > :nth-child(3) > .thumbnail > .pricetag > .productcart > .fa'
		// ).click();
	});
});

Cypress.Commands.add('getRandomNumber', (min, max) => {
	// find diff
	let difference = max - min;

	// generate random number
	let rand = Math.random();

	console.log(`rand val + math.random: ${rand}`);
	// multiply with difference
	rand = Math.floor(rand * difference);

	console.log(`rand val * difference with math fllor: ${rand}`);
	// add with min value
	rand = rand + min;

	console.log(`rand+ min val: ${rand}`);

	cy.wrap(rand);
});
