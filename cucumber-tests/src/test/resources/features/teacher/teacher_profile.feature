@teacher @teacherProfile @requiresLogin
Feature: Teacher Profile
  As a logged-in teacher
  I want to view my profile information
  So that I can see how schools will see my details

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a teacher with valid credentials
    And I navigate to the teacher profile page

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: Teacher profile page loads successfully
    Then the teacher profile page should be displayed
    And the profile should show the teacher's name

  @positive
  Scenario: Teacher profile displays personal information section
    Then the profile page should show the "Personal Information" section
    And the section should display the teacher's full name
    And the section should display the teacher's email address
    And the section should display the teacher's phone number

  @positive
  Scenario: Teacher profile displays professional information
    Then the profile page should show the "Professional Information" section
    And the section should display the teacher's subject specialisation
    And the section should display the teacher's years of experience

  @positive
  Scenario: Teacher profile displays educational qualifications
    Then the profile page should show the "Education" section
    And the section should list the teacher's qualifications

  @positive
  Scenario: Teacher profile shows a profile photo placeholder when no photo is uploaded
    Given the teacher has not uploaded a profile photo
    Then the profile page should show a default avatar or placeholder image

  @positive
  Scenario: Teacher profile page shows an edit button
    Then the profile page should have an "Edit Profile" button
    And clicking the "Edit Profile" button should open the edit profile form

  @positive
  Scenario: Teacher profile shows the current account status
    Then the profile page should display the account status as "Active"

  @positive
  Scenario: Teacher dashboard sidebar shows the teacher's name
    When I navigate to the teacher dashboard
    Then the sidebar should display the logged-in teacher's name
    And the sidebar should display the teacher's role

  @positive
  Scenario: Teacher profile can be accessed from the dashboard sidebar
    When I am on the teacher dashboard
    And I click "My Profile" in the sidebar navigation
    Then I should be navigated to the teacher profile page

  @positive
  Scenario: Teacher profile displays resume section
    Then the profile page should show a "Resume" section
    And the section should have an "Upload Resume" button if no resume is uploaded

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Teacher profile page is not accessible without login
    Given I am not logged in
    When I navigate directly to the teacher profile URL
    Then I should be redirected to the login page

  @negative
  Scenario: School admin cannot access the teacher profile page
    Given I am logged in as a school admin
    When I navigate directly to the teacher profile URL
    Then I should be redirected to the school dashboard

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Profile data is loaded from local storage on page load
    Given the teacher is logged in with email "teacher@gmail.com"
    When the teacher profile page loads
    Then the displayed email should match "teacher@gmail.com"

  @validation
  Scenario: Profile page handles missing optional fields gracefully
    Given a teacher profile has no phone number set
    When I view the teacher profile page
    Then the phone number field should show a placeholder or "Not provided" text

  @validation
  Scenario Outline: Teacher profile displays correct field labels
    Then the profile page should contain the label "<label>"

    Examples:
      | label               |
      | Full Name           |
      | Email               |
      | Phone               |
      | Subject             |
      | Experience          |
      | Qualification       |
