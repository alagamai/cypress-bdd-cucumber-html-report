class econPage {
	elements = {
		searchbar: () => cy.get('#small-searchterms'),
		searchButton: () => cy.get('.button-1.search-box-button'),
		qty: () => cy.get('#product_enteredQuantity_3'),
		cartQty: () => cy.get('.cart-qty'),
		productTotal: () => cy.get('.product-subtotal'),
		orderSubTotal: () => cy.get('.order-subtotal .value-summary'),
		addToCart: () => cy.get('#add-to-cart-button-3').click(),
		succMsg: () => cy.get('.bar-notification.success .content'),
		shoppingCart: () => cy.contains(`span`, `Shopping cart`),
		checkoutButton: () => cy.get('#checkout'),
		termsWarn: () => cy.get('#terms-of-service-warning-box'),
		termsWarnClose: () => cy.get('.ui-button'),
		termsOfService: () => cy.get('#termsofservice'),
		checkOutAsGuest: () => cy.get('.checkout-as-guest-button'),
	};

	clearQty = () => {
		this.elements.qty().clear();
	};
}

//module.exports = new econPage();
export default new econPage();
