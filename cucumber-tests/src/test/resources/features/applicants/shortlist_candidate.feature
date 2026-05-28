@applicants @shortlist @requiresSchoolLogin
Feature: Shortlist Candidate
  As a logged-in school admin
  I want to shortlist candidates from the applicant pool
  So that I can move qualified teachers forward in the hiring process

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "All Applicants" section

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: School admin shortlists an applicant with "New" or "Applied" status
    Given there is an applicant "Sunita Rao" with status "Applied"
    When I click the "Shortlist" button on "Sunita Rao"
    Then "Sunita Rao" status should change to "Shortlisted"
    And I should see a success message "Candidate shortlisted"

  @positive
  Scenario: Shortlisted status is reflected with a green badge
    Given I have shortlisted "Sunita Rao"
    Then the "Sunita Rao" row should show a green "Shortlisted" badge

  @positive
  Scenario: Shortlisting an applicant does not remove them from All Applicants
    When I shortlist "Sunita Rao"
    Then "Sunita Rao" should still appear in the All Applicants list
    And their status should be "Shortlisted"

  @positive
  Scenario: School admin can shortlist multiple candidates
    When I shortlist "Alice Johnson", "Bob Sharma", and "Priya Patel"
    Then all three should show "Shortlisted" status in the applicants list

  @positive
  Scenario: Shortlisted count appears in dashboard statistics
    Given the current shortlisted count is noted
    When I shortlist a new applicant
    Then the shortlisted count should increase by 1

  @positive
  Scenario: School admin can view only shortlisted applicants using a filter
    Given there are both shortlisted and non-shortlisted applicants
    When I filter applicants by status "Shortlisted"
    Then only shortlisted applicants should be displayed

  @positive
  Scenario: Shortlisted applicant can still be rejected
    Given "Sunita Rao" has status "Shortlisted"
    When I click the "Reject" button on "Sunita Rao"
    Then "Sunita Rao" status should change to "Rejected"

  @positive
  Scenario: School admin can view a shortlisted applicant's resume
    Given "Sunita Rao" is shortlisted and has uploaded a resume
    When I click the "Resume" or "View Resume" button in her row
    Then the resume should open or be available for download

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Shortlisting an already shortlisted applicant shows no change
    Given "Sunita Rao" already has status "Shortlisted"
    When I try to click the "Shortlist" button again
    Then I should see a message "Candidate is already shortlisted"
    Or the Shortlist button should be disabled

  @negative
  Scenario: Unauthenticated user cannot shortlist candidates
    Given I am not logged in
    When I try to perform a shortlist action
    Then I should be redirected to the login page

  @negative
  Scenario: Teacher cannot shortlist other applicants
    Given I am logged in as a teacher
    When I try to navigate to All Applicants and shortlist someone
    Then I should be redirected or denied access

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Shortlist button is only visible for applicable statuses
    Then the "Shortlist" button should be visible for applicants with "Applied" status
    And it should not be visible for applicants already with "Shortlisted" status

  @validation
  Scenario: Status change to Shortlisted is persisted after page refresh
    Given I have shortlisted "Sunita Rao"
    When I refresh the page
    Then "Sunita Rao" should still show "Shortlisted" status

  @validation
  Scenario Outline: Shortlist action is available for the correct initial statuses
    Given an applicant has status "<initialStatus>"
    Then the Shortlist button availability should be "<available>"

    Examples:
      | initialStatus | available |
      | Applied       | yes       |
      | New           | yes       |
      | Shortlisted   | no        |
      | Rejected      | no        |
