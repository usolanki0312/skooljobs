@packages @subscriptionPackages @requiresSchoolLogin
Feature: Subscription Packages
  As a logged-in school admin
  I want to view available subscription packages
  So that I can choose a plan that suits my hiring needs

  Background:
    Given the SkoolJobs application is running
    And I am logged in as a school admin with valid credentials
    And I navigate to the "Packages" section in the school dashboard

  # ─── Positive Scenarios ─────────────────────────────────────────────────────

  @positive @smoke
  Scenario: Packages page displays available subscription plans
    Then the Packages page should display at least one subscription plan
    And each plan should show the plan name, price, and features

  @positive
  Scenario: Packages page shows Basic plan details
    Then the Packages section should contain a "Basic" plan
    And the Basic plan should show its monthly price
    And the Basic plan should list included features

  @positive
  Scenario: Packages page shows Standard plan details
    Then the Packages section should contain a "Standard" plan
    And the Standard plan price should be higher than the Basic plan

  @positive
  Scenario: Packages page shows Premium plan details
    Then the Packages section should contain a "Premium" plan
    And the Premium plan should list the most features

  @positive
  Scenario: Each package card shows a purchase or subscribe button
    Then each package card should have a "Subscribe" or "Get Started" button

  @positive
  Scenario: Currently active plan is highlighted
    Given the school has an active Standard subscription
    Then the Standard plan card should be highlighted or labelled "Current Plan"
    And the subscribe button for Standard should say "Current Plan" or be disabled

  @positive
  Scenario: Package feature list is readable and well-formatted
    Then each package card should display a bulleted or listed set of features
    And features should include items like "Job Posts", "Applicant Access", and "Support"

  @positive
  Scenario: Plans can be compared visually on the Packages page
    Then the Packages page should show all plans side by side for easy comparison

  @positive
  Scenario: Clicking "Subscribe" on a plan navigates to the payment page
    When I click the "Subscribe" button on the Premium plan
    Then I should be navigated to the package purchase or payment page for Premium

  @positive
  Scenario: Free trial information is displayed if applicable
    Given the Basic plan has a free trial option
    Then the Basic plan card should mention the free trial period

  # ─── Negative Scenarios ─────────────────────────────────────────────────────

  @negative
  Scenario: Packages page is not accessible without login
    Given I am not logged in
    When I navigate directly to the packages URL
    Then I should be redirected to the login page

  @negative
  Scenario: Teacher cannot access the Packages page
    Given I am logged in as a teacher
    When I navigate directly to the packages URL
    Then I should be redirected to the teacher dashboard or denied access

  @negative
  Scenario: Downgrading to a lower plan shows a warning
    Given the school has an active Premium subscription
    When I click "Subscribe" on the Basic plan
    Then I should see a warning message about downgrading
    And I should be asked to confirm

  # ─── Validation Scenarios ────────────────────────────────────────────────────

  @validation
  Scenario: Package prices are displayed in the correct currency
    Then all package prices should be displayed with a currency symbol or label

  @validation
  Scenario: Package page loads without errors
    Then no error messages should be visible on the Packages page
    And all package cards should be fully rendered

  @validation
  Scenario Outline: Package plans include the correct tier features
    Given I am viewing the "<planName>" plan
    Then the plan should include "<feature>" in its feature list

    Examples:
      | planName | feature              |
      | Basic    | 5 Job Posts          |
      | Standard | 20 Job Posts         |
      | Premium  | Unlimited Job Posts  |
      | Standard | Priority Support     |
      | Premium  | Dedicated Account Manager |
