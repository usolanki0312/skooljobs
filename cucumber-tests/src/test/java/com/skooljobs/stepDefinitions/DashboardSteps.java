package com.skooljobs.stepDefinitions;

import com.skooljobs.utils.TestContext;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;

public class DashboardSteps {

    private static final Logger log = LoggerFactory.getLogger(DashboardSteps.class);

    private final TestContext context;

    public DashboardSteps(TestContext context) {
        this.context = context;
    }

    // ─── Given ───────────────────────────────────────────────────────────────

    @Given("the school has posted {int} jobs and received {int} applications")
    public void theSchoolHasPostedJobsAndReceivedApplications(int jobs, int applications) {
        log.info("Pre-condition: {} jobs, {} applications", jobs, applications);
        context.set("expectedJobCount", jobs);
        context.set("expectedApplicantCount", applications);
        // TODO: seed the specified number of jobs and applications
    }

    @Given("the {string} count is noted as N")
    public void theCountIsNotedAsN(String statLabel) {
        log.info("Noting current count for: {}", statLabel);
        context.set("noteStatLabel", statLabel);
        // TODO: read the current stat value from the dashboard and store as "initialStatValue"
    }

    @Given("I am a newly registered school with no jobs or applicants")
    public void iAmANewlyRegisteredSchoolWithNoJobsOrApplicants() {
        log.info("Pre-condition: brand new school account");
        // TODO: create a fresh school account or reset counts to zero
    }

    @Given("the {string} count is noted")
    public void theCountIsNoted(String statLabel) {
        log.info("Noting count for: {}", statLabel);
        context.set("noteStatLabel", statLabel);
        // TODO: read current stat value
    }

    @Given("a job {string} is Active")
    public void aJobIsActive(String jobTitle) {
        log.info("Pre-condition: job '{}' is Active", jobTitle);
        context.set("activeJobTitle", jobTitle);
        // TODO: ensure job is Active
    }

    @Given("I am logged in as a teacher")
    public void iAmLoggedInAsATeacher() {
        log.info("Logging in as teacher");
        context.setCurrentUserRole("teacher");
        context.setLoggedIn(true);
        // TODO: perform teacher login
    }

    @Given("I am logged in as a school admin")
    public void iAmLoggedInAsASchoolAdmin() {
        log.info("Logging in as school admin");
        context.setCurrentUserRole("employer");
        context.setLoggedIn(true);
        // TODO: perform school admin login
    }

    // ─── When ────────────────────────────────────────────────────────────────

    @When("I navigate to the school dashboard")
    public void iNavigateToTheSchoolDashboard() {
        log.info("Navigating to school dashboard");
        // TODO: navigate to /school-dashboard
    }

    @When("I navigate to the teacher dashboard")
    public void iNavigateToTheTeacherDashboard() {
        log.info("Navigating to teacher dashboard");
        // TODO: navigate to /dashboard
    }

    @When("I navigate to the dashboard URL")
    public void iNavigateToTheDashboardURL() {
        log.info("Navigating to dashboard URL");
        // TODO: navigate to /dashboard or /school-dashboard
    }

    @When("I visit the root or dashboard path")
    public void iVisitTheRootOrDashboardPath() {
        log.info("Visiting root or dashboard path");
        // TODO: navigate to "/" or "/dashboard"
    }

    @When("I return to the dashboard")
    public void iReturnToTheDashboard() {
        log.info("Returning to the dashboard");
        // TODO: navigate back to the school dashboard
    }

    @When("I shortlist a new applicant")
    public void iShortlistANewApplicant() {
        log.info("Shortlisting a new applicant");
        // TODO: shortlist an applicant via the All Applicants section
    }

    @When("I close an Active job")
    public void iCloseAnActiveJobOnDashboard() {
        log.info("Closing an Active job");
        // TODO: close the first Active job in Manage Jobs
    }

    @When("I navigate directly to the change password section")
    public void iNavigateDirectlyToTheChangePasswordSection() {
        log.info("Navigating directly to change password without login");
        // TODO: navigate to change password URL without being logged in
    }

    // ─── Then ────────────────────────────────────────────────────────────────

    @Then("the dashboard should show a {string} card")
    public void theDashboardShouldShowACard(String cardLabel) {
        log.info("Asserting dashboard card: {}", cardLabel);
        // TODO: assert card element with label cardLabel is visible on the dashboard
    }

    @Then("the {string} card should display {int}")
    public void theCardShouldDisplay(String cardLabel, int expectedValue) {
        log.info("Asserting '{}' card shows {}", cardLabel, expectedValue);
        // TODO: assert numeric text in card with cardLabel equals expectedValue
    }

    @Then("the {string} count should be N + {int}")
    public void theCountShouldBeNPlus(String statLabel, int increment) {
        log.info("Asserting '{}' count increased by {}", statLabel, increment);
        int initial = (int) context.get("initialStatValue");
        // TODO: read current stat and assert it equals initial + increment
    }

    @Then("the {string} count should be N - {int}")
    public void theCountShouldBeNMinus(String statLabel, int decrement) {
        log.info("Asserting '{}' count decreased by {}", statLabel, decrement);
        int initial = (int) context.get("initialStatValue");
        // TODO: read current stat and assert it equals initial - decrement
    }

    @Then("all statistics cards should show {int}")
    public void allStatisticsCardsShouldShow(int value) {
        log.info("Asserting all stats cards show {}", value);
        // TODO: assert each stats card shows the expected value (0 for new accounts)
    }

    @Then("the dashboard should show a bar chart or graph")
    public void theDashboardShouldShowABarChartOrGraph() {
        log.info("Asserting bar chart is visible");
        // TODO: assert chart/graph element is present on the page
    }

    @Then("the chart should represent application trends over time")
    public void theChartShouldRepresentApplicationTrendsOverTime() {
        log.info("Asserting chart represents application trend data");
        // TODO: assert chart has data points/bars
    }

    @Then("the sidebar should show the institute's name")
    public void theSidebarShouldShowTheInstitutesName() {
        log.info("Asserting institute name in sidebar");
        // TODO: assert institute name element in sidebar is not empty
    }

    @Then("the sidebar should show the school admin's email or role")
    public void theSidebarShouldShowTheSchoolAdminsEmailOrRole() {
        log.info("Asserting email or role in sidebar");
        // TODO: assert email or role text is present in the sidebar
    }

    @Then("there should be a dedicated {string} widget on the dashboard")
    public void thereShouldBeADedicatedWidgetOnTheDashboard(String widgetLabel) {
        log.info("Asserting dedicated widget: {}", widgetLabel);
        // TODO: assert widget element with widgetLabel is present
    }

    @Then("the dashboard should be displayed")
    public void theDashboardShouldBeDisplayed() {
        log.info("Asserting dashboard is displayed");
        // TODO: assert dashboard heading or main content is visible
    }

    @Then("the teacher's name should be visible on the page")
    public void theTeachersNameShouldBeVisibleOnThePage() {
        log.info("Asserting teacher name is visible");
        // TODO: assert name element text is not empty
    }

    @Then("the dashboard should show the number of jobs applied to")
    public void theDashboardShouldShowTheNumberOfJobsAppliedTo() {
        log.info("Asserting jobs applied count is shown");
        // TODO: assert jobs applied stat or widget is present
    }

    @Then("the dashboard should show the profile completion percentage")
    public void theDashboardShouldShowTheProfileCompletionPercentage() {
        log.info("Asserting profile completion is shown");
        // TODO: assert profile completion widget or percentage is present
    }

    @Then("the dashboard should show recent or recommended jobs")
    public void theDashboardShouldShowRecentOrRecommendedJobs() {
        log.info("Asserting recent/recommended jobs section is present");
        // TODO: assert job listings section is present
    }

    @Then("the sidebar should contain a link to {string}")
    public void theSidebarShouldContainALinkTo(String linkText) {
        log.info("Asserting sidebar link: {}", linkText);
        // TODO: assert sidebar navigation link with text linkText is present
    }

    @Then("I should be on the school dashboard page")
    public void iShouldBeOnTheSchoolDashboardPage() {
        log.info("Asserting user is on school dashboard");
        assertEquals("employer", context.getCurrentUserRole(),
            "User should be in employer role");
        // TODO: also assert URL is "/school-dashboard"
    }

    @Then("I should be on the teacher dashboard page")
    public void iShouldBeOnTheTeacherDashboardPage() {
        log.info("Asserting user is on teacher dashboard");
        assertEquals("teacher", context.getCurrentUserRole(),
            "User should be in teacher role");
        // TODO: also assert URL is "/dashboard"
    }

    @Then("the dashboard should contain a card labelled {string}")
    public void theDashboardShouldContainACardLabelled(String label) {
        log.info("Asserting dashboard contains card: {}", label);
        // TODO: assert card with label text is present
    }

    @Then("the Active job count on the dashboard should decrease by {int}")
    public void theActiveJobCountOnTheDashboardShouldDecreaseBy(int decrement) {
        log.info("Asserting Active job count decreased by {}", decrement);
        // TODO: assert Active jobs count is now lower
    }

    @Then("it should show the total count of all applicants across all jobs")
    public void itShouldShowTheTotalCountOfAllApplicantsAcrossAllJobs() {
        log.info("Asserting Total Applicants widget shows aggregated count");
        int expected = (int) context.get("expectedApplicantCount");
        // TODO: assert widget numeric value equals expected
    }
}
