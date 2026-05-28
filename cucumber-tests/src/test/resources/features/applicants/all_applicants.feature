@applicants @allApplicants @requiresSchoolLogin
Feature: All Applicants
  As a logged-in school admin
  I want to view all candidates who have applied to my job postings
  So that I can review and manage the applicant pipeline

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "All Applicants" section in the school dashboard

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: All Applicants page displays a list of candidates
    Given at least one teacher has applied to a school job
    Then the All Applicants table should display at least one row
    And each row should show the applicant's photo, name, subject, experience, and status

  @positive
  Scenario: All Applicants table shows correct column headers
    Then the table should have the column "Applicant"
    And the table should have the column "Subject"
    And the table should have the column "Experience"
    And the table should have the column "Status"
    And the table should have the column "Actions"

  @positive
  Scenario: School admin can search applicants by name
    Given an applicant named "Alice Johnson" is in the list
    When I type "Alice" in the applicant search field
    Then only applicants with "Alice" in their name should be displayed

  @positive
  Scenario: School admin can filter applicants by subject
    Given there are applicants for "Mathematics" and "Science"
    When I select "Mathematics" from the subject filter
    Then only Mathematics applicants should be displayed

  @positive
  Scenario: School admin can filter applicants by experience level
    Given there are applicants with various experience levels
    When I select "2-5 Years" from the experience filter
    Then only applicants with that experience level should be displayed

  @positive
  Scenario: Combined search and filter narrows down results
    When I search for "Kumar" and filter by subject "Science"
    Then only applicants named "Kumar" who applied for Science should be shown

  @positive
  Scenario: Clearing filters restores the full applicant list
    When I apply a subject filter
    And I reset the subject filter to "All"
    Then all applicants should be displayed again

  @positive
  Scenario: Applicant status badges are colour-coded
    Then "New" or "Applied" status should show with a blue badge
    And "Shortlisted" status should show with a green badge
    And "Rejected" status should show with a red badge

  @positive
  Scenario: Applicant count widget on dashboard reflects the total
    Given there are 5 applicants in total
    Then the "Total Applicants" widget on the dashboard should show 5

  @positive
  Scenario: All Applicants section shows empty state when none applied
    Given no teacher has applied to any school jobs
    Then the section should display an empty state message
    And the message should suggest posting jobs to attract candidates

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Search with no matching name shows empty state
    When I search for "ZZZNoOneNamed999"
    Then the applicant table should be empty
    And a "No applicants found" message should be displayed

  @negative
  Scenario: Unauthenticated user cannot view All Applicants
    Given I am not logged in
    When I navigate directly to the all applicants URL
    Then I should be redirected to the login page

  @negative
  Scenario: Teacher cannot access the All Applicants page
    Given I am logged in as a teacher
    When I navigate directly to the all applicants section
    Then I should be redirected to the teacher dashboard

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Applicant search is case-insensitive
    Given an applicant named "Ravi Kumar" is in the list
    When I search for "ravi"
    Then "Ravi Kumar" should appear in the results

  @validation
  Scenario: Applicant photos show a default avatar if no photo is uploaded
    Given an applicant has not uploaded a profile photo
    Then the applicant row should show a default avatar or initials placeholder

  @validation
  Scenario Outline: Subject filter returns correct applicants
    Given there are applicants for subject "<subject>"
    When I filter by "<subject>"
    Then all returned applicants should have subject "<subject>"

    Examples:
      | subject     |
      | Mathematics |
      | Science     |
      | English     |
      | History     |
