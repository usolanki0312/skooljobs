package com.skooljobs.stepDefinitions;

import com.skooljobs.utils.TestContext;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class RecruiterSteps {

    private static final Logger log = LoggerFactory.getLogger(RecruiterSteps.class);

    private final TestContext context;

    public RecruiterSteps(TestContext context) {
        this.context = context;
    }

    // ─── Given ───────────────────────────────────────────────────────────────

    @Given("I navigate to the {string} section in the school dashboard")
    public void iNavigateToTheSectionInTheSchoolDashboard(String sectionName) {
        log.info("Navigating to section: {}", sectionName);
        context.set("currentSection", sectionName);
        // TODO: click the matching sidebar nav item on the school dashboard
    }

    @Given("the school has at least one posted job")
    public void theSchoolHasAtLeastOnePostedJob() {
        log.info("Pre-condition: school has at least one job");
        // TODO: seed a job via test data API if none exists
    }

    @Given("the school has at least one existing job posting")
    public void theSchoolHasAtLeastOneExistingJobPosting() {
        log.info("Pre-condition: existing job posting available");
        // TODO: ensure at least one job exists for this school
    }

    @Given("there is at least one job with status {string}")
    public void thereIsAtLeastOneJobWithStatus(String status) {
        log.info("Pre-condition: job with status {} exists", status);
        context.set("targetJobStatus", status);
        // TODO: seed a job with the given status
    }

    @Given("there is a job with status {string}")
    public void thereIsAJobWithStatus(String status) {
        log.info("Pre-condition: job with status {} exists", status);
        context.set("targetJobStatus", status);
        // TODO: ensure test data includes a job in this state
    }

    @Given("the school has posted jobs including {string}")
    public void theSchoolHasPostedJobsIncluding(String jobTitle) {
        log.info("Pre-condition: job '{}' is posted", jobTitle);
        context.set("targetJobTitle", jobTitle);
        // TODO: seed the job if not present
    }

    @Given("a job {string} has {int} applicants")
    public void aJobHasApplicants(String jobTitle, int count) {
        log.info("Pre-condition: job '{}' has {} applicants", jobTitle, count);
        context.set("targetJobTitle", jobTitle);
        context.set("expectedApplicantCount", count);
        // TODO: seed applicants for the job
    }

    @Given("there is an Active job {string}")
    public void thereIsAnActiveJob(String jobTitle) {
        log.info("Pre-condition: Active job '{}'", jobTitle);
        context.set("targetJobTitle", jobTitle);
        // TODO: ensure the job exists and is Active
    }

    @Given("there is a Draft job {string}")
    public void thereIsADraftJob(String jobTitle) {
        log.info("Pre-condition: Draft job '{}'", jobTitle);
        context.set("targetJobTitle", jobTitle);
        // TODO: ensure the job exists and is Draft
    }

    @Given("a job exists with status {string}")
    public void aJobExistsWithStatus(String status) {
        log.info("Pre-condition: job with status {}", status);
        // TODO: ensure test job is in this state
    }

    @Given("a job has {int} active applicants")
    public void aJobHasActiveApplicants(int count) {
        log.info("Pre-condition: job has {} active applicants", count);
        context.set("activeApplicantCount", count);
        // TODO: seed applicants
    }

    @Given("I am logged in as school admin A")
    public void iAmLoggedInAsSchoolAdminA() {
        log.info("Logging in as school admin A");
        // TODO: log in with school admin A credentials
    }

    @Given("a job is currently {string}")
    public void aJobIsCurrently(String status) {
        log.info("Pre-condition: job is currently {}", status);
        context.set("initialJobStatus", status);
        // TODO: ensure job is in this state
    }

    @Given("the school has no posted jobs")
    public void theSchoolHasNoPostedJobs() {
        log.info("Pre-condition: school has no posted jobs");
        // TODO: ensure the school's job list is empty
    }

    @Given("there are jobs with different statuses")
    public void thereAreJobsWithDifferentStatuses() {
        log.info("Pre-condition: jobs with Active, Closed, Draft statuses exist");
        // TODO: seed one job per status
    }

    @Given("there is a count of Active jobs shown on the dashboard")
    public void thereIsACountOfActiveJobsShownOnTheDashboard() {
        log.info("Noting current Active job count");
        // TODO: read and store the current Active jobs count
    }

    // ─── When ────────────────────────────────────────────────────────────────

    @When("I fill in the job form with:")
    public void iFillInTheJobFormWith(io.cucumber.datatable.DataTable dataTable) {
        log.info("Filling job form with table data");
        Map<String, String> fields = dataTable.asMap();
        fields.forEach((field, value) -> {
            context.set("jobField_" + field, value);
            log.info("  {} = {}", field, value);
        });
        // TODO: iterate and fill each form field
    }

    @When("I fill in the job title as {string}")
    public void iFillInTheJobTitleAs(String jobTitle) {
        log.info("Setting job title: {}", jobTitle);
        context.set("jobField_jobTitle", jobTitle);
        // TODO: fill job title input
    }

    @When("I fill in the subject as {string}")
    public void iFillInTheSubjectAs(String subject) {
        log.info("Setting subject: {}", subject);
        context.set("jobField_subject", subject);
        // TODO: fill subject input
    }

    @When("I fill in the location as {string}")
    public void iFillInTheLocationAs(String location) {
        log.info("Setting location: {}", location);
        context.set("jobField_location", location);
        // TODO: fill location input
    }

    @When("I fill in all job fields except the job title")
    public void iFillInAllJobFieldsExceptTheJobTitle() {
        log.info("Filling all job fields except title");
        // TODO: fill subject, experience, location, etc. but leave title empty
    }

    @When("I fill in all job fields except the subject")
    public void iFillInAllJobFieldsExceptTheSubject() {
        log.info("Filling all job fields except subject");
        // TODO: fill all fields except subject
    }

    @When("I fill in all job fields except the location")
    public void iFillInAllJobFieldsExceptTheLocation() {
        log.info("Filling all job fields except location");
        // TODO: fill all fields except location
    }

    @When("I fill in all job fields except experience")
    public void iFillInAllJobFieldsExceptExperience() {
        log.info("Filling all job fields except experience");
        // TODO: fill all fields except experience
    }

    @When("I click the {string} employment type chip")
    public void iClickTheEmploymentTypeChip(String chipLabel) {
        log.info("Clicking employment type chip: {}", chipLabel);
        context.set("employmentType", chipLabel);
        // TODO: click the chip button
    }

    @When("I publish a new job for {string}")
    public void iPublishANewJobFor(String jobTitle) {
        log.info("Publishing new job: {}", jobTitle);
        context.set("publishedJobTitle", jobTitle);
        // TODO: fill minimum required fields and click Publish
    }

    @When("I save a job as draft for {string}")
    public void iSaveAJobAsDraftFor(String jobTitle) {
        log.info("Saving draft job: {}", jobTitle);
        context.set("draftJobTitle", jobTitle);
        // TODO: fill minimum required fields and click Save Draft
    }

    @When("I post a new job successfully")
    public void iPostANewJobSuccessfully() {
        log.info("Posting a new job");
        // TODO: fill all required fields and publish
    }

    @When("I enter salary {string} in the salary field")
    public void iEnterSalaryInTheSalaryField(String salary) {
        log.info("Entering salary: {}", salary);
        context.set("jobField_salary", salary);
        // TODO: fill salary field
    }

    @When("I leave {string} empty in the post job form")
    public void iLeaveEmptyInThePostJobForm(String fieldName) {
        log.info("Leaving field empty: {}", fieldName);
        context.set("emptyField", fieldName);
        // TODO: ensure the specified field is left blank
    }

    @When("I type {string} in the search field")
    public void iTypeInTheSearchField(String searchText) {
        log.info("Searching for: {}", searchText);
        context.set("searchText", searchText);
        // TODO: fill the search input field
    }

    @When("I clear the search field")
    public void iClearTheSearchField() {
        log.info("Clearing search field");
        context.set("searchText", "");
        // TODO: clear the search input
    }

    @When("I type {string} in the job search field")
    public void iTypeInTheJobSearchField(String searchText) {
        log.info("Searching jobs for: {}", searchText);
        context.set("searchText", searchText);
        // TODO: fill the job search input
    }

    @When("I click the {string} button on a job")
    public void iClickTheButtonOnAJob(String buttonText) {
        log.info("Clicking '{}' on a job", buttonText);
        // TODO: find the first job row and click the specified button
    }

    @When("I click the {string} button on the {string} job")
    public void iClickTheButtonOnTheJob(String buttonText, String jobTitle) {
        log.info("Clicking '{}' on job '{}'", buttonText, jobTitle);
        context.set("targetJobTitle", jobTitle);
        // TODO: find the job row by title and click the button
    }

    @When("I click the {string} button for that job")
    public void iClickTheButtonForThatJob(String buttonText) {
        log.info("Clicking '{}' for the target job", buttonText);
        // TODO: click the button in the target job row
    }

    @When("I click the {string} button in the dialog")
    public void iClickTheButtonInTheDialog(String buttonText) {
        log.info("Clicking '{}' in dialog", buttonText);
        // TODO: click the button in the confirmation dialog
    }

    @When("I open the draft job for editing")
    public void iOpenTheDraftJobForEditing() {
        log.info("Opening draft job for editing");
        // TODO: find a draft job and click Edit
    }

    @When("I update the job title to {string}")
    public void iUpdateTheJobTitleTo(String title) {
        log.info("Updating job title to: {}", title);
        context.set("updatedJobTitle", title);
        // TODO: fill job title input in edit form
    }

    @When("I update the salary to {string}")
    public void iUpdateTheSalaryTo(String salary) {
        log.info("Updating salary to: {}", salary);
        context.set("updatedSalary", salary);
        // TODO: fill salary field in edit form
    }

    @When("I update the job description with new content")
    public void iUpdateTheJobDescriptionWithNewContent() {
        log.info("Updating job description");
        // TODO: fill description textarea with new content
    }

    @When("I change the employment type from {string} to {string}")
    public void iChangeTheEmploymentTypeFromTo(String from, String to) {
        log.info("Changing employment type from {} to {}", from, to);
        context.set("employmentType", to);
        // TODO: click the 'to' chip
    }

    @When("I edit the job title and save")
    public void iEditTheJobTitleAndSave() {
        log.info("Editing job title and saving");
        // TODO: change title slightly and click Save
    }

    @When("I clear the {string} field in the edit form")
    public void iClearTheFieldInTheEditForm(String fieldName) {
        log.info("Clearing field in edit form: {}", fieldName);
        // TODO: clear the specified field
    }

    @When("I complete any missing required fields")
    public void iCompleteAnyMissingRequiredFields() {
        log.info("Completing any missing required fields");
        // TODO: fill in any empty required fields
    }

    @When("I open the edit form and make no changes")
    public void iOpenTheEditFormAndMakeNoChanges() {
        log.info("Opening edit form without making changes");
        // TODO: open edit form but do not change anything
    }

    @When("I delete the job {string} from the school dashboard")
    public void iDeleteTheJobFromTheSchoolDashboard(String jobTitle) {
        log.info("Deleting job: {}", jobTitle);
        context.set("targetJobTitle", jobTitle);
        // TODO: find job row and click Delete, then confirm
    }

    @When("I close an Active job")
    public void iCloseAnActiveJob() {
        log.info("Closing an Active job");
        // TODO: click Close on the first Active job and confirm
    }

    @When("I perform the {string} action")
    public void iPerformTheAction(String action) {
        log.info("Performing action: {}", action);
        // TODO: map action to the corresponding button click
    }

    // ─── Then ────────────────────────────────────────────────────────────────

    @Then("the job should be published successfully")
    public void theJobShouldBePublishedSuccessfully() {
        log.info("Asserting job was published");
        // TODO: assert success message or job appears in manage jobs with Active status
    }

    @Then("the job should be saved as a draft")
    public void theJobShouldBeSavedAsADraft() {
        log.info("Asserting job was saved as draft");
        // TODO: assert job appears in manage jobs with Draft status
    }

    @Then("the job {string} should appear in the Manage Jobs section")
    public void theJobShouldAppearInTheManageJobsSection(String jobTitle) {
        log.info("Asserting job '{}' appears in Manage Jobs", jobTitle);
        // TODO: navigate to Manage Jobs and assert job row exists
    }

    @Then("its status should be {string}")
    public void itsStatusShouldBe(String status) {
        log.info("Asserting job status: {}", status);
        // TODO: assert status badge text in the job row
    }

    @Then("the Manage Jobs table should display at least one job row")
    public void theManageJobsTableShouldDisplayAtLeastOneJobRow() {
        log.info("Asserting Manage Jobs has at least one row");
        // TODO: assert table row count > 0
    }

    @Then("each row should show job title, applicant count, status, date, and actions")
    public void eachRowShouldShowJobDetails() {
        log.info("Asserting each row has required columns");
        // TODO: spot-check first row for all expected cells
    }

    @Then("the table should have the column {string}")
    public void theTableShouldHaveTheColumn(String column) {
        log.info("Asserting table column: {}", column);
        // TODO: assert column header text exists
    }

    @Then("the Active job row should have an {string} action button")
    public void theActiveJobRowShouldHaveAnActionButton(String action) {
        log.info("Asserting Active job has action: {}", action);
        // TODO: assert button with text action is visible in Active job row
    }

    @Then("the Closed job row should have an {string} action button")
    public void theClosedJobRowShouldHaveAnActionButton(String action) {
        log.info("Asserting Closed job has action: {}", action);
        // TODO: assert button with text action is visible in Closed job row
    }

    @Then("only jobs containing {string} in the title should be displayed")
    public void onlyJobsContainingInTheTitleShouldBeDisplayed(String keyword) {
        log.info("Asserting search results contain keyword: {}", keyword);
        // TODO: assert each row's job title contains the keyword
    }

    @Then("all jobs should be displayed again")
    public void allJobsShouldBeDisplayedAgain() {
        log.info("Asserting all jobs are shown");
        // TODO: assert row count is the full total
    }

    @Then("the {string} row should show {string} in the applicants column")
    public void theRowShouldShowInTheApplicantsColumn(String jobTitle, String count) {
        log.info("Asserting applicant count {} for job '{}'", count, jobTitle);
        // TODO: find job row and assert applicant count cell
    }

    @Then("a confirmation dialog should appear")
    public void aConfirmationDialogShouldAppear() {
        log.info("Asserting confirmation dialog is visible");
        // TODO: assert dialog element is displayed
    }

    @Then("the job {string} should be removed from the list")
    public void theJobShouldBeRemovedFromTheList(String jobTitle) {
        log.info("Asserting job '{}' is removed", jobTitle);
        // TODO: assert no row with jobTitle exists in the table
    }

    @Then("the job {string} should no longer appear in the Manage Jobs list")
    public void theJobShouldNoLongerAppearInTheManageJobsList(String jobTitle) {
        log.info("Asserting job '{}' is gone from list", jobTitle);
        // TODO: assert row count for jobTitle is 0
    }

    @Then("the Manage Jobs section should display an empty state message")
    public void theManageJobsSectionShouldDisplayAnEmptyStateMessage() {
        log.info("Asserting empty state message is visible");
        // TODO: assert empty state element is displayed
    }

    @Then("the post job form should have a {string} field")
    public void thePostJobFormShouldHaveAField(String fieldLabel) {
        log.info("Asserting post job form has field: {}", fieldLabel);
        // TODO: assert form element with label fieldLabel is present
    }

    @Then("I should see a validation error {string}")
    public void iShouldSeeAValidationError(String error) {
        log.info("Asserting validation error: {}", error);
        // TODO: assert error message text contains expected
    }

    @Then("the job should be updated with the title {string}")
    public void theJobShouldBeUpdatedWithTheTitle(String title) {
        log.info("Asserting job title updated to: {}", title);
        // TODO: assert job row shows updated title
    }

    @Then("the job status should change to {string}")
    public void theJobStatusShouldChangeTo(String status) {
        log.info("Asserting job status changed to: {}", status);
        // TODO: assert status badge text in the target job row
    }

    @Then("the job status should become {string}")
    public void theJobStatusShouldBecome(String status) {
        log.info("Asserting job status becomes: {}", status);
        // TODO: assert status badge text
    }

    @Then("the job should remain in the Manage Jobs list")
    public void theJobShouldRemainInTheManageJobsList() {
        log.info("Asserting job still in the list");
        // TODO: assert job row is still present
    }

    @Then("{string} should not appear in the teacher's job search results")
    public void shouldNotAppearInTheTeachersJobSearchResults(String jobTitle) {
        log.info("Asserting job '{}' not visible to teachers", jobTitle);
        // TODO: assert job title not found in teacher-facing search
    }

    @Then("the job row should show {string} as the status badge")
    public void theJobRowShouldShowAsTheStatusBadge(String label) {
        log.info("Asserting status badge label: {}", label);
        // TODO: assert badge text equals label
    }
}
