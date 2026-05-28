package com.skooljobs.utils;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Reads JSON test-data files from src/test/resources/testdata/.
 *
 * Usage:
 *   JSONObject teacher = TestDataReader.getUser("teacher");
 *   JSONObject job     = TestDataReader.getJob("mathTeacherJob");
 */
public class TestDataReader {

    private static final Logger log = LoggerFactory.getLogger(TestDataReader.class);

    private static final String BASE_PATH =
        "src/test/resources/testdata/";

    // ─── Users ──────────────────────────────────────────────────────────────

    public static JSONObject getUser(String key) {
        return readJson("users.json").getJSONObject(key);
    }

    public static String getUserEmail(String key) {
        return getUser(key).getString("email");
    }

    public static String getUserPassword(String key) {
        return getUser(key).getString("password");
    }

    // ─── Jobs ───────────────────────────────────────────────────────────────

    public static JSONObject getJob(String key) {
        return readJson("jobs.json").getJSONObject(key);
    }

    public static JSONArray getAllJobs() {
        return readJson("jobs.json").getJSONArray("all");
    }

    // ─── Packages ───────────────────────────────────────────────────────────

    public static JSONObject getPackage(String key) {
        return readJson("packages.json").getJSONObject(key);
    }

    // ─── Core reader ────────────────────────────────────────────────────────

    public static JSONObject readJson(String fileName) {
        String path = BASE_PATH + fileName;
        try {
            String content = new String(Files.readAllBytes(Paths.get(path)));
            return new JSONObject(content);
        } catch (IOException e) {
            log.error("Failed to read test data file: {}", path, e);
            throw new RuntimeException("Cannot load test data: " + path, e);
        }
    }
}
