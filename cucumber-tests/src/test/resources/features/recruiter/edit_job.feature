@recruiter @editJob @requiresSchoolLogin @cleanupJobs
Feature: Edit Job
  As a logged-in school admin
  I want to edit an existing job posting
  So that I can update job details when requirements change

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And the school has at least one existing job posting
    And I click the "Edit" button on an existing job

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: Edit form is pre-populated with existing job data
    Then the job title field should contain the existing job title
    And the subject field should contain the existing subject
    And the location field should contain the existing location
    And the employment type should reflect the existing selection

  @positive
  Scenario: School admin updates the job title
    When I update the job title to "Senior Mathematics Teacher"
    And I click the "Save Changes" button
    Then the job should be updated with the title "Senior Mathematics Teacher"
    And I should see a success message "Job updated successfully"

  @positive
  Scenario: School admin updates the salary range
    When I update the salary to "55000-65000"
    And I click the "Save Changes" button
    Then the updated salary should be reflected in the Manage Jobs table

  @positive
  Scenario: School admin updates the job description
    When I update the job description with new content
    And I click the "Save Changes" button
    Then I should see a success message "Job updated successfully"

  @positive
  Scenario: School admin changes the employment type
    When I change the employment type from "Full-Time" to "Part-Time"
    And I click the "Save Changes" button
    Then the job should show "Part-Time" as the employment type

  @positive
  Scenario: School admin can edit a draft job and publish it
    Given there is a job with status "Draft"
    When I open the draft job for editing
    And I complete any missing required fields
    And I click the "Publish Job" button
    Then the job status should change from "Draft" to "Active"

  @positive
  Scenario: Editing a job does not change the applicant count
    Given a job has 3 applicants
    When I edit the job title and save
    Then the job should still show 3 applicants

  @positive
  Scenario: Cancel edit discards changes
    When I update the job title to "Temporary Title"
    And I click the "Cancel" button
    Then the job title should remain unchanged
    And I should be redirected back to the Manage Jobs section

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Edit job fails when job title is removed
    When I clear the job title field
    And I click the "Save Changes" button
    Then I should see a validation error "Job title is required"
    And the job should not be saved

  @negative
  Scenario: Edit job fails when required subject is removed
    When I clear the subject field
    And I click the "Save Changes" button
    Then I should see a validation error "Subject is required"

  @negative
  Scenario: Edit job fails when required location is removed
    When I clear the location field
    And I click the "Save Changes" button
    Then I should see a validation error "Location is required"

  @negative
  Scenario: Editing another school's job is not permitted
    Given I am logged in as school admin A
    When I try to edit a job that belongs to school admin B
    Then I should see a "Not authorised" error message
    Or I should be redirected away from the edit form

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Edit form submission is blocked when no changes are made
    When I open the edit form and make no changes
    And I click the "Save Changes" button
    Then the system should either save without error or notify "No changes to save"

  @validation
  Scenario Outline: Required fields cannot be cleared during edit
    When I clear the "<field>" field in the edit form
    And I click the "Save Changes" button
    Then I should see a validation error for "<field>"

    Examples:
      | field       |
      | Job Title   |
      | Subject     |
      | Location    |
