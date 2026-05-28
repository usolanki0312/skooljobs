package com.skooljobs.hooks;

import com.skooljobs.utils.TestContext;
import io.cucumber.java.After;
import io.cucumber.java.AfterAll;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.Scenario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Global Cucumber Hooks.
 *
 * Execution order:
 *   @BeforeAll  → once before the entire suite
 *   @Before     → before each scenario
 *   @After      → after each scenario
 *   @AfterAll   → once after the entire suite
 */
public class Hooks {

    private static final Logger log = LoggerFactory.getLogger(Hooks.class);

    private final TestContext context;

    public Hooks(TestContext context) {
        this.context = context;
    }

    // ─── Suite-level ────────────────────────────────────────────────────────

    @BeforeAll
    public static void globalSetup() {
        log.info("╔══════════════════════════════════════╗");
        log.info("║   SkoolJobs BDD Test Suite Starting  ║");
        log.info("╚══════════════════════════════════════╝");
        // TODO: start mock server / seed database if needed
    }

    @AfterAll
    public static void globalTeardown() {
        log.info("╔══════════════════════════════════════╗");
        log.info("║   SkoolJobs BDD Test Suite Complete  ║");
        log.info("╚══════════════════════════════════════╝");
        // TODO: stop mock server / clean up database if needed
    }

    // ─── Scenario-level ─────────────────────────────────────────────────────

    @Before(order = 1)
    public void beforeScenario(Scenario scenario) {
        log.info("▶ START  [{}] | Tags: {}", scenario.getName(), scenario.getSourceTagNames());
        context.setScenarioName(scenario.getName());
        context.setScenarioTags(scenario.getSourceTagNames().toString());
        context.reset();
        // TODO: initialise any HTTP client / app state here
    }

    @Before(value = "@requiresLogin", order = 2)
    public void loginBeforeScenario(Scenario scenario) {
        log.info("   ↳ Pre-login hook triggered for: {}", scenario.getName());
        // TODO: perform programmatic login and store token in context
    }

    @Before(value = "@requiresSchoolLogin", order = 2)
    public void schoolLoginBeforeScenario(Scenario scenario) {
        log.info("   ↳ Pre-login (School) hook triggered for: {}", scenario.getName());
        // TODO: perform programmatic school login and store token in context
    }

    @After(order = 1)
    public void afterScenario(Scenario scenario) {
        if (scenario.isFailed()) {
            log.error("✗ FAILED [{}]", scenario.getName());
            // TODO: attach screenshot or log dump to scenario report
            // scenario.attach(screenshot, "image/png", "failure-screenshot");
        } else {
            log.info("✔ PASSED [{}]", scenario.getName());
        }
        context.reset();
    }

    @After(value = "@cleanupJobs")
    public void cleanupPostedJobs(Scenario scenario) {
        log.info("   ↳ Cleanup: removing jobs created in: {}", scenario.getName());
        // TODO: delete jobs created during test via API/service
    }

    @After(value = "@cleanupProfile")
    public void cleanupProfile(Scenario scenario) {
        log.info("   ↳ Cleanup: resetting profile changes in: {}", scenario.getName());
        // TODO: reset profile to original state
    }
}
