@authentication @smoke
Feature: User Login
  As a registered user (teacher or school)
  I want to log in with valid credentials
  So that I can access my personalised dashboard

  Background:
    Given the SkoolJobs application is running
    And I am on the login page

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @teacher
  Scenario: Teacher logs in with valid credentials
    When I enter email "teacher@gmail.com" and password "123456"
    And I click the login button
    Then I should be redirected to the teacher dashboard
    And the page title should be "Teacher Dashboard"

  @positive @school
  Scenario: School admin logs in with valid credentials
    When I enter email "hr@school.in" and password "password"
    And I click the login button
    Then I should be redirected to the school dashboard
    And the page title should be "School Dashboard"

  @positive @teacher
  Scenario: Teacher login stores user data in local storage
    When I enter email "teacher@gmail.com" and password "123456"
    And I click the login button
    Then the "currentUser" key should exist in local storage
    And the stored role should be "teacher"

  @positive @school
  Scenario: School login stores employer data in local storage
    When I enter email "hr@school.in" and password "password"
    And I click the login button
    Then the "currentUser" key should exist in local storage
    And the stored role should be "employer"

  @positive
  Scenario: Login page displays the SkoolJobs brand
    Then the login page should show the "SkoolJobs" logo
    And the email input field should be visible
    And the password input field should be visible
    And the login button should be visible

  @positive
  Scenario: Password field masks characters by default
    When I focus on the password field
    Then the password input type should be "password"

  @positive
  Scenario: User can toggle password visibility
    When I enter password "123456"
    And I click the show/hide password icon
    Then the password input type should be "text"
    When I click the show/hide password icon again
    Then the password input type should be "password"

  @positive
  Scenario: Pressing Enter key submits the login form
    When I enter email "teacher@gmail.com" and password "123456"
    And I press the Enter key
    Then I should be redirected to the teacher dashboard

  @positive
  Scenario: Login button is enabled when fields are filled
    When I enter email "teacher@gmail.com" and password "123456"
    Then the login button should be enabled

  @positive
  Scenario: Page navigates to sign-up from login page
    When I click the "Sign Up" link on the login page
    Then I should be navigated to the signup page

  @positive
  Scenario: Page navigates to forgot password from login page
    When I click the "Forgot Password" link on the login page
    Then I should be navigated to the forgot password page

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Login fails with unregistered email
    When I enter email "unknown@test.com" and password "123456"
    And I click the login button
    Then I should see an error message "Invalid credentials. Please try again."
    And I should remain on the login page

  @negative
  Scenario: Login fails with correct email but wrong password
    When I enter email "teacher@gmail.com" and password "wrongpass"
    And I click the login button
    Then I should see an error message "Invalid credentials. Please try again."
    And I should remain on the login page

  @negative
  Scenario: Login fails with wrong email but correct teacher password
    When I enter email "wrong@email.com" and password "123456"
    And I click the login button
    Then I should see an error message "Invalid credentials. Please try again."

  @negative
  Scenario: Login fails when both credentials are incorrect
    When I enter email "fake@email.com" and password "badpassword"
    And I click the login button
    Then I should see an error message "Invalid credentials. Please try again."

  @negative
  Scenario: Login fails with SQL injection attempt in email field
    When I enter email "' OR 1=1 --" and password "password"
    And I click the login button
    Then I should see an error message "Invalid credentials. Please try again."
    And I should remain on the login page

  @negative
  Scenario: Login fails with XSS attempt in password field
    When I enter email "teacher@gmail.com" and password "<script>alert(1)</script>"
    And I click the login button
    Then I should see an error message "Invalid credentials. Please try again."

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Login form shows error when email is empty
    When I leave the email field empty
    And I enter password "123456"
    And I click the login button
    Then I should see a validation message for the email field

  @validation
  Scenario: Login form shows error when password is empty
    When I enter email "teacher@gmail.com"
    And I leave the password field empty
    And I click the login button
    Then I should see a validation message for the password field

  @validation
  Scenario: Login form shows error when both fields are empty
    When I leave both the email and password fields empty
    And I click the login button
    Then I should see validation messages for required fields

  @validation
  Scenario: Login form validates incorrect email format
    When I enter email "notanemail" and password "123456"
    And I click the login button
    Then I should see an email format validation message

  @validation
  Scenario: Login form validates email with missing domain
    When I enter email "user@" and password "123456"
    And I click the login button
    Then I should see an email format validation message

  @validation
  Scenario Outline: Login fails with various invalid credential combinations
    When I enter email "<email>" and password "<password>"
    And I click the login button
    Then I should see an error message "<expected_message>"

    Examples:
      | email               | password  | expected_message                           |
      | teacher@gmail.com   | WRONG     | Invalid credentials. Please try again.     |
      | TEACHER@GMAIL.COM   | 123456    | Invalid credentials. Please try again.     |
      | teacher@gmail.com   |           | Invalid credentials. Please try again.     |
      |                     | 123456    | Invalid credentials. Please try again.     |
      | hr@school.in        | 123456    | Invalid credentials. Please try again.     |
      | teacher@gmail.com   | password  | Invalid credentials. Please try again.     |
