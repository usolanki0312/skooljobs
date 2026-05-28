@recruiter @postJob @requiresSchoolLogin
Feature: Post a New Job
  As a logged-in school admin
  I want to post teaching job vacancies
  So that qualified teachers can discover and apply for them

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "Post a New Job" section in the school dashboard

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: School admin posts a new job with all required fields
    When I fill in the job form with:
      | field              | value                         |
      | jobTitle           | Mathematics Teacher           |
      | subject            | Mathematics                   |
      | experience         | 2-5 Years                     |
      | salary             | 40000-50000                   |
      | location           | Mumbai, Maharashtra           |
      | employmentType     | Full-Time                     |
      | description        | We are looking for an experienced Mathematics teacher |
    And I click the "Publish Job" button
    Then the job should be published successfully
    And I should see a success message "Job posted successfully"

  @positive
  Scenario: School admin saves a job as draft
    When I fill in the job title as "Science Teacher"
    And I fill in the subject as "Science"
    And I fill in the location as "Delhi"
    And I click the "Save Draft" button
    Then the job should be saved as a draft
    And I should see a success message "Job saved as draft"

  @positive
  Scenario: Published job appears in the Manage Jobs list
    When I publish a new job for "English Teacher"
    Then the job "English Teacher" should appear in the Manage Jobs section
    And its status should be "Active"

  @positive
  Scenario: Draft job appears in the Manage Jobs list with Draft status
    When I save a job as draft for "History Teacher"
    Then the job "History Teacher" should appear in the Manage Jobs section
    And its status should be "Draft"

  @positive
  Scenario: School admin can select employment type via button chips
    When I click the "Full-Time" employment type chip
    Then the "Full-Time" chip should appear selected/highlighted
    When I click the "Part-Time" chip instead
    Then the "Part-Time" chip should be selected
    And "Full-Time" should be deselected

  @positive
  Scenario: Job form allows multiple paragraphs in the description
    When I enter a multi-line job description with 3 paragraphs
    And I click the "Publish Job" button
    Then all paragraphs should be saved correctly

  @positive
  Scenario: Job form allows entering requirements
    When I fill in the requirements field with "B.Ed degree, 2+ years experience"
    And I click the "Publish Job" button
    Then the job should be saved with the given requirements

  @positive
  Scenario: Job form allows entering qualifications
    When I fill in the qualifications field with "M.Sc Mathematics, B.Ed"
    And I click the "Publish Job" button
    Then the job should be saved with the given qualifications

  @positive
  Scenario: Job count on dashboard increases after posting a job
    Given the current job count on the dashboard is noted
    When I post a new job successfully
    Then the job count on the dashboard should increase by 1

  @positive
  Scenario: School name is pre-filled from the institute profile
    Then the post job form should show the institute name from the school profile
    And the institute name field should not be editable

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Job posting fails when job title is missing
    When I fill in all job fields except the job title
    And I click the "Publish Job" button
    Then I should see a validation error "Job title is required"
    And the job should not be posted

  @negative
  Scenario: Job posting fails when subject is missing
    When I fill in all job fields except the subject
    And I click the "Publish Job" button
    Then I should see a validation error "Subject is required"

  @negative
  Scenario: Job posting fails when location is missing
    When I fill in all job fields except the location
    And I click the "Publish Job" button
    Then I should see a validation error "Location is required"

  @negative
  Scenario: Job posting fails when experience is not selected
    When I fill in all job fields except experience
    And I click the "Publish Job" button
    Then I should see a validation error "Experience level is required"

  @negative
  Scenario: Unauthenticated user cannot post a job
    Given I am not logged in
    When I navigate directly to the post job URL
    Then I should be redirected to the login page

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Post job form contains all expected fields
    Then the post job form should have a "Job Title" field
    And the form should have a "Subject" field
    And the form should have an "Experience" field
    And the form should have a "Salary" field
    And the form should have a "Location" field
    And the form should have employment type selection chips
    And the form should have a "Job Description" textarea
    And the form should have a "Requirements" textarea
    And the form should have a "Qualifications" textarea

  @validation
  Scenario: Salary field accepts only numeric or range format
    When I enter salary "abc" in the salary field
    And I click "Publish Job"
    Then I should see a validation error for the salary field format

  @validation
  Scenario Outline: Required fields are validated on job submission
    When I leave "<field>" empty in the post job form
    And I click the "Publish Job" button
    Then I should see a validation error for "<field>"

    Examples:
      | field          |
      | Job Title      |
      | Subject        |
      | Location       |
      | Experience     |
