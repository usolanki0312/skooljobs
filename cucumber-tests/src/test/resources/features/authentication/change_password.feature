@authentication @changePassword @requiresLogin
Feature: Change Password
  As a logged-in user
  I want to change my current password
  So that I can keep my account secure

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a teacher with valid credentials
    And I navigate to the "Change Password" section

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive
  Scenario: Teacher successfully changes their password
    When I enter current password "123456"
    And I enter new password "NewSecure@789"
    And I confirm new password "NewSecure@789"
    And I click the "Update Password" button
    Then I should see a success message "Password updated successfully"

  @positive
  Scenario: School admin successfully changes their password
    Given I am logged in as a school admin with valid credentials
    And I navigate to the "Change Password" section
    When I enter current password "password"
    And I enter new password "NewSchool@456"
    And I confirm new password "NewSchool@456"
    And I click the "Update Password" button
    Then I should see a success message "Password updated successfully"

  @positive
  Scenario: Change password page shows three input fields
    Then the change password form should have a "Current Password" field
    And the change password form should have a "New Password" field
    And the change password form should have a "Confirm New Password" field
    And the change password form should have an "Update Password" button

  @positive
  Scenario: All password fields mask their input by default
    Then the current password field type should be "password"
    And the new password field type should be "password"
    And the confirm password field type should be "password"

  @positive
  Scenario: User can toggle visibility on each password field
    When I click the show/hide toggle for the current password field
    Then the current password field type should be "text"
    When I click the show/hide toggle for the new password field
    Then the new password field type should be "text"
    When I click the show/hide toggle for the confirm password field
    Then the confirm password field type should be "text"

  @positive
  Scenario: After successful password change user session is still active
    When I enter current password "123456"
    And I enter new password "NewSecure@789"
    And I confirm new password "NewSecure@789"
    And I click the "Update Password" button
    Then I should still be logged in
    And the currentUser should remain in local storage

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Change password fails when current password is incorrect
    When I enter current password "wrongcurrentpass"
    And I enter new password "NewSecure@789"
    And I confirm new password "NewSecure@789"
    And I click the "Update Password" button
    Then I should see an error message "Current password is incorrect"

  @negative
  Scenario: Change password fails when new password matches the current one
    When I enter current password "123456"
    And I enter new password "123456"
    And I confirm new password "123456"
    And I click the "Update Password" button
    Then I should see an error message "New password must be different from the current password"

  @negative
  Scenario: Change password fails when new passwords do not match
    When I enter current password "123456"
    And I enter new password "NewSecure@789"
    And I confirm new password "DifferentPass@789"
    And I click the "Update Password" button
    Then I should see an error message "Passwords do not match"

  @negative
  Scenario: Unauthenticated access to change password is blocked
    Given I am not logged in
    When I navigate directly to the change password section
    Then I should be redirected to the login page

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Change password requires current password
    When I leave the current password field empty
    And I enter new password "NewSecure@789"
    And I confirm new password "NewSecure@789"
    And I click the "Update Password" button
    Then I should see a validation error "Current password is required"

  @validation
  Scenario: Change password requires new password
    When I enter current password "123456"
    And I leave the new password field empty
    And I click the "Update Password" button
    Then I should see a validation error "New password is required"

  @validation
  Scenario: Change password requires confirm password
    When I enter current password "123456"
    And I enter new password "NewSecure@789"
    And I leave the confirm password field empty
    And I click the "Update Password" button
    Then I should see a validation error "Please confirm your new password"

  @validation
  Scenario: New password must meet minimum length requirement
    When I enter current password "123456"
    And I enter new password "abc"
    And I confirm new password "abc"
    And I click the "Update Password" button
    Then I should see a validation error about minimum password length

  @validation
  Scenario Outline: New password strength validation
    When I enter current password "123456"
    And I enter new password "<newPassword>"
    And I confirm new password "<newPassword>"
    And I click the "Update Password" button
    Then I should see the password validation error "<error>"

    Examples:
      | newPassword | error                          |
      | abc         | Password is too short          |
      | 12345       | Password must include a letter |
      |             | New password is required       |
      | 123456      | New password must be different |
