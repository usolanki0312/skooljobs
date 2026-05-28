package com.skooljobs.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * Reads values from src/test/resources/config.properties.
 *
 * Usage:
 *   String url = ConfigReader.get("app.base.url");
 */
public class ConfigReader {

    private static final Logger log = LoggerFactory.getLogger(ConfigReader.class);
    private static final Properties props = new Properties();

    static {
        try (FileInputStream fis = new FileInputStream(
                "src/test/resources/config.properties")) {
            props.load(fis);
            log.info("Config loaded. Environment = {}", props.getProperty("environment"));
        } catch (IOException e) {
            throw new RuntimeException("Cannot load config.properties", e);
        }
    }

    public static String get(String key) {
        String value = props.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Missing config key: " + key);
        }
        return value.trim();
    }

    public static String get(String key, String defaultValue) {
        return props.getProperty(key, defaultValue).trim();
    }

    public static int getInt(String key) {
        return Integer.parseInt(get(key));
    }

    public static String getBaseUrl()        { return get("app.base.url"); }
    public static String getEnvironment()    { return get("environment"); }
    public static String getTeacherEmail()   { return get("teacher.email"); }
    public static String getTeacherPass()    { return get("teacher.password"); }
    public static String getSchoolEmail()    { return get("school.email"); }
    public static String getSchoolPass()     { return get("school.password"); }
}
