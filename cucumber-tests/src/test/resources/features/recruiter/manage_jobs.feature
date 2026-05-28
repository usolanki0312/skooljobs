@recruiter @manageJobs @requiresSchoolLogin
Feature: Manage Jobs
  As a logged-in school admin
  I want to view and manage all posted jobs
  So that I can keep the job listings up-to-date

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "Manage Jobs" section in the school dashboard

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: Manage Jobs page displays a list of posted jobs
    Given the school has at least one posted job
    Then the Manage Jobs table should display at least one job row
    And each row should show job title, applicant count, status, date, and actions

  @positive
  Scenario: Manage Jobs table shows correct column headers
    Then the table should have the column "Job Title"
    And the table should have the column "Applicants"
    And the table should have the column "Status"
    And the table should have the column "Date"
    And the table should have the column "Actions"

  @positive
  Scenario: Active jobs show Edit, Delete, and View actions
    Given there is at least one job with status "Active"
    Then the Active job row should have an "Edit" action button
    And the Active job row should have a "Delete" action button
    And the Active job row should have a "View" action button

  @positive
  Scenario: Closed jobs show Edit and Repost actions
    Given there is at least one job with status "Closed"
    Then the Closed job row should have an "Edit" action button
    And the Closed job row should have a "Repost" action button

  @positive
  Scenario: School admin can search for a job by title
    Given the school has posted jobs including "Mathematics Teacher"
    When I type "Mathematics" in the search field
    Then only jobs containing "Mathematics" in the title should be displayed

  @positive
  Scenario: Search clears to show all jobs
    When I type "Mathematics" in the search field
    And I clear the search field
    Then all jobs should be displayed again

  @positive
  Scenario: Job count badge shows number of applicants per job
    Given a job "Science Teacher" has 3 applicants
    Then the "Science Teacher" row should show "3" in the applicants column

  @positive
  Scenario: Status badge shows correct colours
    Given there are jobs with different statuses
    Then "Active" status should display with a green badge
    And "Closed" status should display with a red or grey badge
    And "Draft" status should display with a yellow badge

  @positive
  Scenario: Manage Jobs page shows empty state when no jobs are posted
    Given the school has no posted jobs
    Then the Manage Jobs section should display an empty state message
    And a "Post Your First Job" button or link should be visible

  @positive
  Scenario: Reposting a closed job changes its status to Active
    Given there is a job with status "Closed"
    When I click the "Repost" button for that job
    Then the job status should change to "Active"

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Search with no matching results shows empty state
    When I type "ZZZNoMatchXXX" in the job search field
    Then the table should show no results
    And a "No jobs found" message should be displayed

  @negative
  Scenario: Unauthenticated user cannot access Manage Jobs
    Given I am not logged in
    When I navigate directly to the manage jobs section
    Then I should be redirected to the login page

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Job search is case-insensitive
    Given a job "Mathematics Teacher" is in the list
    When I search for "mathematics"
    Then the job "Mathematics Teacher" should appear in the results

  @validation
  Scenario: Job search works with partial title match
    Given a job "Mathematics Teacher" is in the list
    When I search for "Math"
    Then the job "Mathematics Teacher" should appear in the results

  @validation
  Scenario Outline: Different job statuses are represented correctly
    Given a job exists with status "<status>"
    Then the job row should show "<displayLabel>" as the status badge

    Examples:
      | status  | displayLabel |
      | Active  | Active       |
      | Closed  | Closed       |
      | Draft   | Draft        |
