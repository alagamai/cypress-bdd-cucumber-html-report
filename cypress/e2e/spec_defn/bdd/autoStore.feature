Feature: automation store
    select any product from entire list
Scenario: Select product and add products from product detail page
Given I am on automation store home page
When I select product 1 and add to cart
When I select product 2 and add to cart
When I select product 3 and add to cart
Then I should see 3 items on item cart

Scenario: Add products to cart from home page
Given I am on automation store home page
When I add products to cart from home page
Then I should see correct item counter on item cart

Scenario: Checkout products
Given I am on automation store home page
When I click on checkout button
When I click on checkout option as Guest checkout
When I click on continue
Then I should be redirected to guest step 1 page


Scenario: fill in guest form
Given I am on automation store checkout page
When I fill out guest form
When I click on continue on guest form
Then I should be redirected to step 2 checkout confirmation page

Scenario: complete checkout
Given I am on automation store checkout confirm page
When I click on confirm order
Then I should see order confirmation message
