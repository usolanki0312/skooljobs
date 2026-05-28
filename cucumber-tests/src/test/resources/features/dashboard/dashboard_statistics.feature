@dashboard @statistics
Feature: Dashboard Statistics
  As a logged-in user (teacher or school admin)
  I want to see an accurate summary of my activity on the dashboard
  So that I can quickly understand the state of my profile and jobs

  # ─── School Dashboard ────────────────────────────────────────────────────────

  @requiresSchoolLogin @school
  Scenario: School dashboard displays the correct stats cards
    Given I am logged in as a school admin with valid credentials
    When I navigate to the school dashboard
    Then the dashboard should show a "Total Jobs Posted" card
    And the dashboard should show a "Total Applicants" card
    And the dashboard should show an "Active Jobs" card
    And the dashboard should show a "Shortlisted" card

  @requiresSchoolLogin @school @positive @smoke
  Scenario: School dashboard stats reflect actual job and applicant data
    Given the school has posted 4 jobs and received 5 applications
    When I navigate to the school dashboard
    Then the "Total Jobs Posted" card should display 4
    And the "Total Applicants" card should display 5

  @requiresSchoolLogin @school @positive
  Scenario: Posting a new job increments the Total Jobs Posted count
    Given the "Total Jobs Posted" count is noted as N
    When I post a new job successfully
    And I return to the dashboard
    Then the "Total Jobs Posted" count should be N + 1

  @requiresSchoolLogin @school @positive
  Scenario: Shortlisting an applicant increments the Shortlisted count
    Given the "Shortlisted" count is noted as N
    When I shortlist a new applicant
    And I return to the dashboard
    Then the "Shortlisted" count should be N + 1

  @requiresSchoolLogin @school @positive
  Scenario: School dashboard displays a bar chart of job applications
    When I navigate to the school dashboard
    Then the dashboard should show a bar chart or graph
    And the chart should represent application trends over time

  @requiresSchoolLogin @school @positive
  Scenario: School dashboard shows the institute's name in the sidebar
    When I navigate to the school dashboard
    Then the sidebar should show the institute's name
    And the sidebar should show the school admin's email or role

  @requiresSchoolLogin @school @positive
  Scenario: Closing a job decreases the Active Jobs count
    Given the "Active Jobs" count is noted as N
    When I close an Active job
    And I return to the dashboard
    Then the "Active Jobs" count should be N - 1

  @requiresSchoolLogin @school @positive
  Scenario: Dashboard stats are all zero for a newly registered school
    Given I am a newly registered school with no jobs or applicants
    When I navigate to the school dashboard
    Then all statistics cards should show 0

  @requiresSchoolLogin @school @positive
  Scenario: School dashboard shows a "Total Applicants" widget separately
    When I navigate to the school dashboard
    Then there should be a dedicated "Total Applicants" widget on the dashboard
    And it should show the total count of all applicants across all jobs

  # ─── Teacher Dashboard ───────────────────────────────────────────────────────

  @requiresLogin @teacher @positive @smoke
  Scenario: Teacher dashboard loads and shows the teacher's name
    Given I am logged in as a teacher with valid credentials
    When I navigate to the teacher dashboard
    Then the dashboard should be displayed
    And the teacher's name should be visible on the page

  @requiresLogin @teacher @positive
  Scenario: Teacher dashboard shows application activity summary
    Given I am logged in as a teacher with valid credentials
    When I navigate to the teacher dashboard
    Then the dashboard should show the number of jobs applied to
    And the dashboard should show the profile completion percentage

  @requiresLogin @teacher @positive
  Scenario: Teacher dashboard shows recommended or latest job listings
    Given I am logged in as a teacher
    When I navigate to the teacher dashboard
    Then the dashboard should show recent or recommended jobs

  @requiresLogin @teacher @positive
  Scenario: Teacher dashboard has navigation to profile and job search
    Given I am logged in as a teacher
    When I navigate to the teacher dashboard
    Then the sidebar should contain a link to "My Profile"
    And the sidebar should contain a link to "Find Jobs"

  # ─── General Dashboard ───────────────────────────────────────────────────────

  @positive
  Scenario: Dashboard is not accessible without login
    Given I am not logged in
    When I navigate to the dashboard URL
    Then I should be redirected to the login page

  @positive
  Scenario: Dashboard correctly identifies and routes by role
    Given I am logged in as a school admin
    When I visit the root or dashboard path
    Then I should be on the school dashboard page

  @positive
  Scenario: Dashboard correctly routes teacher to teacher dashboard
    Given I am logged in as a teacher
    When I visit the root or dashboard path
    Then I should be on the teacher dashboard page

  @validation
  Scenario Outline: Dashboard statistics cards have correct labels
    Given I am logged in as a school admin with valid credentials
    When I navigate to the school dashboard
    Then the dashboard should contain a card labelled "<label>"

    Examples:
      | label               |
      | Total Jobs Posted   |
      | Total Applicants    |
      | Active Jobs         |
      | Shortlisted         |
