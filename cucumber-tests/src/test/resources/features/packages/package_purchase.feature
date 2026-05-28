@packages @packagePurchase @requiresSchoolLogin
Feature: Package Purchase
  As a logged-in school admin
  I want to purchase a subscription package
  So that I can post jobs and access the full hiring features

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "Packages" section
    And I click the "Subscribe" button on the "Standard" plan

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: School admin views the payment page after selecting a plan
    Then the payment page should be displayed
    And the selected plan "Standard" should be shown as the order summary

  @positive
  Scenario: Payment page shows the plan name and price
    Then the payment page should show "Standard Plan"
    And the price should be displayed with the correct amount
    And the billing period should be indicated (monthly or annually)

  @positive
  Scenario: School admin completes a successful purchase
    When I enter valid payment details
    And I click the "Confirm Purchase" button
    Then the purchase should be completed successfully
    And I should see a success message "Subscription activated successfully"
    And I should be redirected to the dashboard or a confirmation page

  @positive
  Scenario: Successful purchase updates the active plan in the Packages section
    When I purchase the "Premium" plan
    Then the Packages section should show "Premium" as the "Current Plan"
    And the Standard plan should no longer be highlighted as active

  @positive
  Scenario: A purchase receipt or confirmation is displayed after payment
    When I complete a successful purchase
    Then a confirmation screen should display:
      | field        | value              |
      | Plan Name    | Standard           |
      | Order Status | Confirmed          |

  @positive
  Scenario: School admin can upgrade from Basic to Premium
    Given the school has an active Basic plan
    When I click "Upgrade" or "Subscribe" on the Premium plan
    And I complete the payment
    Then the school should be upgraded to the Premium plan

  @positive
  Scenario: Package purchase is recorded in the Transactions section
    When I successfully purchase a plan
    And I navigate to the "Transactions" section
    Then the new purchase should appear as a transaction entry
    And the transaction should show the plan name, date, and amount

  @positive
  Scenario: School admin can go back from payment page without completing purchase
    When I am on the payment page
    And I click the "Back" or "Cancel" button
    Then I should return to the Packages page
    And no purchase should have been made

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Purchase fails with an expired or invalid card
    When I enter payment details with an expired card "12/20"
    And I click "Confirm Purchase"
    Then I should see an error message "Payment failed: Card expired"
    And the subscription should not be activated

  @negative
  Scenario: Purchase fails with insufficient funds
    When I enter payment details that simulate insufficient funds
    And I click "Confirm Purchase"
    Then I should see an error message "Payment failed: Insufficient funds"

  @negative
  Scenario: Purchasing while already on the same plan shows a message
    Given the school already has an active "Standard" subscription
    When I try to purchase the "Standard" plan again
    Then I should see a message "You are already subscribed to this plan"
    And no duplicate charge should occur

  @negative
  Scenario: Payment page is not accessible without selecting a plan
    When I navigate directly to the payment page without selecting a plan
    Then I should be redirected to the Packages page
    Or an error should be displayed

  @negative
  Scenario: Unauthenticated user cannot purchase a package
    Given I am not logged in
    When I navigate directly to the payment page
    Then I should be redirected to the login page

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Payment form requires card number
    When I leave the card number field empty
    And I click "Confirm Purchase"
    Then I should see a validation error "Card number is required"

  @validation
  Scenario: Payment form validates card number format
    When I enter an invalid card number "1234"
    And I click "Confirm Purchase"
    Then I should see a validation error about the card number format

  @validation
  Scenario: Payment form requires expiry date
    When I leave the expiry date field empty
    And I click "Confirm Purchase"
    Then I should see a validation error "Expiry date is required"

  @validation
  Scenario: Payment form requires CVV
    When I leave the CVV field empty
    And I click "Confirm Purchase"
    Then I should see a validation error "CVV is required"

  @validation
  Scenario Outline: Payment form rejects invalid card details
    When I enter card number "<cardNumber>" with expiry "<expiry>" and CVV "<cvv>"
    And I click "Confirm Purchase"
    Then I should see the error "<error>"

    Examples:
      | cardNumber          | expiry | cvv | error                              |
      | 1234                | 12/26  | 123 | Card number must be 16 digits      |
      | 4111111111111111    | 01/20  | 123 | Card has expired                   |
      | 4111111111111111    | 12/26  | 12  | CVV must be 3 or 4 digits          |
      |                     | 12/26  | 123 | Card number is required            |
