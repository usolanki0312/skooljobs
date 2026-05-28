@recruiter @deleteJob @requiresSchoolLogin @cleanupJobs
Feature: Delete Job
  As a logged-in school admin
  I want to delete a job posting
  So that I can remove jobs that are no longer relevant

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And the school has at least one existing job posting
    And I navigate to the "Manage Jobs" section

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: School admin deletes an Active job successfully
    Given there is an Active job "Mathematics Teacher"
    When I click the "Delete" button on the "Mathematics Teacher" job
    And I confirm the deletion in the confirmation dialog
    Then the job "Mathematics Teacher" should be removed from the list
    And I should see a success message "Job deleted successfully"

  @positive
  Scenario: A confirmation dialog appears before deleting
    When I click the "Delete" button on a job
    Then a confirmation dialog should appear
    And the dialog should have a "Confirm" or "Yes, Delete" button
    And the dialog should have a "Cancel" button

  @positive
  Scenario: Cancelling the deletion keeps the job in the list
    When I click the "Delete" button on a job
    And the confirmation dialog appears
    And I click the "Cancel" button in the dialog
    Then the job should remain in the Manage Jobs list

  @positive
  Scenario: Job count on dashboard decreases after deletion
    Given the current total job count is noted
    When I delete a job and confirm
    Then the total job count on the dashboard should decrease by 1

  @positive
  Scenario: Deleting a draft job also removes it from the list
    Given there is a Draft job "Draft Position"
    When I click the "Delete" button on the "Draft Position" job
    And I confirm the deletion
    Then "Draft Position" should no longer appear in the Manage Jobs list

  @positive
  Scenario: Deleted job is no longer visible to teachers searching for jobs
    Given a job "Biology Teacher" is Active
    When I delete the job "Biology Teacher" from the school dashboard
    Then "Biology Teacher" should not appear in the teacher's job search results

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Deleting a job with active applicants shows a warning
    Given a job has 5 active applicants
    When I click the "Delete" button on that job
    Then a warning should be displayed saying the job has active applicants
    And I should be asked to confirm before deletion proceeds

  @negative
  Scenario: Unauthenticated user cannot delete a job
    Given I am not logged in
    When I try to delete a job via direct API call or URL
    Then the request should be rejected with an authorisation error

  @negative
  Scenario: School admin cannot delete another school's job
    Given I am logged in as school admin A
    When I attempt to delete a job posted by school admin B
    Then the deletion should be rejected with a "Not authorised" message

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Delete button is only shown on the school's own jobs
    Then each job row should show the "Delete" button only for jobs belonging to this school

  @validation
  Scenario: Manage Jobs list refreshes automatically after deletion
    When I delete a job and confirm
    Then the Manage Jobs table should refresh
    And the deleted job should no longer be visible without a page reload

  @validation
  Scenario Outline: Jobs with various statuses can be deleted
    Given there is a job with status "<status>"
    When I delete the job and confirm
    Then the job should be removed from the list

    Examples:
      | status  |
      | Active  |
      | Closed  |
      | Draft   |
