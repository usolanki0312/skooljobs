@authentication @signup
Feature: User Sign Up
  As a new user (teacher)
  I want to register an account on SkoolJobs
  So that I can build my profile and find teaching jobs

  Background:
    Given the SkoolJobs application is running
    And I am on the signup page

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive
  Scenario: Teacher registers with all valid details
    When I fill in the signup form with:
      | field        | value                |
      | firstName    | John                 |
      | lastName     | Doe                  |
      | email        | john.doe@example.com |
      | password     | SecurePass@123       |
      | role         | teacher              |
    And I click the "Sign Up" button
    Then my account should be created successfully
    And I should be redirected to the teacher dashboard

  @positive
  Scenario: Signup page shows all required form fields
    Then the signup form should contain a first name field
    And the signup form should contain a last name field
    And the signup form should contain an email field
    And the signup form should contain a password field
    And the signup form should contain a sign up button

  @positive
  Scenario: User navigates back to login from signup page
    When I click the "Already have an account? Login" link
    Then I should be navigated to the login page

  @positive
  Scenario: Password field is masked on signup form
    When I type in the password field
    Then the password input type should be "password"

  @positive
  Scenario: User can toggle password visibility on signup
    When I enter a password in the signup form
    And I click the show password toggle
    Then the password should be visible as plain text
    When I click the show password toggle again
    Then the password should be masked

  @positive
  Scenario: Signup form accepts valid email formats
    When I enter email "valid.email+tag@domain.co.in" in the signup form
    Then the email field should be accepted without validation errors

  @positive
  Scenario: Signup form retains data on partial completion
    When I fill in first name "Jane" and last name "Smith"
    And I move focus to the email field
    Then the first name field should still show "Jane"
    And the last name field should still show "Smith"

  @positive
  Scenario: New user is persisted to local storage after signup
    When I complete a valid signup with email "newuser@example.com"
    Then the "currentUser" key should exist in local storage
    And the stored email should be "newuser@example.com"

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Signup fails when email is already registered
    Given a user with email "teacher@gmail.com" is already registered
    When I try to sign up with email "teacher@gmail.com"
    And I click the "Sign Up" button
    Then I should see an error message indicating the email is already taken

  @negative
  Scenario: Signup fails with a weak password
    When I fill in the signup form with a password "123"
    And I click the "Sign Up" button
    Then I should see a password strength error message

  @negative
  Scenario: Signup does not proceed with mismatched passwords
    When I fill in the signup form with password "SecurePass@123"
    And I fill in the confirm password field with "DifferentPass@123"
    And I click the "Sign Up" button
    Then I should see an error "Passwords do not match"

  @negative
  Scenario: Signup fails with XSS attempt in name field
    When I enter first name "<script>alert('xss')</script>" in the signup form
    And I click the "Sign Up" button
    Then the input should be sanitised or rejected

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Signup form requires first name
    When I leave the first name field empty
    And I fill in all other required signup fields
    And I click the "Sign Up" button
    Then I should see a validation error for the first name field

  @validation
  Scenario: Signup form requires last name
    When I leave the last name field empty
    And I fill in all other required signup fields
    And I click the "Sign Up" button
    Then I should see a validation error for the last name field

  @validation
  Scenario: Signup form requires email
    When I leave the email field empty in the signup form
    And I fill in all other required signup fields
    And I click the "Sign Up" button
    Then I should see a validation error for the email field

  @validation
  Scenario: Signup form requires password
    When I leave the password field empty in the signup form
    And I fill in all other required signup fields
    And I click the "Sign Up" button
    Then I should see a validation error for the password field

  @validation
  Scenario: Signup form validates email format
    When I enter an invalid email "not-an-email" in the signup form
    And I click the "Sign Up" button
    Then I should see an email format validation error

  @validation
  Scenario Outline: Signup form rejects invalid emails
    When I enter email "<email>" in the signup form
    And I click the "Sign Up" button
    Then I should see an email format validation error

    Examples:
      | email          |
      | plaintext      |
      | @nodomain.com  |
      | nodomain@      |
      | user@@test.com |
      | user @test.com |

  @validation
  Scenario Outline: Signup form enforces password rules
    When I enter password "<password>" in the signup form
    And I click the "Sign Up" button
    Then I should see the password error "<error>"

    Examples:
      | password | error                             |
      | abc      | Password is too short             |
      | 1234567  | Password must include a letter    |
      |          | Password is required              |
