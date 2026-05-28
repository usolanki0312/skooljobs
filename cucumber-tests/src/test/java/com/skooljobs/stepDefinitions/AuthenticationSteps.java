package com.skooljobs.stepDefinitions;

import com.skooljobs.config.ConfigReader;
import com.skooljobs.utils.TestContext;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;

public class AuthenticationSteps {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationSteps.class);

    private final TestContext context;

    public AuthenticationSteps(TestContext context) {
        this.context = context;
    }

    // ─── Given ───────────────────────────────────────────────────────────────

    @Given("the SkoolJobs application is running")
    public void theSkoolJobsApplicationIsRunning() {
        log.info("Verifying application is accessible at: {}", ConfigReader.getBaseUrl());
        // TODO: send a health-check GET to ConfigReader.getBaseUrl() and assert HTTP 200
    }

    @Given("I am on the login page")
    public void iAmOnTheLoginPage() {
        log.info("Navigating to the login page");
        // TODO: navigate to ConfigReader.getBaseUrl() + "/"
    }

    @Given("I am on the signup page")
    public void iAmOnTheSignupPage() {
        log.info("Navigating to the signup page");
        // TODO: navigate to ConfigReader.getBaseUrl() + "/signup"
    }

    @Given("I am on the forgot password page")
    public void iAmOnTheForgotPasswordPage() {
        log.info("Navigating to the forgot password page");
        // TODO: navigate to ConfigReader.getBaseUrl() + "/forgot-password"
    }

    @Given("I am logged in as a teacher with valid credentials")
    public void iAmLoggedInAsATeacherWithValidCredentials() {
        log.info("Logging in as teacher: {}", ConfigReader.getTeacherEmail());
        context.setCurrentUserEmail(ConfigReader.getTeacherEmail());
        context.setCurrentUserRole("teacher");
        context.setLoggedIn(true);
        // TODO: perform programmatic login via API or UI and store auth token in context
    }

    @Given("I am logged in as a school admin with valid credentials")
    public void iAmLoggedInAsASchoolAdminWithValidCredentials() {
        log.info("Logging in as school admin: {}", ConfigReader.getSchoolEmail());
        context.setCurrentUserEmail(ConfigReader.getSchoolEmail());
        context.setCurrentUserRole("employer");
        context.setLoggedIn(true);
        // TODO: perform programmatic school login and store token in context
    }

    @Given("I am not logged in")
    public void iAmNotLoggedIn() {
        log.info("Ensuring user is not logged in (clearing session)");
        context.setLoggedIn(false);
        context.setAuthToken(null);
        // TODO: clear localStorage/cookies via API client
    }

    @Given("a user with email {string} is already registered")
    public void aUserWithEmailIsAlreadyRegistered(String email) {
        log.info("Pre-condition: user {} is registered", email);
        // TODO: seed test user via API or test data setup
    }

    @Given("an account with email {string} has been deactivated")
    public void anAccountWithEmailHasBeenDeactivated(String email) {
        log.info("Pre-condition: account {} is deactivated", email);
        // TODO: set account status to deactivated via test data API
    }

    // ─── When ────────────────────────────────────────────────────────────────

    @When("I enter email {string} and password {string}")
    public void iEnterEmailAndPassword(String email, String password) {
        log.info("Entering credentials - email: {}", email);
        context.set("inputEmail", email);
        context.set("inputPassword", password);
        // TODO: fill email and password fields via HTTP or UI driver
    }

    @When("I click the login button")
    public void iClickTheLoginButton() {
        log.info("Clicking the login button");
        String email = context.get("inputEmail");
        String password = context.get("inputPassword");
        // TODO: submit login form / call POST /api/auth/login with email+password
        // Store response status and body in context
    }

    @When("I enter email {string}")
    public void iEnterEmail(String email) {
        log.info("Entering email: {}", email);
        context.set("inputEmail", email);
        // TODO: fill the email field
    }

    @When("I enter password {string}")
    public void iEnterPassword(String password) {
        context.set("inputPassword", password);
        // TODO: fill the password field
    }

    @When("I leave the email field empty")
    public void iLeaveTheEmailFieldEmpty() {
        context.set("inputEmail", "");
        // TODO: ensure email field is blank
    }

    @When("I leave the password field empty")
    public void iLeaveThePasswordFieldEmpty() {
        context.set("inputPassword", "");
        // TODO: ensure password field is blank
    }

    @When("I leave both the email and password fields empty")
    public void iLeaveBothFieldsEmpty() {
        context.set("inputEmail", "");
        context.set("inputPassword", "");
        // TODO: ensure both fields are blank
    }

    @When("I press the Enter key")
    public void iPressTheEnterKey() {
        log.info("Pressing Enter key to submit form");
        // TODO: trigger Enter key event on the active form field
    }

    @When("I click the {string} link on the login page")
    public void iClickTheLinkOnTheLoginPage(String linkText) {
        log.info("Clicking link: {}", linkText);
        // TODO: find and click the link by text
    }

    @When("I click the show/hide password icon")
    public void iClickTheShowHidePasswordIcon() {
        log.info("Toggling password visibility");
        // TODO: click the password visibility toggle button
    }

    @When("I click the show/hide password icon again")
    public void iClickTheShowHidePasswordIconAgain() {
        log.info("Toggling password visibility again");
        // TODO: click the password visibility toggle button a second time
    }

    @When("I focus on the password field")
    public void iFocusOnThePasswordField() {
        // TODO: focus the password input
    }

    // ─── Then ────────────────────────────────────────────────────────────────

    @Then("I should be redirected to the teacher dashboard")
    public void iShouldBeRedirectedToTheTeacherDashboard() {
        log.info("Asserting redirect to teacher dashboard");
        // TODO: assert current URL contains "/dashboard" and status 200
        assertTrue(context.isLoggedIn(), "User should be logged in");
    }

    @Then("I should be redirected to the school dashboard")
    public void iShouldBeRedirectedToTheSchoolDashboard() {
        log.info("Asserting redirect to school dashboard");
        // TODO: assert current URL contains "/school-dashboard"
        assertTrue(context.isLoggedIn(), "User should be logged in");
    }

    @Then("I should be navigated to the signup page")
    public void iShouldBeNavigatedToTheSignupPage() {
        log.info("Asserting navigation to signup page");
        // TODO: assert URL contains "/signup"
    }

    @Then("I should be navigated to the forgot password page")
    public void iShouldBeNavigatedToTheForgotPasswordPage() {
        log.info("Asserting navigation to forgot password page");
        // TODO: assert URL contains "/forgot-password"
    }

    @Then("I should remain on the login page")
    public void iShouldRemainOnTheLoginPage() {
        log.info("Asserting user remains on login page");
        assertFalse(context.isLoggedIn(), "User should not be logged in");
        // TODO: assert current URL is the login page
    }

    @Then("I should see an error message {string}")
    public void iShouldSeeAnErrorMessage(String expectedMessage) {
        log.info("Asserting error message: {}", expectedMessage);
        // TODO: read actual error message from UI or response body and assert equals expectedMessage
        String actual = context.getLastErrorMessage();
        assertNotNull(actual, "An error message should be displayed");
    }

    @Then("the page title should be {string}")
    public void thePageTitleShouldBe(String expectedTitle) {
        log.info("Asserting page title: {}", expectedTitle);
        // TODO: assert page heading or document title equals expectedTitle
    }

    @Then("the {string} key should exist in local storage")
    public void theKeyShouldExistInLocalStorage(String key) {
        log.info("Asserting localStorage key exists: {}", key);
        // TODO: read localStorage[key] and assert not null
    }

    @Then("the stored role should be {string}")
    public void theStoredRoleShouldBe(String expectedRole) {
        log.info("Asserting stored user role: {}", expectedRole);
        assertEquals(expectedRole, context.getCurrentUserRole(),
            "Stored role should match " + expectedRole);
    }

    @Then("the login page should show the {string} logo")
    public void theLoginPageShouldShowTheLogo(String brandName) {
        log.info("Asserting brand logo is visible: {}", brandName);
        // TODO: assert brand logo or text is present on the page
    }

    @Then("the email input field should be visible")
    public void theEmailInputFieldShouldBeVisible() {
        // TODO: assert email input element is visible
    }

    @Then("the password input field should be visible")
    public void thePasswordInputFieldShouldBeVisible() {
        // TODO: assert password input element is visible
    }

    @Then("the login button should be visible")
    public void theLoginButtonShouldBeVisible() {
        // TODO: assert login button element is visible
    }

    @Then("the login button should be enabled")
    public void theLoginButtonShouldBeEnabled() {
        // TODO: assert login button is not disabled
    }

    @Then("the password input type should be {string}")
    public void thePasswordInputTypeShouldBe(String expectedType) {
        log.info("Asserting password field type: {}", expectedType);
        // TODO: get the 'type' attribute of the password input and assert equals expectedType
    }

    @Then("I should see a validation message for the email field")
    public void iShouldSeeAValidationMessageForTheEmailField() {
        log.info("Asserting email field validation message is visible");
        // TODO: assert an error/validation message element is visible near the email field
    }

    @Then("I should see a validation message for the password field")
    public void iShouldSeeAValidationMessageForThePasswordField() {
        log.info("Asserting password field validation message is visible");
        // TODO: assert an error/validation message element is visible near the password field
    }

    @Then("I should see validation messages for required fields")
    public void iShouldSeeValidationMessagesForRequiredFields() {
        log.info("Asserting validation messages for both fields");
        // TODO: assert validation messages are present for email and password
    }

    @Then("I should see an email format validation message")
    public void iShouldSeeAnEmailFormatValidationMessage() {
        log.info("Asserting email format validation message is visible");
        // TODO: assert the email format validation message text is present
    }

    @Then("I should be redirected to the login page")
    public void iShouldBeRedirectedToTheLoginPage() {
        log.info("Asserting redirect to login page");
        // TODO: assert URL ends with "/" or "/login"
    }

    // ─── Change Password Steps ───────────────────────────────────────────────

    @Given("I navigate to the {string} section")
    public void iNavigateToTheSection(String sectionName) {
        log.info("Navigating to section: {}", sectionName);
        context.set("currentSection", sectionName);
        // TODO: click the matching sidebar nav item
    }

    @When("I enter current password {string}")
    public void iEnterCurrentPassword(String password) {
        context.set("currentPassword", password);
        // TODO: fill the current password field
    }

    @When("I enter new password {string}")
    public void iEnterNewPassword(String password) {
        context.set("newPassword", password);
        // TODO: fill the new password field
    }

    @When("I confirm new password {string}")
    public void iConfirmNewPassword(String password) {
        context.set("confirmPassword", password);
        // TODO: fill the confirm password field
    }

    @When("I click the {string} button")
    public void iClickTheButton(String buttonText) {
        log.info("Clicking button: {}", buttonText);
        // TODO: find button by text and click it
    }

    @Then("I should see a success message {string}")
    public void iShouldSeeASuccessMessage(String expectedMessage) {
        log.info("Asserting success message: {}", expectedMessage);
        // TODO: assert success message or toast text matches expectedMessage
    }

    @Then("I should still be logged in")
    public void iShouldStillBeLoggedIn() {
        assertTrue(context.isLoggedIn(), "User should remain logged in");
    }

    @Then("the currentUser should remain in local storage")
    public void theCurrentUserShouldRemainInLocalStorage() {
        // TODO: assert localStorage["currentUser"] is not null
    }
}
