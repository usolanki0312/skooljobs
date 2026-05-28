@teacher @editProfile @requiresLogin
Feature: Edit Teacher Profile
  As a logged-in teacher
  I want to update my profile information
  So that I can keep my details accurate and attractive to schools

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a teacher with valid credentials
    And I am on the edit teacher profile page

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: Teacher updates their full name successfully
    When I clear the first name field and type "Robert"
    And I clear the last name field and type "Brown"
    And I click the "Save Changes" button
    Then I should see a success message "Profile updated successfully"
    And the profile page should show "Robert Brown" as the name

  @positive
  Scenario: Teacher updates their phone number
    When I update the phone number to "+91 9876543210"
    And I click the "Save Changes" button
    Then I should see a success message "Profile updated successfully"
    And the profile should display "+91 9876543210" in the phone field

  @positive
  Scenario: Teacher updates their city/location
    When I update the city to "Mumbai"
    And I click the "Save Changes" button
    Then I should see a success message "Profile updated successfully"
    And the profile should display "Mumbai" as the city

  @positive
  Scenario: Teacher updates their subject specialisation
    When I update the subject to "Mathematics"
    And I click the "Save Changes" button
    Then I should see a success message "Profile updated successfully"

  @positive
  Scenario: Teacher updates their years of experience
    When I update the experience field to "5 years"
    And I click the "Save Changes" button
    Then I should see a success message "Profile updated successfully"

  @positive
  Scenario: Teacher updates their salary expectation
    When I update the expected salary to "50000"
    And I click the "Save Changes" button
    Then I should see a success message "Profile updated successfully"

  @positive
  Scenario: Teacher updates their about/bio section
    When I update the bio to "Experienced Mathematics teacher with 5 years of secondary school experience"
    And I click the "Save Changes" button
    Then I should see a success message "Profile updated successfully"

  @positive
  Scenario: Edit profile form is pre-populated with existing data
    Then the first name field should be pre-filled with the teacher's current first name
    And the last name field should be pre-filled with the teacher's current last name
    And the email field should be pre-filled with the teacher's current email

  @positive
  Scenario: Teacher cancels editing without saving changes
    When I update the first name to "Temporary"
    And I click the "Cancel" button
    Then no changes should be saved
    And I should be redirected to the teacher profile page

  @positive
  Scenario: Teacher can update multiple fields in a single save
    When I update the first name to "Alice"
    And I update the phone number to "+91 9000000000"
    And I update the city to "Delhi"
    And I click the "Save Changes" button
    Then all three fields should be saved successfully

  @positive
  Scenario: Profile photo upload button is visible in edit mode
    Then the edit profile page should show an "Upload Photo" button

  @positive
  Scenario: Teacher uploads a valid profile photo
    When I upload a valid profile image file "profile.jpg"
    And I click the "Save Changes" button
    Then the profile photo should be updated
    And I should see a success message

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Edit profile fails when first name is cleared
    When I clear the first name field
    And I click the "Save Changes" button
    Then I should see a validation error "First name is required"
    And the profile should not be updated

  @negative
  Scenario: Edit profile fails when last name is cleared
    When I clear the last name field
    And I click the "Save Changes" button
    Then I should see a validation error "Last name is required"

  @negative
  Scenario: Edit profile with invalid phone number format shows error
    When I update the phone number to "abc-not-a-phone"
    And I click the "Save Changes" button
    Then I should see a validation error for the phone number format

  @negative
  Scenario: Upload of non-image file as profile photo is rejected
    When I try to upload a file "resume.pdf" as a profile photo
    Then I should see an error message "Only image files are accepted"

  @negative
  Scenario: Upload of oversized image as profile photo is rejected
    When I try to upload an image larger than 5MB
    Then I should see an error message about the file size limit

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Email field is read-only in edit profile
    Then the email field should be disabled or read-only in the edit form

  @validation
  Scenario: Phone number field validates numeric format
    When I enter "letters" in the phone number field
    Then I should see a validation message for the phone number

  @validation
  Scenario Outline: Edit profile validates required fields
    When I clear the "<field>" field
    And I click the "Save Changes" button
    Then I should see a validation error containing "<error>"

    Examples:
      | field      | error                 |
      | firstName  | First name is required|
      | lastName   | Last name is required |
