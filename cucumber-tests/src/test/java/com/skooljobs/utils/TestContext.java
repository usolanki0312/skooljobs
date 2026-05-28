package com.skooljobs.utils;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Shared scenario state container injected into every step definition
 * and hook via Cucumber's PicoContainer dependency injection.
 *
 * Usage in step definitions:
 *   public MySteps(TestContext context) { this.context = context; }
 */
public class TestContext {

    // ─── Scenario metadata ──────────────────────────────────────────────────
    private String scenarioName;
    private String scenarioTags;

    // ─── Auth state ─────────────────────────────────────────────────────────
    private String currentUserEmail;
    private String currentUserRole;   // "teacher" | "school"
    private String authToken;
    private boolean loggedIn;

    // ─── Last API / action response ─────────────────────────────────────────
    private int    lastStatusCode;
    private String lastResponseBody;
    private String lastErrorMessage;

    // ─── Domain objects shared across steps ─────────────────────────────────
    private String lastJobId;
    private String lastApplicantId;
    private String lastPackageId;

    // ─── Generic key-value store for ad-hoc data ────────────────────────────
    private final Map<String, Object> data = new HashMap<>();

    // ─── Reset between scenarios ────────────────────────────────────────────
    public void reset() {
        currentUserEmail  = null;
        currentUserRole   = null;
        authToken         = null;
        loggedIn          = false;
        lastStatusCode    = 0;
        lastResponseBody  = null;
        lastErrorMessage  = null;
        lastJobId         = null;
        lastApplicantId   = null;
        lastPackageId     = null;
        data.clear();
    }

    // ─── Generic store ──────────────────────────────────────────────────────
    public void set(String key, Object value) { data.put(key, value); }

    @SuppressWarnings("unchecked")
    public <T> T get(String key) { return (T) data.get(key); }

    public boolean has(String key) { return data.containsKey(key); }

    // ─── Getters / Setters ──────────────────────────────────────────────────

    public String getScenarioName()                    { return scenarioName; }
    public void   setScenarioName(String s)            { this.scenarioName = s; }

    public String getScenarioTags()                    { return scenarioTags; }
    public void   setScenarioTags(String s)            { this.scenarioTags = s; }

    public String getCurrentUserEmail()                { return currentUserEmail; }
    public void   setCurrentUserEmail(String e)        { this.currentUserEmail = e; }

    public String getCurrentUserRole()                 { return currentUserRole; }
    public void   setCurrentUserRole(String r)         { this.currentUserRole = r; }

    public String getAuthToken()                       { return authToken; }
    public void   setAuthToken(String t)               { this.authToken = t; }

    public boolean isLoggedIn()                        { return loggedIn; }
    public void   setLoggedIn(boolean b)               { this.loggedIn = b; }

    public int    getLastStatusCode()                  { return lastStatusCode; }
    public void   setLastStatusCode(int c)             { this.lastStatusCode = c; }

    public String getLastResponseBody()                { return lastResponseBody; }
    public void   setLastResponseBody(String b)        { this.lastResponseBody = b; }

    public String getLastErrorMessage()                { return lastErrorMessage; }
    public void   setLastErrorMessage(String m)        { this.lastErrorMessage = m; }

    public String getLastJobId()                       { return lastJobId; }
    public void   setLastJobId(String id)              { this.lastJobId = id; }

    public String getLastApplicantId()                 { return lastApplicantId; }
    public void   setLastApplicantId(String id)        { this.lastApplicantId = id; }

    public String getLastPackageId()                   { return lastPackageId; }
    public void   setLastPackageId(String id)          { this.lastPackageId = id; }
}
