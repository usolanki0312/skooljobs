package com.skooljobs.stepDefinitions;

import com.skooljobs.utils.TestContext;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;

public class TeacherSteps {

    private static final Logger log = LoggerFactory.getLogger(TeacherSteps.class);

    private final TestContext context;

    public TeacherSteps(TestContext context) {
        this.context = context;
    }

    // ─── Given ───────────────────────────────────────────────────────────────

    @Given("I navigate to the teacher profile page")
    public void iNavigateToTheTeacherProfilePage() {
        log.info("Navigating to teacher profile page");
        // TODO: navigate to /teacher-profile
    }

    @Given("the teacher has not uploaded a profile photo")
    public void theTeacherHasNotUploadedAProfilePhoto() {
        log.info("Pre-condition: teacher has no profile photo");
        // TODO: ensure test teacher account has no profile photo
    }

    @Given("I am on the edit teacher profile page")
    public void iAmOnTheEditTeacherProfilePage() {
        log.info("Navigating to edit teacher profile page");
        // TODO: navigate to /teacher-profile and click Edit Profile
    }

    @Given("the teacher has already uploaded a resume")
    public void theTeacherHasAlreadyUploadedAResume() {
        log.info("Pre-condition: teacher already has a resume uploaded");
        // TODO: ensure the test teacher has a resume via test data setup
    }

    @Given("the teacher has already uploaded a resume {string}")
    public void theTeacherHasAlreadyUploadedAResumeNamed(String fileName) {
        log.info("Pre-condition: teacher already has resume: {}", fileName);
        context.set("existingResume", fileName);
        // TODO: seed teacher with the named resume via test data
    }

    @Given("a teacher profile has no phone number set")
    public void aTeacherProfileHasNoPhoneNumberSet() {
        log.info("Pre-condition: teacher has no phone number");
        // TODO: ensure the teacher profile has no phone
    }

    @Given("the teacher is logged in with email {string}")
    public void theTeacherIsLoggedInWithEmail(String email) {
        log.info("Pre-condition: teacher logged in as {}", email);
        context.setCurrentUserEmail(email);
        context.setCurrentUserRole("teacher");
        context.setLoggedIn(true);
    }

    @Given("I am logged in as a school admin")
    public void iAmLoggedInAsASchoolAdmin() {
        log.info("Logging in as school admin");
        context.setCurrentUserRole("employer");
        context.setLoggedIn(true);
        // TODO: perform school admin login
    }

    @Given("the teacher's profile completion is less than {int}%")
    public void theTeachersProfileCompletionIsLessThan(int percentage) {
        log.info("Pre-condition: profile completion < {}%", percentage);
        // TODO: ensure teacher profile is incomplete
    }

    // ─── When ────────────────────────────────────────────────────────────────

    @When("I am on the teacher dashboard")
    public void iAmOnTheTeacherDashboard() {
        log.info("Navigating to teacher dashboard");
        // TODO: navigate to /dashboard
    }

    @When("I click {string} in the sidebar navigation")
    public void iClickInTheSidebarNavigation(String navItem) {
        log.info("Clicking sidebar nav item: {}", navItem);
        // TODO: click the sidebar link with text navItem
    }

    @When("I navigate to the teacher dashboard")
    public void iNavigateToTheTeacherDashboard() {
        log.info("Navigating to teacher dashboard");
        // TODO: navigate to /dashboard
    }

    @When("I navigate directly to the teacher profile URL")
    public void iNavigateDirectlyToTheTeacherProfileURL() {
        log.info("Navigating directly to teacher profile URL");
        // TODO: navigate to /teacher-profile without being logged in
    }

    @When("the teacher profile page loads")
    public void theTeacherProfilePageLoads() {
        log.info("Waiting for teacher profile page to load");
        // TODO: wait for profile page to fully render
    }

    @When("I view the teacher profile page")
    public void iViewTheTeacherProfilePage() {
        log.info("Viewing teacher profile page");
        // TODO: navigate to /teacher-profile
    }

    // ─── Edit Profile Steps ───────────────────────────────────────────────────

    @When("I clear the first name field and type {string}")
    public void iClearTheFirstNameFieldAndType(String firstName) {
        log.info("Updating first name to: {}", firstName);
        context.set("updatedFirstName", firstName);
        // TODO: clear and fill the first name input
    }

    @When("I clear the last name field and type {string}")
    public void iClearTheLastNameFieldAndType(String lastName) {
        log.info("Updating last name to: {}", lastName);
        context.set("updatedLastName", lastName);
        // TODO: clear and fill the last name input
    }

    @When("I update the phone number to {string}")
    public void iUpdateThePhoneNumberTo(String phone) {
        log.info("Updating phone number to: {}", phone);
        context.set("updatedPhone", phone);
        // TODO: fill the phone number input
    }

    @When("I update the city to {string}")
    public void iUpdateTheCityTo(String city) {
        log.info("Updating city to: {}", city);
        context.set("updatedCity", city);
        // TODO: fill the city input
    }

    @When("I update the subject to {string}")
    public void iUpdateTheSubjectTo(String subject) {
        log.info("Updating subject to: {}", subject);
        context.set("updatedSubject", subject);
        // TODO: fill or select the subject field
    }

    @When("I update the experience field to {string}")
    public void iUpdateTheExperienceFieldTo(String experience) {
        log.info("Updating experience to: {}", experience);
        context.set("updatedExperience", experience);
        // TODO: fill the experience input
    }

    @When("I update the expected salary to {string}")
    public void iUpdateTheExpectedSalaryTo(String salary) {
        log.info("Updating expected salary to: {}", salary);
        context.set("updatedSalary", salary);
        // TODO: fill the salary input
    }

    @When("I update the bio to {string}")
    public void iUpdateTheBioTo(String bio) {
        log.info("Updating bio");
        context.set("updatedBio", bio);
        // TODO: fill the bio/about textarea
    }

    @When("I clear the first name field")
    public void iClearTheFirstNameField() {
        log.info("Clearing first name field");
        // TODO: clear the first name input
    }

    @When("I clear the last name field")
    public void iClearTheLastNameField() {
        log.info("Clearing last name field");
        // TODO: clear the last name input
    }

    @When("I update the first name to {string}")
    public void iUpdateTheFirstNameTo(String firstName) {
        log.info("Updating first name to: {}", firstName);
        context.set("updatedFirstName", firstName);
        // TODO: fill first name input
    }

    @When("I upload a valid profile image file {string}")
    public void iUploadAValidProfileImageFile(String fileName) {
        log.info("Uploading profile image: {}", fileName);
        context.set("uploadedPhoto", fileName);
        // TODO: trigger file upload and select the given file
    }

    @When("I try to upload a file {string} as a profile photo")
    public void iTryToUploadAFileAsAProfilePhoto(String fileName) {
        log.info("Attempting to upload file as photo: {}", fileName);
        // TODO: trigger file upload and attempt to upload this file
    }

    @When("I try to upload an image larger than 5MB")
    public void iTryToUploadAnImageLargerThan5MB() {
        log.info("Attempting to upload oversized image");
        // TODO: create or use a test image > 5MB and attempt upload
    }

    // ─── Upload Resume Steps ──────────────────────────────────────────────────

    @When("I click the {string} button")
    public void iClickTheNamedButton(String buttonText) {
        log.info("Clicking button: {}", buttonText);
        // TODO: find button by text and click it — reuse from AuthenticationSteps if possible
    }

    @When("I select a valid PDF file {string}")
    public void iSelectAValidPdfFile(String fileName) {
        log.info("Selecting PDF file: {}", fileName);
        context.set("uploadedResume", fileName);
        // TODO: attach file to upload input
    }

    @When("I select a valid DOC file {string}")
    public void iSelectAValidDocFile(String fileName) {
        log.info("Selecting DOC file: {}", fileName);
        context.set("uploadedResume", fileName);
        // TODO: attach file to upload input
    }

    @When("I try to upload a file {string}")
    public void iTryToUploadAFile(String fileName) {
        log.info("Attempting to upload: {}", fileName);
        context.set("uploadAttempt", fileName);
        // TODO: attach file to upload input and observe result
    }

    @When("I try to upload a resume file larger than 5MB")
    public void iTryToUploadAResumeFileLargerThan5MB() {
        log.info("Attempting to upload oversized resume");
        // TODO: use a test file > 5MB
    }

    @When("I try to upload an empty 0-byte file as a resume")
    public void iTryToUploadAnEmpty0ByteFileAsAResume() {
        log.info("Attempting to upload empty file");
        // TODO: create and upload an empty file
    }

    @When("I upload a resume with a specific file name {string}")
    public void iUploadAResumeWithASpecificFileName(String fileName) {
        log.info("Uploading resume: {}", fileName);
        context.set("uploadedResume", fileName);
        // TODO: attach file and submit
    }

    @When("I upload a valid resume")
    public void iUploadAValidResume() {
        log.info("Uploading a valid resume file");
        context.set("uploadedResume", "valid_resume.pdf");
        // TODO: attach a valid PDF resume
    }

    @When("I click the {string} or {string} button")
    public void iClickTheOrButton(String buttonText1, String buttonText2) {
        log.info("Clicking button '{}' or '{}'", buttonText1, buttonText2);
        // TODO: find first matching button by text
    }

    @When("I dismiss the file picker without selecting a file")
    public void iDismissTheFilePickerWithoutSelectingAFile() {
        log.info("Dismissing file picker without selection");
        // TODO: cancel the file picker dialog
    }

    @When("I confirm the deletion")
    public void iConfirmTheDeletion() {
        log.info("Confirming deletion");
        // TODO: click confirm/yes button in the deletion dialog
    }

    // ─── Then ────────────────────────────────────────────────────────────────

    @Then("the teacher profile page should be displayed")
    public void theTeacherProfilePageShouldBeDisplayed() {
        log.info("Asserting teacher profile page is displayed");
        // TODO: assert profile page heading or element is visible
    }

    @Then("the profile should show the teacher's name")
    public void theProfileShouldShowTheTeachersName() {
        log.info("Asserting teacher name is visible on profile");
        assertNotNull(context.getCurrentUserEmail(), "User email should be set in context");
        // TODO: assert name element text is not empty
    }

    @Then("the profile page should show the {string} section")
    public void theProfilePageShouldShowTheSection(String sectionName) {
        log.info("Asserting section is visible: {}", sectionName);
        // TODO: assert section with label sectionName is present
    }

    @Then("the section should display the teacher's full name")
    public void theSectionShouldDisplayTheTeachersFullName() {
        // TODO: assert full name text is not empty
    }

    @Then("the section should display the teacher's email address")
    public void theSectionShouldDisplayTheTeachersEmailAddress() {
        String email = context.getCurrentUserEmail();
        assertNotNull(email, "Email should not be null");
        // TODO: assert email text on page equals context email
    }

    @Then("the profile page should have an {string} button")
    public void theProfilePageShouldHaveAButton(String buttonLabel) {
        log.info("Asserting button is present: {}", buttonLabel);
        // TODO: assert button with text buttonLabel is visible
    }

    @Then("the profile page should display the account status as {string}")
    public void theProfilePageShouldDisplayTheAccountStatusAs(String status) {
        log.info("Asserting account status: {}", status);
        // TODO: assert status element shows the expected status
    }

    @Then("the sidebar should display the logged-in teacher's name")
    public void theSidebarShouldDisplayTheLoggedInTeachersName() {
        log.info("Asserting teacher name in sidebar");
        // TODO: assert sidebar name element is not empty
    }

    @Then("the displayed email should match {string}")
    public void theDisplayedEmailShouldMatch(String expectedEmail) {
        log.info("Asserting displayed email: {}", expectedEmail);
        assertEquals(expectedEmail, context.getCurrentUserEmail());
        // TODO: also assert the UI element text
    }

    @Then("the phone number field should show a placeholder or {string} text")
    public void thePhoneNumberFieldShouldShowAPlaceholderOrText(String placeholder) {
        log.info("Asserting phone placeholder: {}", placeholder);
        // TODO: assert phone field shows empty or placeholder text
    }

    @Then("the profile page should contain the label {string}")
    public void theProfilePageShouldContainTheLabel(String label) {
        log.info("Asserting label is visible: {}", label);
        // TODO: assert label element with text label is present
    }

    @Then("I should see a success message {string}")
    public void iShouldSeeSuccessMessage(String expected) {
        log.info("Asserting success message: {}", expected);
        // TODO: assert toast or success message contains expected
    }

    @Then("the profile page should show {string} as the name")
    public void theProfilePageShouldShowAsTheName(String name) {
        log.info("Asserting profile name: {}", name);
        // TODO: assert name element text equals name
    }

    @Then("the profile should display {string} in the phone field")
    public void theProfileShouldDisplayInThePhoneField(String phone) {
        log.info("Asserting phone field value: {}", phone);
        // TODO: assert phone text element value
    }

    @Then("the resume should be uploaded successfully")
    public void theResumeShouldBeUploadedSuccessfully() {
        log.info("Asserting resume upload success");
        // TODO: assert success indicator is visible
    }

    @Then("the resume section should show the uploaded file name {string}")
    public void theResumeSectionShouldShowTheUploadedFileName(String fileName) {
        log.info("Asserting resume file name: {}", fileName);
        // TODO: assert file name text is displayed in the resume section
    }

    @Then("the resume section should show a {string} link")
    public void theResumeSectionShouldShowALink(String linkText) {
        log.info("Asserting link is visible: {}", linkText);
        // TODO: assert link with text linkText is present
    }

    @Then("I should see an error message {string}")
    public void iShouldSeeAnErrorMessageText(String expected) {
        log.info("Asserting error message: {}", expected);
        // TODO: assert error or rejection message text contains expected
    }

    @Then("no upload should occur")
    public void noUploadShouldOccur() {
        log.info("Asserting no upload happened");
        // TODO: assert the resume file name is unchanged
    }

    @Then("the upload result should be {string}")
    public void theUploadResultShouldBe(String result) {
        log.info("Asserting upload result: {}", result);
        // TODO: assert accepted or rejected state based on file extension
    }
}
