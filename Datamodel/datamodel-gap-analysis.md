# Datamodel Gap Analysis — SkoolJobs

**Date:** 2026-06-06
**Compared against:** `Datamodel/datamodel.json` vs. the implemented React app (`src/`)

This document lists what attributes/collections are **missing or out of sync** in
`datamodel.json` based on what the UI actually builds and persists today. Each item
is tagged:

- 🆕 **NEW COLLECTION** — needs to be added
- ➕ **ADD FIELDS** — collection exists, fields are missing
- ✏️ **FIX/RENAME** — field exists but is wrong (bad key, wrong type, stale enum)

---

## Summary table

| # | Collection | Action | Driver in code |
|---|------------|--------|----------------|
| 1 | `jobs` | ➕ / ✏️ Major — ~30 fields missing, 2 bad keys | `SchoolPostJob.jsx` `blankForm`, `postjobOptions.js` |
| 2 | `interviews` | 🆕 New collection | `SchoolInterviews.jsx`, `TeacherInterviews.jsx` |
| 3 | `saved_candidates` | 🆕 New collection (or embed) | `SchoolSavedCandidates.jsx` |
| 4 | `packages` | 🆕 New collection | `SchoolPackages.jsx` + `school_profiles` subscription |
| 5 | `transactions` | 🆕 New collection | `SchoolTransactions.jsx` |
| 6 | `users` | ➕ Team-member linkage + role reconcile | `SchoolSettings.jsx` (members, ownership transfer) |
| 7 | `school_profiles` | ➕ staff/student strength + subscription | `schooldata.js`, `SchoolPackages.jsx` |
| 8 | `teacher_profiles` | ➕ job preferences, salary expectation | `teacherdata.js` |
| 9 | `activity_logs` | ➕ New `action_type` enum values | interviews, members, packages |

---

## 1. `jobs` — biggest gap ➕ ✏️

The current `jobs` schema captures a basic job. The real post-job wizard
(`SchoolPostJob.jsx`, 7 sections + `postjobOptions.js`) collects far more.

### ✏️ Fix existing bad keys / types
| Current | Problem | Suggested |
|---------|---------|-----------|
| `"CTC_per_year": "String \| null"` | Inconsistent casing | `ctc_per_year` |
| `"Monthly Take Home": "String \| null"` | **Key contains spaces** — invalid as a Mongo field name in queries | `monthly_take_home` |
| `status` enum `['draft','active','closed','expired']` | UI also produces **`scheduled`** (publish later) | add `'scheduled'` |
| `employment_type` enum | UI uses `Full Time / Part Time / Contract / Hybrid / Remote / Internship` (with spaces) — datamodel uses `Full-time / Part-time / Contract / Visiting / Internship` | reconcile to the UI set |

### ➕ Add fields (grouped as the form is structured)

**Role & basics**
- `role_category` — enum `['Teacher','Administrator','Teacher & Administrator']`
- `job_title_group` — string (the group, e.g. "Subject-Specific Teachers")
- `joining_timeline` — enum `['Immediate','Within 7 Days',...,'Flexible']`

**Language requirements**
- `languages` — `object[]` of `{ name, proficiency }` (proficiency from `PROFICIENCY_LEVELS`)

**Qualifications & experience**
- `min_qualification` — string (`MIN_QUALIFICATIONS`)
- `additional_qualification` — string
- `certifications` — `string[]`
- `student_levels` — `string[]` (`STUDENT_LEVELS`)
- `preferred_school_types` — `string[]` (`PREFERRED_SCHOOL_TYPES`)

**Skills**
- `required_skills` — `string[]`
- `technical_skills` — `string[]`

**Salary & benefits** (nest under a `compensation` object — fields depend on `employment_type`)
- `compensation_structure` — enum `['Monthly','Annual CTC','Both','Negotiable']`
- `monthly_benefits` — `string[]`, `annual_benefits` — `string[]`
- Full-time: `min_annual_ctc`, `max_annual_ctc`, `in_hand_percentage`, `min_monthly_salary`, `max_monthly_salary`
- Part-time: `min_hourly_rate`, `max_hourly_rate`, `hours_per_week`
- Contract: `contract_duration`, `contract_payment_type`, `contract_monthly_payment`, `contract_total_value`
- Hybrid: `wfh_days`, `office_days`
- Remote: `work_timezone`, `remote_location`
- Internship: `internship_duration`, `min_stipend`, `max_stipend`

**Hiring preferences / publishing**
- `gender_preference` — enum `['Male','Female','Any']`
- `interview_mode` — enum (`INTERVIEW_MODES`)
- `hiring_rounds` — enum (`HIRING_ROUNDS`)
- `publish_option` — enum (`PUBLISH_SETTINGS`: Publish Immediately / Schedule / Draft / Private / Featured / Urgent / Auto Expire / Auto Renew)
- `publish_date`, `publish_time` — for scheduled posts

> Recommendation: group salary fields under a `compensation` sub-object and the
> preference fields under `hiring_preferences` to keep the document readable.

---

## 2. `interviews` 🆕 NEW COLLECTION

Heavily used by `SchoolInterviews.jsx` (create/edit) and `TeacherInterviews.jsx`
(read + reschedule). Currently only lives in `localStorage` — no schema exists.

```
interviews
  _id                ObjectId
  interview_id       string — e.g. INT-0001
  application_id     string — APP-0001 (link to applications)
  job_id             string — JOB-0001
  school_id          string — SCH-0001
  teacher_user_id    string — USR-0001 (candidate)
  candidate_name     string — denormalized
  job_title          string — denormalized
  round              enum — ['1st Round','2nd Round','Technical Round','HR Round','Final Round']
  date               Date
  time               string
  duration           enum — ['15 Minutes',...,'90 Minutes']
  mode               enum — ['Online','In-Person','Telephonic']
  online_platform    enum | null — ['Google Meet','Zoom','Microsoft Teams','WhatsApp Video Call']
  meeting_link       string | null — required unless platform = WhatsApp Video Call
  location           string | null — In-Person
  room               string | null — In-Person
  interviewer        string | null
  notes_for_candidate string | null
  internal_notes     string | null — HR only
  reminders          object — { confirmation: bool, before_24h: bool, before_1h: bool } (Online only)
  status             enum — ['Scheduled','Confirmed','Completed','Cancelled','Reschedule Requested']
  reschedule_request object | null — { requested_date, requested_time, requested_at }
  created_at         Date
  updated_at         Date

_indexes: interview_id (unique), application_id, school_id, teacher_user_id, status
```

> Note: only **shortlisted** applicants can be scheduled — enforce against
> `applications.status === 'shortlisted'`.

---

## 3. `saved_candidates` 🆕 NEW COLLECTION (or embed)

`SchoolSavedCandidates.jsx` lets a school bookmark applicant profiles and attach
private notes. The datamodel has the **teacher** side (`teacher_profiles.saved_jobs`)
but no **school → candidate** equivalent. `activity_logs` already references a
`candidate_saved` action, confirming this is intended.

```
saved_candidates
  _id              ObjectId
  school_id        string — SCH-0001
  saved_by_user_id string — USR (HR/admin who saved)
  teacher_user_id  string — USR-0001
  application_id   string | null
  note             string | null — private HR note per candidate
  created_at       Date

_indexes: { school_id:1, teacher_user_id:1 } unique
```

> Alternative: embed a `saved_candidates: object[]` array on `school_profiles`,
> mirroring how `saved_jobs` is embedded on `teacher_profiles`. Pick one style for
> consistency.

---

## 4. `packages` 🆕 NEW COLLECTION

`SchoolPackages.jsx` is a placeholder, but pricing plans need a catalog. Required
to support `activity_logs.subscription_purchased` and transactions.

```
packages
  _id            ObjectId
  package_id     string — PKG-0001
  name           string — e.g. 'Starter', 'Growth', 'Enterprise'
  price          number
  currency       string — 'INR'
  billing_cycle  enum — ['monthly','quarterly','yearly','one_time']
  job_post_limit number | null — null = unlimited
  features       string[] — e.g. ['Featured jobs','Unlimited applicants']
  is_active      boolean
  created_at     Date
```

---

## 5. `transactions` 🆕 NEW COLLECTION

`SchoolTransactions.jsx` placeholder — needs payment records tied to packages.

```
transactions
  _id             ObjectId
  transaction_id  string — TXN-0001
  school_id       string — SCH-0001
  user_id         string — USR who paid
  package_id      string — PKG-0001
  amount          number
  currency        string — 'INR'
  status          enum — ['pending','success','failed','refunded']
  payment_method  string | null — e.g. 'razorpay','upi','card'
  gateway_ref     string | null — provider transaction id
  invoice_url     string | null
  created_at      Date

_indexes: transaction_id (unique), school_id, status
```

---

## 6. `users` — team members & role reconcile ➕

`SchoolSettings.jsx` lets a primary School Admin create up to **3 team members**,
edit them, delete them, and **transfer ownership**. The datamodel `users` schema
has the roles but no parent/member linkage or the cap.

➕ Add to `users._schema`:
- `is_primary_owner` — boolean (the school's owning account)
- `parent_user_id` — string | null (USR of the admin who created this member)
- `member_status` — enum `['active','suspended']`

✏️ Reconcile **roles**: datamodel uses
`['teacher','school_principal','school_admin','school_hr','skooljobs_admin','skooljobs_superadmin']`
but the app code writes `role: 'employer'` and `role: 'teacher'` (see
`SchoolSettings.jsx`, `login.jsx`). Decide on one canonical role vocabulary and map
the legacy `'employer'` value.

> Business rule to capture somewhere: **max 3 members per school** + ownership
> transfer demotes the old admin to member.

---

## 7. `school_profiles` ➕

- `staff_strength` — enum string range (`['1 - 10',...,'200+']`) — UI collects this
  (`staffStrength`); datamodel only has numeric `total_teachers`.
- `student_strength` — enum string range (`['Less than 100',...,'5000+']`) — not in datamodel.
- `subscription` — embedded object (active plan):
  `{ package_id, status, started_at, expires_at, job_posts_used }`
- ✏️ `school_type` enum is missing **`'Day School'`** which `schooldata.js` offers.

---

## 8. `teacher_profiles` ➕

UI / `teacherdata.js` collect preferences not present in the schema:
- `preferred_job_types` — `string[]` (`jobTypes`: Full Time/Part Time/Freelance/Online/Temporary/Any)
- `teaching_medium` — string (`teachingMediums`)
- `expected_salary` — string (`expectedSalaryRanges`)
- `applied_jobs_count`, `shortlisted_jobs_count` — denormalized counters (shown on dashboard)

✏️ Minor: `languages[].proficiency` values in datamodel vs. app
(`'Fluency enough to teach','Native Speaker','Basic Knowledge','Professional Working Proficiency'`)
— align the enum.

---

## 9. `activity_logs` ➕

`action_type` enum is missing the events the new pages emit. Add:
- `interview_scheduled`, `interview_confirmed`, `interview_completed`,
  `interview_cancelled`, `reschedule_requested`
- `member_added`, `member_removed`, `ownership_transferred`
- `package_purchased` (or reuse existing `subscription_purchased`),
  `payment_failed`

➕ Extend `metadata` with: `interview_id`, `package_id`, `transaction_id`, `member_user_id`.

---

## Suggested order of work

1. **Fix `jobs`** (it already exists and is most divergent — bad keys + missing fields).
2. **Add `interviews`** (fully built in UI, only in localStorage today).
3. **Add `saved_candidates`** (or embed) + reconcile `users` member linkage.
4. **Add `packages` + `transactions`** + `school_profiles.subscription`.
5. **Backfill** `teacher_profiles` / `school_profiles` / `activity_logs` enums.
