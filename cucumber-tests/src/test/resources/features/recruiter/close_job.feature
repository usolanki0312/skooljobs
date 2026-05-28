@recruiter @closeJob @requiresSchoolLogin
Feature: Close Job
  As a logged-in school admin
  I want to close an active job posting
  So that I can stop receiving new applications when the position is filled

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "Manage Jobs" section

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: School admin closes an Active job
    Given there is a job with status "Active"
    When I click the "Close" button or change status to "Closed" for that job
    Then the job status should change to "Closed"
    And I should see a success message "Job closed successfully"

  @positive
  Scenario: Closed job no longer accepts new applications from teachers
    Given a job "Science Teacher" has status "Closed"
    When a teacher views the job listing
    Then the "Apply" button should not be available for the closed job
    And the job should be marked as "Closed" or "No longer accepting applications"

  @positive
  Scenario: Closed jobs are still visible in the Manage Jobs list
    When I close an Active job
    Then the job should remain visible in the Manage Jobs table
    And its status should be "Closed"

  @positive
  Scenario: Closed job retains its applicant count
    Given an Active job has 4 applicants
    When I close the job
    Then the applicant count should still show 4 after closure

  @positive
  Scenario: School admin can repost a closed job
    Given there is a job with status "Closed"
    When I click the "Repost" button on the closed job
    Then the job status should change back to "Active"
    And I should see a success message "Job reposted successfully"

  @positive
  Scenario: Close job action shows a confirmation prompt
    When I click "Close" on an Active job
    Then a confirmation prompt should appear asking to confirm closing the job

  @positive
  Scenario: Cancelling the close action leaves the job Active
    When I click "Close" on an Active job
    And the confirmation prompt appears
    And I click "Cancel"
    Then the job status should remain "Active"

  @positive
  Scenario: Dashboard statistics update when a job is closed
    Given there is a count of Active jobs shown on the dashboard
    When I close one Active job
    Then the Active job count on the dashboard should decrease by 1

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Attempting to close an already closed job has no effect
    Given there is a job already with status "Closed"
    Then the "Close" action button should not be visible for that job
    Or clicking it should show "Job is already closed"

  @negative
  Scenario: Attempting to close a Draft job is not permitted
    Given there is a job with status "Draft"
    Then the "Close" action should not be available for the Draft job

  @negative
  Scenario: Unauthenticated user cannot close a job
    Given I am not logged in
    When I try to close a job via a direct request
    Then the request should be rejected with an authorisation error

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Close action button is visible only for Active jobs
    Then the "Close" button should be present on rows with "Active" status
    And the "Close" button should not be present on rows with "Closed" or "Draft" status

  @validation
  Scenario: Repost button is visible only for Closed jobs
    Then the "Repost" button should be present on rows with "Closed" status
    And the "Repost" button should not be present on rows with "Active" status

  @validation
  Scenario Outline: Job status transitions are valid
    Given a job is currently "<fromStatus>"
    When I perform the "<action>" action
    Then the job status should become "<toStatus>"

    Examples:
      | fromStatus | action | toStatus |
      | Active     | Close  | Closed   |
      | Closed     | Repost | Active   |
      | Draft      | Post   | Active   |
