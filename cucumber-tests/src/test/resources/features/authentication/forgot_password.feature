@authentication @forgotPassword
Feature: Forgot Password
  As a registered user who has forgotten their password
  I want to request a password reset link
  So that I can regain access to my account

  Background:
    Given the SkoolJobs application is running
    And I am on the forgot password page

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive
  Scenario: Registered teacher requests a password reset
    When I enter the registered email "teacher@gmail.com"
    And I click the "Send Reset Link" button
    Then I should see a success message confirming the reset email was sent
    And the message should say "Reset link sent to teacher@gmail.com"

  @positive
  Scenario: Registered school admin requests a password reset
    When I enter the registered email "hr@school.in"
    And I click the "Send Reset Link" button
    Then I should see a success message confirming the reset email was sent

  @positive
  Scenario: Forgot password page has navigation back to login
    When I click the "Back to Login" link
    Then I should be redirected to the login page

  @positive
  Scenario: Forgot password form shows only the email field
    Then the forgot password form should contain an email input
    And the forgot password form should contain a submit button
    And the forgot password form should contain a "Back to Login" link

  @positive
  Scenario: Success state hides the form after submission
    When I enter the registered email "teacher@gmail.com"
    And I click the "Send Reset Link" button
    Then the forgot password form should be hidden or replaced with a success message

  @positive
  Scenario: Resend reset link is available after initial request
    When I enter the registered email "teacher@gmail.com"
    And I click the "Send Reset Link" button
    And I click the "Resend Email" link
    Then a new reset email should be sent to "teacher@gmail.com"

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Forgot password with an unregistered email shows error
    When I enter an unregistered email "notregistered@test.com"
    And I click the "Send Reset Link" button
    Then I should see an error message "No account found with this email address"

  @negative
  Scenario: Forgot password with a deactivated account email shows error
    Given an account with email "deactivated@test.com" has been deactivated
    When I enter the email "deactivated@test.com"
    And I click the "Send Reset Link" button
    Then I should see an error message about the account status

  @negative
  Scenario: Multiple rapid reset requests are rate limited
    When I enter the registered email "teacher@gmail.com"
    And I click the "Send Reset Link" button 5 times in quick succession
    Then I should see a rate limiting warning message

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Forgot password requires email to be entered
    When I leave the email field empty
    And I click the "Send Reset Link" button
    Then I should see a validation error "Email is required"

  @validation
  Scenario: Forgot password validates email format
    When I enter an invalid email "notanemail"
    And I click the "Send Reset Link" button
    Then I should see an email format validation message

  @validation
  Scenario: Forgot password validates email with missing @ symbol
    When I enter an invalid email "userwithoutat.com"
    And I click the "Send Reset Link" button
    Then I should see an email format validation message

  @validation
  Scenario Outline: Forgot password rejects invalid email formats
    When I enter the email "<email>" in the forgot password form
    And I click the "Send Reset Link" button
    Then I should see an email format validation message

    Examples:
      | email           |
      | plaintext       |
      | @nodomain.com   |
      | nodomain@       |
      | spaces in@email |
      | user@@test.com  |
