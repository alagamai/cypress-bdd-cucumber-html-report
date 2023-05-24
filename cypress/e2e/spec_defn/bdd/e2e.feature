Feature: Shop at e-commerce portal
    link is at https://demo.nopcommerce.com/

    Scenario: Search for product
    Given I am on e-commerce portal
    When I search for the item "Lenovo"
    When I click on item "Lenovo IdeaCentre 600 All-in-One PC"
    Then I should be taken to item detail page

    Scenario: Add to cart
    Given I am on product detail page "Lenovo IdeaCentre 600 All-in-One PC"
    When I add 2 items to cart
    Then cart qty should be 2


    Scenario: Navigate to cart page
    Given I am on e-commerce portal
    When I click on Shopping cart
    Then I should be taken to cart detail page
    Then I shoud see product total and order subtotal for 2 items


    Scenario: validate item checkout
    Given I am on cart page
    When I click on Checkout button
    Then I should see Terms of serive error
    Then I can close the Terms of Service dialogue


    Scenario: checkout the items
    Given I am on cart page
    When I check on Terms of Service
    When I click on Checkout button
    When I checkout as guest
    Then I shoud be taken to billing page


    Scenario: fill out billing address
    Given I am on billing page
    When I fill out billing form
    When I click on continue on billing address section
    Then I should be taken to shipping method form

    Scenario: fill out shipping method
    Given I am on billing page
    When I click on continue on billing address section
    When I select shipping option 2
    When I click on continue on shipping method section
    Then I should be taken to payment method form


    Scenario: fill out payment method and info section
    Given I am on billing page
    When I click on continue on billing address section
    When I click on continue on shipping method section
    When I click on continue on payment method section
    When I click on continue on payment info section
    When I click on continue on confirm order section
    Then I should see checkout completed message






