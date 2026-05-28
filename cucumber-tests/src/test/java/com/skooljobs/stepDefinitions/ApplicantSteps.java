package com.skooljobs.stepDefinitions;

import com.skooljobs.utils.TestContext;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;

public class ApplicantSteps {

    private static final Logger log = LoggerFactory.getLogger(ApplicantSteps.class);

    private final TestContext context;

    public ApplicantSteps(TestContext context) {
        this.context = context;
    }

    // ─── Given ───────────────────────────────────────────────────────────────

    @Given("at least one teacher has applied to a school job")
    public void atLeastOneTeacherHasAppliedToASchoolJob() {
        log.info("Pre-condition: at least one application exists");
        // TODO: seed an application via test data API
    }

    @Given("an applicant named {string} is in the list")
    public void anApplicantNamedIsInTheList(String applicantName) {
        log.info("Pre-condition: applicant '{}' is in the list", applicantName);
        context.set("targetApplicant", applicantName);
        // TODO: ensure the applicant exists in the test data
    }

    @Given("there are applicants for {string} and {string}")
    public void thereAreApplicantsForSubjects(String subject1, String subject2) {
        log.info("Pre-condition: applicants for {} and {}", subject1, subject2);
        // TODO: seed applicants for both subjects
    }

    @Given("there are applicants with various experience levels")
    public void thereAreApplicantsWithVariousExperienceLevels() {
        log.info("Pre-condition: applicants with varying experience exist");
        // TODO: seed applicants with different experience values
    }

    @Given("there is an applicant {string} in the list")
    public void thereIsAnApplicantInTheList(String applicantName) {
        log.info("Pre-condition: applicant '{}' is in the list", applicantName);
        context.set("targetApplicant", applicantName);
        // TODO: ensure applicant exists
    }

    @Given("I have saved {string} as a candidate")
    public void iHaveSavedAsACandidate(String applicantName) {
        log.info("Pre-condition: '{}' is saved", applicantName);
        context.set("savedCandidate", applicantName);
        // TODO: save the candidate via API or UI pre-step
    }

    @Given("no candidates have been saved")
    public void noCandidatesHaveBeenSaved() {
        log.info("Pre-condition: no saved candidates");
        // TODO: clear all saved candidates for this school
    }

    @Given("{string} is in the Saved Candidates list")
    public void isInTheSavedCandidatesList(String applicantName) {
        log.info("Pre-condition: '{}' is in saved candidates", applicantName);
        context.set("savedCandidate", applicantName);
        // TODO: ensure applicant is saved
    }

    @Given("I have saved {int} candidates")
    public void iHaveSavedCandidates(int count) {
        log.info("Pre-condition: {} candidates saved", count);
        context.set("savedCandidateCount", count);
        // TODO: seed N saved candidates
    }

    @Given("there is an applicant {string} with status {string}")
    public void thereIsAnApplicantWithStatus(String applicantName, String status) {
        log.info("Pre-condition: applicant '{}' has status '{}'", applicantName, status);
        context.set("targetApplicant", applicantName);
        context.set("targetApplicantStatus", status);
        // TODO: ensure applicant exists with the given status
    }

    @Given("{string} has status {string}")
    public void hasStatus(String applicantName, String status) {
        log.info("Pre-condition: '{}' has status '{}'", applicantName, status);
        context.set("targetApplicant", applicantName);
        context.set("targetApplicantStatus", status);
        // TODO: ensure applicant's status matches
    }

    @Given("there are both shortlisted and non-shortlisted applicants")
    public void thereAreBothShortlistedAndNonShortlistedApplicants() {
        log.info("Pre-condition: mixed shortlisted and non-shortlisted applicants");
        // TODO: seed applicants with mixed statuses
    }

    @Given("{string} is saved and has status {string}")
    public void isSavedAndHasStatus(String applicantName, String status) {
        log.info("Pre-condition: '{}' is saved and has status '{}'", applicantName, status);
        context.set("savedCandidate", applicantName);
        context.set("targetApplicantStatus", status);
        // TODO: seed applicant in saved list with the given status
    }

    @Given("{string} already has status {string}")
    public void alreadyHasStatus(String applicantName, String status) {
        log.info("Pre-condition: '{}' already has status '{}'", applicantName, status);
        context.set("targetApplicant", applicantName);
        context.set("targetApplicantStatus", status);
        // TODO: ensure the status is already set
    }

    @Given("{string} is shortlisted and has uploaded a resume")
    public void isShortlistedAndHasUploadedAResume(String applicantName) {
        log.info("Pre-condition: '{}' is shortlisted and has resume", applicantName);
        context.set("targetApplicant", applicantName);
        // TODO: ensure applicant is shortlisted with a resume
    }

    @Given("there are both rejected and non-rejected applicants")
    public void thereAreBothRejectedAndNonRejectedApplicants() {
        log.info("Pre-condition: mixed rejected and non-rejected applicants");
        // TODO: seed applicants with mixed statuses
    }

    @Given("no teacher has applied to any school jobs")
    public void noTeacherHasAppliedToAnySchoolJobs() {
        log.info("Pre-condition: no applications exist");
        // TODO: ensure applications list is empty for this school
    }

    @Given("there are applicants for subject {string}")
    public void thereAreApplicantsForSubject(String subject) {
        log.info("Pre-condition: applicants for subject '{}'", subject);
        // TODO: seed applicants with this subject
    }

    @Given("an applicant has not uploaded a profile photo")
    public void anApplicantHasNotUploadedAProfilePhoto() {
        log.info("Pre-condition: applicant has no profile photo");
        // TODO: ensure test applicant has no photo set
    }

    @Given("an applicant has status {string}")
    public void anApplicantHasStatus(String status) {
        log.info("Pre-condition: applicant has status '{}'", status);
        context.set("targetApplicantStatus", status);
        // TODO: ensure a test applicant exists in this state
    }

    // ─── When ────────────────────────────────────────────────────────────────

    @When("I type {string} in the applicant search field")
    public void iTypeInTheApplicantSearchField(String searchText) {
        log.info("Searching applicants for: {}", searchText);
        context.set("applicantSearch", searchText);
        // TODO: fill the applicant search input
    }

    @When("I select {string} from the subject filter")
    public void iSelectFromTheSubjectFilter(String subject) {
        log.info("Filtering by subject: {}", subject);
        context.set("subjectFilter", subject);
        // TODO: select subject from the subject dropdown/filter
    }

    @When("I select {string} from the experience filter")
    public void iSelectFromTheExperienceFilter(String experience) {
        log.info("Filtering by experience: {}", experience);
        context.set("experienceFilter", experience);
        // TODO: select experience from the experience dropdown/filter
    }

    @When("I search for {string} and filter by subject {string}")
    public void iSearchForAndFilterBySubject(String name, String subject) {
        log.info("Searching for '{}' with subject filter '{}'", name, subject);
        context.set("applicantSearch", name);
        context.set("subjectFilter", subject);
        // TODO: fill search and select filter
    }

    @When("I apply a subject filter")
    public void iApplyASubjectFilter() {
        log.info("Applying a subject filter");
        context.set("subjectFilter", "Mathematics");
        // TODO: select any subject from the filter
    }

    @When("I reset the subject filter to {string}")
    public void iResetTheSubjectFilterTo(String value) {
        log.info("Resetting subject filter to: {}", value);
        context.set("subjectFilter", value);
        // TODO: select "All" or clear the filter
    }

    @When("I click the save icon on an applicant")
    public void iClickTheSaveIconOnAnApplicant() {
        log.info("Clicking save icon on an applicant");
        // TODO: click the save/bookmark button in the first applicant row
    }

    @When("I click the {string} or bookmark icon on {string}")
    public void iClickTheSaveOrBookmarkIconOn(String iconText, String applicantName) {
        log.info("Saving candidate: {}", applicantName);
        context.set("targetApplicant", applicantName);
        // TODO: find the applicant row and click the save/bookmark icon
    }

    @When("I navigate to the {string} section")
    public void iNavigateToTheSavedSection(String sectionName) {
        log.info("Navigating to section: {}", sectionName);
        context.set("currentSection", sectionName);
        // TODO: click the sidebar nav item for this section
    }

    @When("I save candidates {string}, {string}, and {string}")
    public void iSaveCandidates(String c1, String c2, String c3) {
        log.info("Saving candidates: {}, {}, {}", c1, c2, c3);
        context.set("savedCandidate1", c1);
        context.set("savedCandidate2", c2);
        context.set("savedCandidate3", c3);
        // TODO: save each candidate
    }

    @When("I click the {string} button for {string}")
    public void iClickTheButtonFor(String buttonText, String applicantName) {
        log.info("Clicking '{}' for '{}'", buttonText, applicantName);
        context.set("targetApplicant", applicantName);
        // TODO: find the applicant row and click the button
    }

    @When("I remove {string} from saved candidates")
    public void iRemoveFromSavedCandidates(String applicantName) {
        log.info("Removing '{}' from saved candidates", applicantName);
        context.set("savedCandidate", applicantName);
        // TODO: click remove/unsave button for this candidate
    }

    @When("I try to save {string} again")
    public void iTryToSaveAgain(String applicantName) {
        log.info("Attempting to save '{}' again", applicantName);
        context.set("targetApplicant", applicantName);
        // TODO: click save on already-saved candidate
    }

    @When("I shortlist {string}")
    public void iShortlist(String applicantName) {
        log.info("Shortlisting: {}", applicantName);
        context.set("targetApplicant", applicantName);
        // TODO: click Shortlist for this applicant
    }

    @When("I shortlist {string}, {string}, and {string}")
    public void iShortlistMultiple(String a1, String a2, String a3) {
        log.info("Shortlisting: {}, {}, {}", a1, a2, a3);
        // TODO: shortlist each applicant
    }

    @When("I filter applicants by status {string}")
    public void iFilterApplicantsByStatus(String status) {
        log.info("Filtering applicants by status: {}", status);
        context.set("statusFilter", status);
        // TODO: select status filter
    }

    @When("I filter by {string}")
    public void iFilterBy(String filterValue) {
        log.info("Applying filter: {}", filterValue);
        context.set("appliedFilter", filterValue);
        // TODO: apply the filter
    }

    @When("I reject {string}")
    public void iReject(String applicantName) {
        log.info("Rejecting applicant: {}", applicantName);
        context.set("targetApplicant", applicantName);
        // TODO: click Reject for this applicant and confirm
    }

    @When("I reject {string}, {string}, and {string}")
    public void iRejectMultiple(String a1, String a2, String a3) {
        log.info("Rejecting: {}, {}, {}", a1, a2, a3);
        // TODO: reject each applicant
    }

    @When("I try to click the {string} button again")
    public void iTryToClickTheButtonAgain(String buttonText) {
        log.info("Attempting to click '{}' again", buttonText);
        // TODO: click the already-inactive button
    }

    @When("I search for {string}")
    public void iSearchFor(String searchText) {
        log.info("Searching for: {}", searchText);
        context.set("searchText", searchText);
        // TODO: fill the search input
    }

    @When("a teacher views the job listing")
    public void aTeacherViewsTheJobListing() {
        log.info("Teacher viewing job listing");
        // TODO: navigate to job detail page as a teacher
    }

    @When("I click {string} on an Active job")
    public void iClickOnAnActiveJob(String action) {
        log.info("Clicking '{}' on an Active job", action);
        // TODO: find first Active job row and click the button
    }

    @When("I save a new candidate")
    public void iSaveANewCandidate() {
        log.info("Saving a new candidate");
        // TODO: save the first applicant in the list
    }

    @When("I refresh the page")
    public void iRefreshThePage() {
        log.info("Refreshing the page");
        // TODO: trigger a page reload
    }

    // ─── Then ────────────────────────────────────────────────────────────────

    @Then("the All Applicants table should display at least one row")
    public void theAllApplicantsTableShouldDisplayAtLeastOneRow() {
        log.info("Asserting All Applicants table has at least one row");
        // TODO: assert table row count > 0
    }

    @Then("only applicants with {string} in their name should be displayed")
    public void onlyApplicantsWithInTheirNameShouldBeDisplayed(String keyword) {
        log.info("Asserting search results contain: {}", keyword);
        // TODO: assert each row name contains the keyword
    }

    @Then("only Mathematics applicants should be displayed")
    public void onlyMathematicsApplicantsShouldBeDisplayed() {
        log.info("Asserting only Mathematics applicants shown");
        // TODO: assert each row subject is "Mathematics"
    }

    @Then("only applicants with that experience level should be displayed")
    public void onlyApplicantsWithThatExperienceLevelShouldBeDisplayed() {
        log.info("Asserting experience filter applied");
        // TODO: assert each row experience matches the filter
    }

    @Then("the {string} should appear in the {string}")
    public void theShouldAppearInThe(String item, String section) {
        log.info("Asserting '{}' appears in '{}'", item, section);
        // TODO: assert item text is present in the section
    }

    @Then("{string} should appear in the Saved Candidates list")
    public void shouldAppearInTheSavedCandidatesList(String applicantName) {
        log.info("Asserting '{}' is in saved candidates", applicantName);
        // TODO: assert saved candidate row exists
    }

    @Then("all three candidates {string}, {string}, and {string} should be listed")
    public void allThreeCandidatesShouldBeListed(String c1, String c2, String c3) {
        log.info("Asserting all three candidates are listed");
        // TODO: assert each name appears in the list
    }

    @Then("{string} should still appear in All Applicants with status {string}")
    public void shouldStillAppearInAllApplicantsWithStatus(String name, String status) {
        log.info("Asserting '{}' still in All Applicants with status '{}'", name, status);
        // TODO: assert applicant row exists with correct status
    }

    @Then("{string} should be removed from the Saved Candidates list")
    public void shouldBeRemovedFromTheSavedCandidatesList(String applicantName) {
        log.info("Asserting '{}' is not in saved candidates", applicantName);
        // TODO: assert no saved candidate row with this name
    }

    @Then("{string} status should change to {string}")
    public void statusShouldChangeTo(String applicantName, String newStatus) {
        log.info("Asserting '{}' status changed to '{}'", applicantName, newStatus);
        // TODO: assert status badge text in the applicant row
    }

    @Then("{string} should still appear in the All Applicants list")
    public void shouldStillAppearInTheAllApplicantsList(String applicantName) {
        log.info("Asserting '{}' still in All Applicants", applicantName);
        // TODO: assert applicant row is still present
    }

    @Then("their status should be {string}")
    public void theirStatusShouldBe(String status) {
        log.info("Asserting applicant status: {}", status);
        // TODO: assert status badge text for target applicant
    }

    @Then("the {string} section should display an empty state message")
    public void theSectionShouldDisplayAnEmptyStateMessage(String sectionName) {
        log.info("Asserting empty state in section: {}", sectionName);
        // TODO: assert empty state element is visible
    }

    @Then("only shortlisted applicants should be displayed")
    public void onlyShortlistedApplicantsShouldBeDisplayed() {
        log.info("Asserting only shortlisted applicants shown");
        // TODO: assert all visible rows have Shortlisted status
    }

    @Then("only rejected applicants should be displayed")
    public void onlyRejectedApplicantsShouldBeDisplayed() {
        log.info("Asserting only rejected applicants shown");
        // TODO: assert all visible rows have Rejected status
    }

    @Then("all returned applicants should have subject {string}")
    public void allReturnedApplicantsShouldHaveSubject(String subject) {
        log.info("Asserting all results have subject: {}", subject);
        // TODO: assert each row subject matches
    }

    @Then("the applicant table should be empty")
    public void theApplicantTableShouldBeEmpty() {
        log.info("Asserting applicant table is empty");
        // TODO: assert row count == 0
    }

    @Then("the {string} button should be visible for applicants with {string} status")
    public void theButtonShouldBeVisibleForApplicantsWithStatus(String button, String status) {
        log.info("Asserting '{}' button visible for {} applicants", button, status);
        // TODO: assert button is present for matching rows
    }

    @Then("the Shortlist button availability should be {string}")
    public void theShortlistButtonAvailabilityShouldBe(String availability) {
        log.info("Asserting Shortlist button availability: {}", availability);
        boolean expected = availability.equalsIgnoreCase("yes");
        // TODO: assert button visible/enabled based on expected value
    }

    @Then("the Reject button availability should be {string}")
    public void theRejectButtonAvailabilityShouldBe(String availability) {
        log.info("Asserting Reject button availability: {}", availability);
        boolean expected = availability.equalsIgnoreCase("yes");
        // TODO: assert button visible/enabled based on expected value
    }

    @Then("the list should contain exactly {int} entries")
    public void theListShouldContainExactlyEntries(int count) {
        log.info("Asserting list contains exactly {} entries", count);
        // TODO: assert row count == count
    }

    @Then("the {string} button should not be visible for that job")
    public void theButtonShouldNotBeVisibleForThatJob(String button) {
        log.info("Asserting '{}' button not visible for the job", button);
        // TODO: assert button is absent or hidden for this job
    }

    @Then("the {string} button should be present on rows with {string} status")
    public void theButtonShouldBePresentOnRowsWithStatus(String button, String status) {
        log.info("Asserting '{}' button present on {} rows", button, status);
        // TODO: assert button present in rows with the given status
    }

    @Then("the {string} button should not be present on rows with {string} or {string} status")
    public void theButtonShouldNotBePresentOnRowsWithStatus(String button, String s1, String s2) {
        log.info("Asserting '{}' not present on {} or {} rows", button, s1, s2);
        // TODO: assert button absent in rows with either status
    }

    @Then("the {string} button should be present on rows with {string} status")
    public void theButtonShouldBePresentOnRowsWithStatusSingle(String button, String status) {
        log.info("Asserting '{}' button present on {} rows", button, status);
        // TODO: assert button present in matching rows
    }

    @Then("the {string} button should not be present on rows with {string} status")
    public void theButtonShouldNotBePresentOnRowsWithStatusSingle(String button, String status) {
        log.info("Asserting '{}' not present on {} rows", button, status);
        // TODO: assert button absent in matching rows
    }

    @Then("the save icon should change to a filled or highlighted state")
    public void theSaveIconShouldChangeToAFilledOrHighlightedState() {
        log.info("Asserting save icon state changed");
        // TODO: assert icon class or aria attribute indicates saved state
    }

    @Then("each applicant row in the All Applicants list should have a save icon or button")
    public void eachApplicantRowShouldHaveASaveIcon() {
        log.info("Asserting save icon present in each row");
        // TODO: assert each row contains a save icon element
    }
}
