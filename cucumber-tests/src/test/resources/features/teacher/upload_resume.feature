@teacher @resume @requiresLogin
Feature: Upload Resume
  As a logged-in teacher
  I want to upload and manage my resume
  So that schools can review my qualifications

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a teacher with valid credentials
    And I navigate to the teacher profile or resume section

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: Teacher uploads a valid PDF resume
    When I click the "Upload Resume" button
    And I select a valid PDF file "my_resume.pdf"
    Then the resume should be uploaded successfully
    And I should see a success message "Resume uploaded successfully"
    And the resume section should show the uploaded file name "my_resume.pdf"

  @positive
  Scenario: Teacher uploads a valid DOC resume
    When I click the "Upload Resume" button
    And I select a valid DOC file "my_resume.doc"
    Then the resume should be uploaded successfully
    And I should see a success message

  @positive
  Scenario: Teacher uploads a valid DOCX resume
    When I click the "Upload Resume" button
    And I select a valid DOCX file "my_resume.docx"
    Then the resume should be uploaded successfully

  @positive
  Scenario: Resume section shows download link after upload
    Given the teacher has already uploaded a resume
    Then the resume section should show a "Download Resume" link
    And clicking the download link should download the resume file

  @positive
  Scenario: Teacher can view their uploaded resume
    Given the teacher has already uploaded a resume "my_resume.pdf"
    When I click the "View Resume" button
    Then the resume should be opened or previewed

  @positive
  Scenario: Teacher can replace an existing resume
    Given the teacher has already uploaded a resume "old_resume.pdf"
    When I click the "Upload Resume" or "Replace Resume" button
    And I select a new file "new_resume.pdf"
    Then the new resume "new_resume.pdf" should replace "old_resume.pdf"
    And I should see a success message

  @positive
  Scenario: Teacher can delete their uploaded resume
    Given the teacher has already uploaded a resume
    When I click the "Delete Resume" button
    And I confirm the deletion
    Then the resume should be removed
    And the resume section should show the upload prompt again

  @positive
  Scenario: Resume upload preserves the original file name
    When I upload a resume with a specific file name "JohnDoe_CV_2025.pdf"
    Then the stored resume should retain the name "JohnDoe_CV_2025.pdf"

  @positive
  Scenario: Profile completeness increases after uploading resume
    Given the teacher's profile completion is less than 100%
    When I upload a valid resume
    Then the profile completion percentage should increase

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Uploading an unsupported file type is rejected
    When I try to upload a file "resume.exe"
    Then I should see an error message "Only PDF, DOC, and DOCX files are accepted"
    And the resume should not be updated

  @negative
  Scenario: Uploading an image file as a resume is rejected
    When I try to upload a file "photo.png" as a resume
    Then I should see an error message "Only PDF, DOC, and DOCX files are accepted"

  @negative
  Scenario: Uploading a file larger than the allowed size limit is rejected
    When I try to upload a resume file larger than 5MB
    Then I should see an error message about the file size limit
    And the resume should not be updated

  @negative
  Scenario: Uploading a zero-byte empty file is rejected
    When I try to upload an empty 0-byte file as a resume
    Then I should see an error message "File is empty or corrupted"

  @negative
  Scenario: Resume upload without selecting a file does nothing
    When I click the "Upload Resume" button
    And I dismiss the file picker without selecting a file
    Then no upload should occur
    And no error message should be shown

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Resume section is visible on the teacher profile page
    Then the teacher profile page should contain a resume section

  @validation
  Scenario: Upload button triggers a file picker dialog
    When I click the "Upload Resume" button
    Then a file selection dialog should be triggered

  @validation
  Scenario Outline: Accepted file types are correctly validated
    When I try to upload a file with extension "<extension>"
    Then the upload result should be "<result>"

    Examples:
      | extension | result   |
      | .pdf      | accepted |
      | .doc      | accepted |
      | .docx     | accepted |
      | .txt      | rejected |
      | .png      | rejected |
      | .exe      | rejected |
      | .zip      | rejected |
