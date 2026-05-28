package com.skooljobs.stepDefinitions;

import com.skooljobs.utils.TestContext;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class PackageSteps {

    private static final Logger log = LoggerFactory.getLogger(PackageSteps.class);

    private final TestContext context;

    public PackageSteps(TestContext context) {
        this.context = context;
    }

    // ─── Given ───────────────────────────────────────────────────────────────

    @Given("the school has an active {string} subscription")
    public void theSchoolHasAnActiveSubscription(String planName) {
        log.info("Pre-condition: school has active '{}' plan", planName);
        context.set("activePlan", planName);
        // TODO: set school subscription to the given plan via test data API
    }

    @Given("the Basic plan has a free trial option")
    public void theBasicPlanHasAFreeTrialOption() {
        log.info("Pre-condition: Basic plan has a free trial");
        // TODO: ensure Basic plan includes free trial in test data
    }

    @Given("the school has an active Basic plan")
    public void theSchoolHasAnActiveBasicPlan() {
        log.info("Pre-condition: school is on Basic plan");
        context.set("activePlan", "Basic");
        // TODO: set school subscription to Basic
    }

    @Given("the school already has an active {string} subscription")
    public void theSchoolAlreadyHasAnActiveSubscription(String planName) {
        log.info("Pre-condition: school already subscribed to '{}'", planName);
        context.set("activePlan", planName);
        // TODO: ensure subscription is already set for the school
    }

    @Given("I am viewing the {string} plan")
    public void iAmViewingThePlan(String planName) {
        log.info("Viewing plan: {}", planName);
        context.set("viewingPlan", planName);
        // TODO: scroll to or focus on the plan card
    }

    // ─── When ────────────────────────────────────────────────────────────────

    @When("I click the {string} button on the {string} plan")
    public void iClickTheButtonOnThePlan(String buttonText, String planName) {
        log.info("Clicking '{}' on plan '{}'", buttonText, planName);
        context.set("selectedPlan", planName);
        context.set("planAction", buttonText);
        // TODO: find the plan card and click the button
    }

    @When("I click {string} or {string} on the Premium plan")
    public void iClickOrOnThePremiumPlan(String btn1, String btn2) {
        log.info("Clicking '{}' or '{}' on Premium plan", btn1, btn2);
        context.set("selectedPlan", "Premium");
        // TODO: find Premium plan card and click the first available button
    }

    @When("I purchase the {string} plan")
    public void iPurchaseThePlan(String planName) {
        log.info("Purchasing plan: {}", planName);
        context.set("purchasedPlan", planName);
        context.setLastPackageId(planName);
        // TODO: select plan and complete purchase flow
    }

    @When("I try to purchase the {string} plan again")
    public void iTryToPurchaseThePlanAgain(String planName) {
        log.info("Attempting to re-purchase: {}", planName);
        context.set("selectedPlan", planName);
        // TODO: attempt to click subscribe on the already-active plan
    }

    @When("I enter valid payment details")
    public void iEnterValidPaymentDetails() {
        log.info("Entering valid payment details");
        context.set("cardNumber", "4111111111111111");
        context.set("expiry", "12/28");
        context.set("cvv", "123");
        // TODO: fill payment form with valid test card details
    }

    @When("I enter payment details with an expired card {string}")
    public void iEnterPaymentDetailsWithAnExpiredCard(String expiry) {
        log.info("Entering expired card with expiry: {}", expiry);
        context.set("cardNumber", "4111111111111111");
        context.set("expiry", expiry);
        context.set("cvv", "123");
        // TODO: fill payment form with expired expiry
    }

    @When("I enter payment details that simulate insufficient funds")
    public void iEnterPaymentDetailsThatSimulateInsufficientFunds() {
        log.info("Entering insufficient funds card");
        context.set("cardNumber", "4000000000009995");
        context.set("expiry", "12/28");
        context.set("cvv", "123");
        // TODO: use test card number that triggers insufficient funds
    }

    @When("I enter card number {string} with expiry {string} and CVV {string}")
    public void iEnterCardDetails(String cardNumber, String expiry, String cvv) {
        log.info("Entering card: {} / {} / {}", cardNumber, expiry, cvv);
        context.set("cardNumber", cardNumber);
        context.set("expiry", expiry);
        context.set("cvv", cvv);
        // TODO: fill payment form fields
    }

    @When("I leave the card number field empty")
    public void iLeaveTheCardNumberFieldEmpty() {
        log.info("Leaving card number empty");
        context.set("cardNumber", "");
        // TODO: ensure card number field is blank
    }

    @When("I enter an invalid card number {string}")
    public void iEnterAnInvalidCardNumber(String cardNumber) {
        log.info("Entering invalid card number: {}", cardNumber);
        context.set("cardNumber", cardNumber);
        // TODO: fill card number field with invalid value
    }

    @When("I leave the expiry date field empty")
    public void iLeaveTheExpiryDateFieldEmpty() {
        log.info("Leaving expiry date empty");
        context.set("expiry", "");
        // TODO: ensure expiry field is blank
    }

    @When("I leave the CVV field empty")
    public void iLeaveTheCVVFieldEmpty() {
        log.info("Leaving CVV empty");
        context.set("cvv", "");
        // TODO: ensure CVV field is blank
    }

    @When("I complete a successful purchase")
    public void iCompleteASuccessfulPurchase() {
        log.info("Completing a successful purchase");
        context.set("purchasedPlan", context.get("selectedPlan"));
        // TODO: fill valid payment details and submit
    }

    @When("I am on the payment page")
    public void iAmOnThePaymentPage() {
        log.info("On the payment page");
        // TODO: navigate to the payment page
    }

    @When("I click the {string} or {string} button")
    public void iClickTheOrButton(String btn1, String btn2) {
        log.info("Clicking '{}' or '{}'", btn1, btn2);
        // TODO: click the first available button
    }

    // ─── Then ────────────────────────────────────────────────────────────────

    @Then("the Packages page should display at least one subscription plan")
    public void thePackagesPageShouldDisplayAtLeastOneSubscriptionPlan() {
        log.info("Asserting at least one package card is visible");
        // TODO: assert package card count > 0
    }

    @Then("the Packages section should contain a {string} plan")
    public void thePackagesSectionShouldContainAPlan(String planName) {
        log.info("Asserting plan '{}' is present", planName);
        // TODO: assert package card with planName text is visible
    }

    @Then("each plan should show the plan name, price, and features")
    public void eachPlanShouldShowDetails() {
        log.info("Asserting each plan card shows name, price, features");
        // TODO: assert each card has name, price, and feature list elements
    }

    @Then("each package card should have a {string} or {string} button")
    public void eachPackageCardShouldHaveAButton(String btn1, String btn2) {
        log.info("Asserting each package card has '{}' or '{}'", btn1, btn2);
        // TODO: assert each card has at least one of these buttons
    }

    @Then("the {string} plan card should be highlighted or labelled {string}")
    public void thePlanCardShouldBeHighlightedOrLabelled(String planName, String label) {
        log.info("Asserting plan '{}' is highlighted with label '{}'", planName, label);
        // TODO: assert active plan card has highlighted class or label text
    }

    @Then("the subscribe button for {string} should say {string} or be disabled")
    public void theSubscribeButtonShouldSayOrBeDisabled(String plan, String label) {
        log.info("Asserting subscribe button state for plan '{}'", plan);
        // TODO: assert button text or disabled attribute
    }

    @Then("I should be navigated to the package purchase or payment page for {string}")
    public void iShouldBeNavigatedToThePaymentPageFor(String planName) {
        log.info("Asserting navigation to payment page for plan: {}", planName);
        // TODO: assert URL contains payment path and plan name in context
        assertEquals(planName, context.get("selectedPlan"));
    }

    @Then("the payment page should be displayed")
    public void thePaymentPageShouldBeDisplayed() {
        log.info("Asserting payment page is displayed");
        // TODO: assert payment form elements are visible
    }

    @Then("the selected plan {string} should be shown as the order summary")
    public void theSelectedPlanShouldBeShownAsTheOrderSummary(String planName) {
        log.info("Asserting order summary shows plan: {}", planName);
        // TODO: assert order summary text contains planName
    }

    @Then("the purchase should be completed successfully")
    public void thePurchaseShouldBeCompletedSuccessfully() {
        log.info("Asserting purchase completed");
        // TODO: assert success indicator or redirect to confirmation
    }

    @Then("the Packages section should show {string} as the {string}")
    public void thePackagesSectionShouldShowAsThe(String planName, String label) {
        log.info("Asserting '{}' is shown as '{}'", planName, label);
        // TODO: assert active plan label
    }

    @Then("the new purchase should appear as a transaction entry")
    public void theNewPurchaseShouldAppearAsATransactionEntry() {
        log.info("Asserting purchase appears in transactions");
        // TODO: assert transaction row exists with recent plan purchase
    }

    @Then("I should return to the Packages page")
    public void iShouldReturnToThePackagesPage() {
        log.info("Asserting redirect back to Packages page");
        // TODO: assert URL contains packages path
    }

    @Then("no purchase should have been made")
    public void noPurchaseShouldHaveBeenMade() {
        log.info("Asserting no purchase occurred");
        // TODO: assert no new transaction exists
        assertNull(context.get("purchasedPlan"), "No purchase should have been made");
    }

    @Then("I should see a warning message about downgrading")
    public void iShouldSeeAWarningMessageAboutDowngrading() {
        log.info("Asserting downgrade warning is shown");
        // TODO: assert warning message element is visible
    }

    @Then("I should see a validation error {string}")
    public void iShouldSeeAValidationError(String error) {
        log.info("Asserting validation error: {}", error);
        // TODO: assert error message contains expected text
    }

    @Then("I should see the error {string}")
    public void iShouldSeeTheError(String error) {
        log.info("Asserting error: {}", error);
        // TODO: assert error or validation message text
    }

    @Then("the plan should include {string} in its feature list")
    public void thePlanShouldIncludeInItsFeatureList(String feature) {
        log.info("Asserting feature '{}' is in plan", feature);
        // TODO: assert feature text is present in the plan card
    }

    @Then("all package prices should be displayed with a currency symbol or label")
    public void allPackagePricesShouldBeDisplayedWithACurrencySymbol() {
        log.info("Asserting prices show currency symbol");
        // TODO: assert each price element starts with ₹ or $
    }

    @Then("no error messages should be visible on the Packages page")
    public void noErrorMessagesShouldBeVisibleOnThePackagesPage() {
        log.info("Asserting no error messages on Packages page");
        // TODO: assert no error elements are visible
    }

    @Then("all package cards should be fully rendered")
    public void allPackageCardsShouldBeFullyRendered() {
        log.info("Asserting all package cards are rendered");
        // TODO: assert each card has a name, price, and button
    }
}
