@applicants @reject @requiresSchoolLogin
Feature: Reject Candidate
  As a logged-in school admin
  I want to reject candidates who are not suitable
  So that I can focus on the most qualified applicants

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "All Applicants" section

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: School admin rejects an applicant with "Applied" status
    Given there is an applicant "Deepak Verma" with status "Applied"
    When I click the "Reject" button on "Deepak Verma"
    Then "Deepak Verma" status should change to "Rejected"
    And I should see a success message "Candidate rejected"

  @positive
  Scenario: Rejected status is reflected with a red badge
    Given I have rejected "Deepak Verma"
    Then the "Deepak Verma" row should show a red "Rejected" badge

  @positive
  Scenario: Rejecting a candidate does not remove them from All Applicants
    When I reject "Deepak Verma"
    Then "Deepak Verma" should still appear in the All Applicants list
    And their status should be "Rejected"

  @positive
  Scenario: School admin can reject a shortlisted candidate
    Given "Meena Gupta" has status "Shortlisted"
    When I click the "Reject" button on "Meena Gupta"
    Then "Meena Gupta" status should change to "Rejected"

  @positive
  Scenario: Reject action requires a confirmation prompt
    When I click the "Reject" button on an applicant
    Then a confirmation dialog should appear
    And the dialog should ask "Are you sure you want to reject this candidate?"

  @positive
  Scenario: Cancelling the rejection keeps the applicant's status unchanged
    Given "Deepak Verma" has status "Applied"
    When I click "Reject" and then click "Cancel" in the confirmation dialog
    Then "Deepak Verma" should retain their "Applied" status

  @positive
  Scenario: School admin can filter to view only rejected applicants
    Given there are both rejected and non-rejected applicants
    When I filter by status "Rejected"
    Then only rejected applicants should be displayed

  @positive
  Scenario: School admin can reject multiple applicants
    When I reject "Deepak Verma", "Rahul Singh", and "Kavita Nair"
    Then all three should show "Rejected" status

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Rejecting an already rejected applicant shows no change
    Given "Deepak Verma" already has status "Rejected"
    When I try to click the "Reject" button again
    Then I should see a message "Candidate is already rejected"
    Or the Reject button should be disabled or hidden

  @negative
  Scenario: Unauthenticated user cannot reject candidates
    Given I am not logged in
    When I try to perform a reject action
    Then I should be redirected to the login page

  @negative
  Scenario: Teacher cannot reject other teachers' applications
    Given I am logged in as a teacher
    When I navigate to All Applicants and try to reject an applicant
    Then I should be denied access or redirected

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Reject button is visible for applicable statuses
    Then the "Reject" button should be visible for applicants with "Applied" status
    And the "Reject" button should be visible for applicants with "Shortlisted" status
    And it should not be visible for applicants with "Rejected" status

  @validation
  Scenario: Rejected status persists after page refresh
    Given I have rejected "Deepak Verma"
    When I refresh the page
    Then "Deepak Verma" should still show "Rejected" status

  @validation
  Scenario Outline: Reject action availability depends on current status
    Given an applicant has status "<initialStatus>"
    Then the Reject button availability should be "<available>"

    Examples:
      | initialStatus | available |
      | Applied       | yes       |
      | Shortlisted   | yes       |
      | Rejected      | no        |
