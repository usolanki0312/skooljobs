@applicants @saveCandidate @requiresSchoolLogin
Feature: Save Candidate
  As a logged-in school admin
  I want to save interesting candidates for later review
  So that I can build a shortlist over time without making an immediate decision

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "All Applicants" section

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: School admin saves a candidate from the applicants list
    Given there is an applicant "Priya Sharma" in the list
    When I click the "Save" or bookmark icon on "Priya Sharma"
    Then "Priya Sharma" should be added to the Saved Candidates section
    And I should see a success indicator or toast notification

  @positive
  Scenario: Saved candidate appears in the Saved Candidates section
    Given I have saved "Ravi Kumar" as a candidate
    When I navigate to the "Saved Candidates" section
    Then "Ravi Kumar" should appear in the Saved Candidates list

  @positive
  Scenario: Save icon changes state after saving a candidate
    When I click the save icon on an applicant
    Then the save icon should change to a filled or highlighted state
    And hovering over it should show "Saved" or "Remove from Saved"

  @positive
  Scenario: School admin can save multiple candidates
    When I save candidates "Alice", "Bob", and "Charlie"
    And I navigate to the Saved Candidates section
    Then all three candidates "Alice", "Bob", and "Charlie" should be listed

  @positive
  Scenario: Saved candidates count is shown in the dashboard sidebar
    When I save a new candidate
    Then the Saved Candidates count or badge in the sidebar should update

  @positive
  Scenario: School admin can remove a candidate from saved list
    Given "Priya Sharma" is in the Saved Candidates list
    When I click the "Remove" or un-save button for "Priya Sharma"
    Then "Priya Sharma" should be removed from the Saved Candidates list

  @positive
  Scenario: Removing a saved candidate does not affect their application status
    Given "Ravi Kumar" is saved and has status "Applied"
    When I remove "Ravi Kumar" from saved candidates
    Then "Ravi Kumar" should still appear in All Applicants with status "Applied"

  @positive
  Scenario: Saved candidates list shows basic candidate details
    When I navigate to the Saved Candidates section
    Then each saved candidate should display their name
    And each entry should show their subject and experience

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: School admin cannot save the same candidate twice
    Given "Priya Sharma" is already in the Saved Candidates list
    When I try to save "Priya Sharma" again
    Then I should see a message "Candidate already saved"
    Or the save icon should already show the saved state

  @negative
  Scenario: Saved Candidates section shows empty state when none are saved
    Given no candidates have been saved
    When I navigate to the Saved Candidates section
    Then an empty state message should be displayed
    And I should be prompted to browse applicants to save candidates

  @negative
  Scenario: Unauthenticated user cannot access Saved Candidates
    Given I am not logged in
    When I navigate to the Saved Candidates section
    Then I should be redirected to the login page

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Save action is available from the All Applicants section
    Then each applicant row in the All Applicants list should have a save icon or button

  @validation
  Scenario: Save state persists across page refreshes
    Given I have saved "Priya Sharma"
    When I refresh the page
    Then "Priya Sharma" should still appear as saved in the Saved Candidates section

  @validation
  Scenario: Saved candidates count matches the actual saved list
    Given I have saved 3 candidates
    When I view the Saved Candidates section
    Then the list should contain exactly 3 entries
