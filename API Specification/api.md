# SkoolJobs API — Endpoint Reference

> Service 1 of 5: **users** service

---

## Users service

### 1. registerUser

- **API endpoint:** `POST /api/auth/registerUser`
- **Type of action:** User-level
- **What event happens:** User submits signup details. A user account is created and a UUID `user_id` is generated.
- **Req.body():**
  ```json
  {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "user_scope": "teacher"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": { "user_id": "uuid", "message": "OTP sent to phone and email" }
  }
  ```

### 2. requestOtp

- **API endpoint:** `POST /api/auth/requestOtp`
- **Type of action:** User-level (triggers a System-level delivery)
- **What event happens:** User asks to send/resend an OTP. The system generates a fresh OTP, and delivers it to the identifier.
- **Req.body():**
  ```json
  {
    "identifier": "string (phone or email)",
    "purpose": "registration | phone_verification | email_verification | password_reset"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "message": "OTP sent", "expires_in": 600s } }
  ```

### 3. verifyOtp

- **API endpoint:** `POST /api/auth/verifyOtp`
- **Type of action:** System-level
- **What event happens:** User enters the OTP. The system checks it against the stored hash and expiry, marks it used, and (for verification purposes) sets the email/phone verified flag.
- **Req.body():**
  ```json
  {
    "identifier": "string",
    "otp": "string",
    "purpose": "registration | phone_verification | email_verification | password_reset"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "verified": true } }
  ```

### 4. completeRegistration

- **API endpoint:** `POST /api/auth/completeRegistration`
- **Type of action:** User-level
- **What event happens:** User sets a password and agrees to terms. The system hashes the password, activates the account, and issues a JWT.
- **Req.body():**
  ```json
  {
    "user_id": "uuid",
    "password": "string",
    "confirm_password": "string",
    "agree_terms": true
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "token": "jwt", "user": { "...User" } } }
  ```

### 5. login

- **API endpoint:** `POST /api/auth/login`
- **Type of action:** User-level
- **What event happens:** User enters credentials. The system verifies the email + password hash, updates `last_login`, and issues a JWT.
- **Req.body():**
  ```json
  { "email": "string", "password": "string" }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "token": "jwt", "user": { "...User" } } }
  ```

### 6. logout

- **API endpoint:** `POST /api/auth/logout`
- **Type of action:** User-level
- **What event happens:** User logs out. The system invalidates the current session/token.
- **Req.body():** none (JWT sent in `Authorization` header)
- **Response:**
  ```json
  { "success": true, "data": { "message": "Logged out" } }
  ```

### 7. setPassword

> Merges the old `resetPassword` + `changePassword`. Same end goal (set a new password), so it is ONE endpoint with two ways to prove identity. The forgot-password flow is just: `requestOtp` (purpose `password_reset`) → `setPassword`.

- **API endpoint:** `PATCH /api/auth/setPassword`
- **Type of action:** User-level
- **What event happens:** Sets a new password. Identity is proven one of two ways:
  - **Logged-in change** → send `current_password` (JWT required).
  - **Forgot / reset** → send `purpose` + `otp`.
    The system verifies the chosen proof, hashes the new password, and saves it.
- **Req.body():** one of the two shapes
  ```json
  // A) logged-in change
  {
    "current_password": "string",
    "new_password": "string",
    "confirm_password": "string"
  }
  ```
  ```json
  // B) forgot / reset (via OTP)
  {
    "identifier": "string",
    "otp": "string",
    "new_password": "string",
    "confirm_password": "string"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "message": "Password updated" } }
  ```

### 8. getLoggedinUser

- **API endpoint:** `GET /api/users/getLoggedinUser`
- **Type of action:** System-level
- **What event happens:** Returns the account of the currently logged-in user (resolved from the JWT). `password_hash` is never included.
- **Req.body():** none (JWT in header)
- **Response:**
  ```json
  { "success": true, "data": { "...User" } }
  ```

---

### User object (response shape)

```json
{
  "user_id": "uuid",
  "email": "string",
  "user_scope": "sj_admin | sj_superadmin | teacher | sch_admin | sch_member",
  "school_id": "uuid | null",
  "profile_id": "uuid | null",
  "phone": "string",
  "is_active": "bool",
  "is_email_verified": "bool",
  "is_phone_verified": "bool",
  "last_login": "date | null",
  "created_at": "date",
  "updated_at": "date"
}
```

---

## TeacherProfile service

> A teacher manages their OWN profile via JWT (no id in the path). Schools/admins view a specific teacher (an applicant or a saved candidate) by `teacher_profile_id`.
> `saveProfile` saves the basic fields **and** the embedded arrays that have no own id (qualifications, experiences, achievements) in a single call. Resumes, cover letters and saved jobs have ids (resumes/cover letters are referenced by applications), so they are added/removed one at a time.

### 1. saveProfile

- **API endpoint:** `POST /api/teacherProfiles/saveTeacherProfile`
- **Type of action:** User-level
- **What event happens:** Creates the profile if it doesn't exist, otherwise updates it (upsert). Saves basic fields plus the `qualifications`, `experiences` and `achievements` arrays in one call. On first create a UUID `teacher_profile_id` is generated and linked to `users.profile_id`.
- **Req.body():** basic fields + the 3 embedded arrays (`profile_photo_url` comes from `uploadProfilePhoto`)
  ```json
  {
    "title": "Mr | Mrs | Miss | Ms | Dr | Prof",
    "first_name": "string",
    "last_name": "string",
    "main_subject": "string",
    "summary": "string",
    "is_profile_visible": true,
    "profile_photo_url": "string",
    "contact": { "mobile": "string", "primary_email": "string" },
    "address": { "pin_code": "string", "city": "string", "state": "string" },
    "notification_preferences": { "email": true, "sms": false, "push": true },
    "qualifications": [ { "...Qualification" } ],
    "experiences": [ { "...Experience" } ],
    "achievements": [ { "...Achievement" } ]
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "teacher_profile_id": "uuid" } }
  ```

### 2. getMyProfile

- **API endpoint:** `GET /api/teacherProfiles/getTeacherProfile`
- **Type of action:** System-level
- **What event happens:** Returns the full profile of the logged-in teacher (basic fields + all embedded arrays, including `saved_jobs`, `resumes`, `cover_letters`), resolved from the JWT.
- **Req.body():** none (JWT in header)
- **Response:**
  ```json
  { "success": true, "data": { "...TeacherProfileFull" } }
  ```

### 3. uploadProfilePhoto

- **API endpoint:** `POST /api/teacherProfiles/uploadProfilePhoto`
- **Type of action:** User-level
- **What event happens:** Frontend sends the image file; the backend uploads it to storage and returns its URL. That URL is then sent in `saveProfile` as `profile_photo_url`. (Separate endpoint because a binary file can't ride inside the JSON of `saveProfile`.)
- **Req.body():** `multipart/form-data` → `{ "photo": "file" }`
- **Response:**
  ```json
  { "success": true, "data": { "profile_photo_url": "string" } }
  ```

### 4. addResume

- **API endpoint:** `POST /api/teacherProfiles/addResume`
- **Type of action:** User-level
- **What event happens:** Adds a resume (uploaded file or created from form). A UUID `resume_id` is generated.
- **Req.body():** `multipart/form-data` (upload) OR JSON (create)
  ```json
  {
    "source": "uploaded | created",
    "title": "string",
    "skill": "string",
    "notes": "string"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "resume_id": "uuid" } }
  ```

### 5. deleteResume

- **API endpoint:** `DELETE /api/teacherProfiles/deleteResume/{resume_id}`
- **Type of action:** User-level
- **What event happens:** Removes a resume by its `resume_id`.
- **Req.body():** none
- **Response:**
  ```json
  { "success": true, "data": { "message": "Resume deleted" } }
  ```

### 6. addCoverLetter

- **API endpoint:** `POST /api/teacherProfiles/addCoverLetter`
- **Type of action:** User-level
- **What event happens:** Saves a cover letter (ai_generated / uploaded / manual), optionally linked to the resume it was made for and the job it targets. A UUID `cover_letter_id` is generated.
- **Req.body():**
  ```json
  {
    "title": "string",
    "source": "ai_generated | manual",
    "content": "string",
    "resume_id": "uuid | null",
    "job_id": "uuid | null"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "cover_letter_id": "uuid" } }
  ```

### 7. deleteCoverLetter

- **API endpoint:** `DELETE /api/teacherProfiles/deleteCoverLetter/{cover_letter_id}`
- **Type of action:** User-level
- **What event happens:** Removes a cover letter by its `cover_letter_id`.
- **Req.body():** none
- **Response:**
  ```json
  { "success": true, "data": { "message": "Cover letter deleted" } }
  ```

### 8. saveJob

- **API endpoint:** `POST /api/teacherProfiles/saveJob`
- **Type of action:** User-level
- **What event happens:** Bookmarks a job in the teacher's `saved_jobs`.
- **Req.body():**
  ```json
  { "job_id": "uuid" }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "message": "Job saved" } }
  ```
  (`409` if the job is already saved)

### 9. unsaveJob

- **API endpoint:** `DELETE /api/teacherProfiles/unsaveJob/{job_id}`
- **Type of action:** User-level
- **What event happens:** Removes a job from the teacher's `saved_jobs`.
- **Req.body():** none
- **Response:**
  ```json
  { "success": true, "data": { "message": "Job unsaved" } }
  ```

### 10. getTeacherProfile

- **API endpoint:** `GET /api/teacherProfiles/getTeacherProfile/{teacher_profile_id}`
- **Type of action:** User-level (school / admin)
- **What event happens:** Returns a specific teacher's full profile by `teacher_profile_id`. Used by a school to view an applicant or a saved candidate.
- **Req.body():** none (JWT in header)
- **Response:**
  ```json
  { "success": true, "data": { "...TeacherProfileFull" } }
  ```

---

## SchoolProfile service

> School staff (`sch_admin` / `sch_member`) manage their OWN school via JWT (no id in the path). Teachers/public view a school by `school_profile_id`. The school's `saved_candidates` are embedded and come back in `getMySchoolProfile`.

### 1. saveSchoolProfile

- **API endpoint:** `POST /api/schoolProfiles/saveSchoolProfile`
- **Type of action:** User-level (sch_admin / sch_member)
- **What event happens:** Creates the school profile if missing, else updates it (upsert). On first create a UUID `school_profile_id` is generated, the creator is set as `school_admin_id`, and it links to `users.profile_id` / `users.school_id`. Image URLs come from `uploadSchoolImage`.
- **Req.body():**
  ```json
  {
    "school_name": "string",
    "sector": "string",
    "school_type": "string",
    "board": "string",
    "medium": "string",
    "level": "string",
    "description": "string",
    "logo_url": "string",
    "cover_image_url": "string",
    "gallery_image_urls": ["string"],
    "contact": { "email": "string", "phone": "string", "website": "string" },
    "address": {
      "pin_code": "string",
      "city": "string",
      "state": "string",
      "country": "string"
    },
    "social_links": {
      "linkedin": "string",
      "facebook": "string",
      "twitter": "string",
      "instagram": "string"
    }
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "school_profile_id": "uuid" } }
  ```

### 2. getSchoolProfile

- **API endpoint:** `GET /api/schoolProfiles/getSchoolProfile`
- **Type of action:** User-level (school staff)
- **What event happens:** Returns the logged-in staff's full school profile (including the embedded `saved_candidates`), resolved from the JWT.
- **Req.body():** none (JWT in header)
- **Response:**
  ```json
  { "success": true, "data": { "...SchoolProfile" } }
  ```

### 3. getSchoolProfileById

- **API endpoint:** `GET /api/schoolProfiles/getSchoolProfile/{school_profile_id}`
- **Type of action:** User-level (teacher / public)
- **What event happens:** Returns a school's public profile by id (e.g. a teacher viewing the school behind a job). `saved_candidates` and `admin_notes` are not exposed publicly.
- **Req.body():** none
- **Response:**
  ```json
  { "success": true, "data": { "...SchoolProfile (public fields)" } }
  ```

### 4. uploadSchoolImage

- **API endpoint:** `POST /api/schoolProfiles/uploadSchoolImage`
- **Type of action:** User-level
- **What event happens:** Uploads one or more images; the backend stores them and returns their URLs, which are then saved via `saveSchoolProfile`. One endpoint for all three types (`type` decides): `logo`/`cover` take a single file, `gallery` can take many in one call. Returns a `urls` array (1 element for logo/cover, many for gallery). Binary files, so they can't ride inside the `saveSchoolProfile` JSON.
- **Req.body():** `multipart/form-data` → `{ "type": "logo | cover | gallery", "images": [file, ...] }`
- **Response:**
  ```json
  { "success": true, "data": { "urls": ["string"] } }
  ```

### 5. saveCandidate

- **API endpoint:** `POST /api/schoolProfiles/saveCandidate`
- **Type of action:** User-level
- **What event happens:** Bookmarks a teacher into the school's `saved_candidates` (school-level, lifelong). App enforces a ~50 cap.
- **Req.body():**
  ```json
  { "teacher_profile_id": "uuid", "note": "string" }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "message": "Candidate saved" } }
  ```
  (`409` if already saved · `422` if the cap is reached)

### 6. unsaveCandidate

- **API endpoint:** `DELETE /api/schoolProfiles/unsaveCandidate/{teacher_profile_id}`
- **Type of action:** User-level
- **What event happens:** Removes a teacher from the school's `saved_candidates`.
- **Req.body():** none
- **Response:**
  ```json
  { "success": true, "data": { "message": "Candidate removed" } }
  ```

---

## Job service

> Schools create / edit / submit jobs via JWT. **Only a skooljobs_admin makes a job live** (via `reviewJob`) — a school can never publish its own job directly. Teachers/public browse the live ones.

### 1. createJob

- **API endpoint:** `POST /api/jobs/createJob`
- **Type of action:** User-level (sch_admin / sch_member)
- **What event happens:** Creates/saves a job. `action: save_draft` keeps it a **draft**; `action: submit` saves it **and** sends it to the admin for review (`admin_review_status: pending_review`) — this is what the school's "Publish Job" button triggers (the school can't self-publish). Pass `job_id` to edit an existing draft. On first create a UUID `job_id` is generated; `school_profile_id` and `posted_by_user_id` come from the JWT. `status` stays `draft` until the admin approves it; `publish_option` is only the school's **preference**, applied later by the admin.
- **Req.body():** full job fields (subset shown); include `job_id` to edit the draft
  ```json
  {
    "job_id": "uuid (omit to create)",
    "action": "save_draft | submit",
    "title": "string",
    "subject": "string",
    "employment_type": "string",
    "location": "string",
    "description": "string",
    "vacancies": 1,
    "compensation": { "...": "..." },
    "language_requirements": [
      { "language": "string", "proficiency": "string" }
    ],
    "required_skills": ["string"],
    "publish_option": "Publish Immediately | Publish Later",
    "publish_at": "date | null"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "job_id": "uuid", "status": "draft" } }
  ```

### 2. listJobs

- **API endpoint:** `GET /api/jobs/listJobs`
- **Type of action:** System-level (teacher / public; school filters its own)
- **What event happens:** Lists published/active jobs with filters; paginated. A school passes its own `school_profile_id` (or via JWT) to get its own jobs in any status.
- **Req.body():** none — query: `subject`, `location`, `employment_type`, `school_profile_id`, `status`, `page`, `limit`
- **Response:**
  ```json
  { "success": true, "data": [ { "...Job" } ], "total": 100, "page": 1, "limit": 20 }
  ```

### 3. getJob

- **API endpoint:** `GET /api/jobs/getJob/{job_id}`
- **Type of action:** User-level (public)
- **What event happens:** Returns full job details.
- **Req.body():** none
- **Response:**
  ```json
  { "success": true, "data": { "...Job" } }
  ```

### 4. reviewJob

- **API endpoint:** `PATCH /api/jobs/reviewJob/{job_id}`
- **Type of action:** User-level (skooljobs_admin only)
- **What event happens:** A **skooljobs_admin** finalises the job — this is the only step that makes a job live. On **reject**: `admin_review_status=rejected` (+ reason). On **publish**: `admin_review_status=published`, then the school's `publish_option` decides the `status` — **Publish Immediately** → `active` (`posted_date` = now); **Publish Later** → `scheduled` (a scheduler flips it to `active` at `publish_at`).
- **Req.body():**
  ```json
  { "action": "publish | reject", "admin_rejection_reason": "string" }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "job_id": "uuid",
      "admin_review_status": "string",
      "status": "string"
    }
  }
  ```

### 5. setJobStatus

- **API endpoint:** `PATCH /api/jobs/setJobStatus/{job_id}`
- **Type of action:** User-level (school)
- **What event happens:** School closes or reopens a job (e.g. `active → closed`, `closed → active`).
- **Req.body():**
  ```json
  { "status": "active | closed" }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "message": "Job status updated" } }
  ```

### 6. deleteJob

- **API endpoint:** `DELETE /api/jobs/deleteJob/{job_id}`
- **Type of action:** User-level (school)
- **What event happens:** Deletes a job (usually a draft).
- **Req.body():** none
- **Response:**
  ```json
  { "success": true, "data": { "message": "Job deleted" } }
  ```

### 7. getRecommendedJobs

- **API endpoint:** `GET /api/jobs/getRecommendedJobs`
- **Type of action:** System-level (teacher)
- **What event happens:** Returns jobs recommended for the logged-in teacher, matched on resume `skill` / `main_subject`. Paginated.
- **Req.body():** none — query: `page`, `limit`
- **Response:**
  ```json
  { "success": true, "data": [ { "...Job" } ], "total": 24, "page": 1, "limit": 20 }
  ```

---

## Application service

> Flow: teacher applies → the application goes to a **skooljobs_admin** first (gate); only **admin-approved** applications reach the school. The school then shortlists / rejects / hires and schedules interviews. The admin's approve/reject is **internal** — the teacher only ever sees the school-side outcome. Interviews are embedded in the application (`interviews[]`), each with its own `interview_id`.

### 1. applyToJob

- **API endpoint:** `POST /api/applications/applyToJob`
- **Type of action:** User-level (teacher)
- **What event happens:** Teacher applies to a job. Creates an application with `status: submitted` — meaning **pending skooljobs_admin review** (the school does NOT see it yet). A UUID `application_id` is generated and the job's `applicants_count` bumps. Duplicate applications (same teacher + same job) are blocked.
- **Req.body():**
  ```json
  { "job_id": "uuid", "resume_id": "uuid", "cover_letter_id": "uuid | null" }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": { "application_id": "uuid", "status": "submitted" }
  }
  ```
  (`409` if already applied to this job)

### 2. withdrawApplication

- **API endpoint:** `PATCH /api/applications/withdrawApplication/{application_id}`
- **Type of action:** User-level (teacher)
- **What event happens:** Teacher withdraws their application; `status` → `withdrawn`.
- **Req.body():** none
- **Response:**
  ```json
  {
    "success": true,
    "data": { "application_id": "uuid", "status": "withdrawn" }
  }
  ```

### 3. listApplications

- **API endpoint:** `GET /api/applications/listApplications`
- **Type of action:** User-level (role-aware)
- **What event happens:** Lists applications (role inferred from JWT). A **school sees only `admin_approved` onwards** (fresh + genuine) — never `submitted` or `admin_rejected` ones. A **teacher** sees their own, but the admin gate is hidden from them (admin states show as a neutral "Under Review" until the school acts). Paginated.
- **Req.body():** none — query: `job_id`, `status`, `subject`, `page`, `limit`
- **Response:**
  ```json
  { "success": true, "data": [ { "...Application" } ], "total": 100, "page": 1, "limit": 20 }
  ```

### 4. getApplication

- **API endpoint:** `GET /api/applications/getApplication/{application_id}`
- **Type of action:** User-level
- **What event happens:** Returns one application, including its embedded `interviews`.
- **Req.body():** none
- **Response:**
  ```json
  { "success": true, "data": { "...Application" } }
  ```

### 5. setApplicationStatus

- **API endpoint:** `PATCH /api/applications/setApplicationStatus/{application_id}`
- **Type of action:** User-level (school)
- **What event happens:** School moves an **admin-approved** applicant through the pipeline — `shortlisted` / `rejected_by_school` / `hired` — via one action. Sets `reviewed_at` the first time the school opens it. (Works only on applications the admin has approved.)
- **Req.body():**
  ```json
  {
    "status": "shortlisted | rejected_by_school | hired",
    "school_notes": "string"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "application_id": "uuid", "status": "string" } }
  ```

### 6. reviewApplication

- **API endpoint:** `PATCH /api/applications/reviewApplication/{application_id}`
- **Type of action:** User-level (skooljobs_admin only)
- **What event happens:** The **mandatory gate** before a school can see an application. On **approve** → `status: admin_approved` (now visible to the school). On **reject** → `status: admin_rejected` (blocked — the school never sees it). Recorded in `admin_review`; the teacher is never shown this step.
- **Req.body():**
  ```json
  { "action": "approve | reject", "notes": "string" }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": { "application_id": "uuid", "status": "admin_approved | admin_rejected" }
  }
  ```

### 7. scheduleInterview

- **API endpoint:** `POST /api/applications/scheduleInterview/{application_id}`
- **Type of action:** User-level (school)
- **What event happens:** Adds an interview round to a shortlisted application's `interviews[]`; a UUID `interview_id` is generated (status `Scheduled`). Allowed only when the application is `shortlisted`.
- **Req.body():**
  ```json
  {
    "round": "1st Round | 2nd Round | Technical Round | HR Round | Final Round",
    "scheduled_date": "date",
    "scheduled_time": "string",
    "duration": "string",
    "mode": "Online | In-Person | Telephonic",
    "online_platform": "string | null",
    "meeting_link": "string | null",
    "interviewer": "string",
    "reminders": { "confirmation": true, "remind_24h": true, "remind_1h": true }
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "interview_id": "uuid", "status": "Scheduled" } }
  ```

### 8. updateInterview

- **API endpoint:** `PATCH /api/applications/updateInterview/{application_id}/{interview_id}`
- **Type of action:** User-level (school)
- **What event happens:** Edits an interview round or changes its status (`Confirmed` / `Completed` / `Cancelled`).
- **Req.body():** any interview fields, e.g.
  ```json
  { "status": "Confirmed", "scheduled_date": "date", "meeting_link": "string" }
  ```
- **Response:**
  ```json
  { "success": true, "data": { "interview_id": "uuid", "status": "string" } }
  ```

---

## Data Model

> MongoDB · database `skooljobs_db` · mirrors `Datamodel/datamodel.json` (source of truth).
> UUID ids; any `*_id` field holds the referenced record's UUID. Embedded sub-documents live inside their parent.

### users

- **Short desc:** Account & login identity for every actor (teacher, school staff, platform admin). One login = one user.
- **Datamodel:**
  ```json
  {
    "_schema": {
      "user_id": "uuid - user id, other docs ref this",
      "first_name": "string - first name",
      "last_name": "string - last name",
      "email": "string - login email, keep unique",
      "password_hash": "string - bcrypt hashed pwd, never store plain",
      "user_scope": "enum - user role, one of sj_admin/sj_superadmin/teacher/sch_admin/sch_member",
      "school_id": "uuid|null - which school this user belongs to, null for teacher n platform admins",
      "profile_id": "uuid|null - linked profile id (teacher_profile_id or school_profile_id), null till profile made",
      "phone": "string - mobile no, otp goes here too",
      "is_active": "bool - acc on/off, sj admin controls",
      "is_email_verified": "bool - email verified or not (via otp)",
      "is_phone_verified": "bool - phone verified or not (via otp)",
      "last_login": "date|null - last login time",
      "password_reset_token": "string|null - token for reset pwd req",
      "password_reset_expires": "date|null - when that token expires",
      "created_by_user_id": "uuid|null - which owner made this member, for member limit check",
      "created_at": "date - acc created",
      "updated_at": "date - last update"
    },
    "_indexes": [
      { "fields": { "user_id": 1 }, "options": { "unique": true } },
      { "fields": { "email": 1 }, "options": { "unique": true } },
      { "fields": { "school_id": 1 } }
    ]
  }
  ```

### teacher_profiles

- **Short desc:** A teacher's full CV — identity, subjects, plus embedded qualifications, experiences, achievements, resumes, cover letters, saved jobs. Linked to a user via `users.profile_id`.
- **Datamodel:**

  ```json
  {
    "_schema": {
      "teacher_profile_id": "uuid - profile id, this goes into users.profile_id",
      "title": "enum - Mr/Mrs/Miss/Ms/Dr/Prof",
      "first_name": "string - first name",
      "middle_name": "string|null - middle name if any",
      "last_name": "string - last name",
      "dob": "object - dob { day, month, year }",
      "age": "number|null - age in yrs, auto from dob else manual",
      "nationality": "string - nationality",
      "current_job_title": "string|null - current role",
      "main_subject": "string - main subject",
      "additional_subjects": "string[] - other subjects he can teach",
      "classes_taught": "string[] - classes taught",
      "languages": "object[] - langs [{ language, proficiency }]",
      "highest_qualification_1": "string|null - top qualification 1",
      "highest_qualification_2": "string|null - top qualification 2",
      "profile_photo_url": "string|null - profile pic url",
      "summary": "string|null - short about (50-100 words), shown on profile/resume",
      "profile_score": "number - 0-100 completeness score",
      "is_profile_visible": "bool - if on, schools can see n contact teacher",
      "profile_verified": "bool - admin checked profile or not",
      "contact": {
        "mobile": "string - mobile no",
        "whatsapp": "string|null - whatsapp no, for interview stuff",
        "same_as_mobile": "bool - whatsapp same as mobile or not",
        "primary_email": "string - main email",
        "secondary_email": "string|null - backup email"
      },
      "address": {
        "pin_code": "string|null - pincode, auto fills city/state",
        "city": "string|null - city",
        "state": "string|null - state",
        "full_address": "string|null - full address"
      },
      "notification_preferences": {
        "email": "bool - email notif on/off (default on)",
        "sms": "bool - sms on/off (default off)",
        "push": "bool - push on/off (default on)"
      },
      "created_at": "date - profile created",
      "updated_at": "date - last update",

      "qualifications": {
        "_type": "object[]",
        "_item_schema": {
          "class_level": "enum|null - Class 10 / Class 12",
          "school_name": "string|null - school/board name",
          "degree": "string - degree like B.Ed, M.Sc",
          "course": "string|null - course/specialization",
          "year_passed": "string - passing year",
          "medium": "string|null - medium",
          "mode": "enum|null - Regular/Distance/Part-time/Online/Correspondence/Open University/Hybrid",
          "percentage": "string|null - marks/percent or cgpa",
          "university": "string|null - university",
          "college": "string|null - college",
          "created_at": "date - added",
          "updated_at": "date - edited"
        }
      },

      "experiences": {
        "_type": "object[]",
        "_item_schema": {
          "school_name": "string - school/employer name",
          "is_current_employer": "bool - currently working here or not",
          "board": "string|null - school board",
          "start_date": "date - join date",
          "end_date": "date|null - leave date, null if current",
          "main_subject": "string - main subject in this job",
          "other_subjects": "string|null - other subjects",
          "post_held": "string - post/designation",
          "salary_ctc_annual": "number|null - yearly ctc here",
          "monthly_take_home": "number|null - monthly in hand",
          "reason_for_leaving": "string|null - why left",
          "details": "string|null - extra notes",
          "created_at": "date - added",
          "updated_at": "date - edited"
        }
      },

      "achievements": {
        "_type": "object[]",
        "_item_schema": {
          "category": "enum - award or course",
          "type": "string - type like Award/Recognition/Publication/Workshop/Certification/Training",
          "name": "string - award/course name",
          "issued_by": "string - who gave it",
          "year": "string - year",
          "created_at": "date - added",
          "updated_at": "date - edited"
        }
      },

      "resumes": {
        "_type": "object[]",
        "_item_schema": {
          "resume_id": "uuid - resume id, applications.resume_id refs this",
          "source": "enum - uploaded or created",
          "title": "string - resume title",
          "file_name": "string - file name",
          "file_url": "string|null - file download url",
          "format": "enum - PDF/DOCX/Text",
          "skill": "string|null - main skill, for job match",
          "score": "number - 0-100 resume score",
          "full_name": "string|null - name on resume",
          "email": "string|null - email on resume",
          "mobile": "string|null - mobile on resume",
          "address": "string|null - address on resume",
          "current_job_title": "string|null - job title on resume",
          "summary": "string|null - summary section",
          "skills": "string|null - skills section",
          "education": "string|null - education section",
          "experience": "string|null - experience section",
          "certifications": "string|null - certs section",
          "languages": "string|null - languages section",
          "resume_achievements": "string|null - achievements section",
          "notes": "string|null - private notes, dont share",
          "is_active": "bool - is this the selected resume",
          "created_at": "date - added",
          "updated_at": "date - edited"
        }
      },

      "cover_letters": {
        "_type": "object[]",
        "_item_schema": {
          "cover_letter_id": "uuid - cover letter id",
          "title": "string - display title of the cover letter",
          "source": "enum - ai_generated/uploaded/manual",
          "content": "string - cover letter text",
          "resume_id": "uuid|null - which resume this was made for (resumes.resume_id)",
          "job_id": "uuid|null - which job this targets (jobs.job_id)",
          "file_name": "string|null - file name if uploaded",
          "file_url": "string|null - file url if uploaded",
          "created_at": "date - created"
        }
      },

      "saved_jobs": {
        "_type": "object[]",
        "_item_schema": {
          "job_id": "uuid - saved job id",
          "saved_at": "date - when saved"
        }
      }
    },
    "_indexes": [
      { "fields": { "teacher_profile_id": 1 }, "options": { "unique": true } },
      {
        "fields": { "resumes.skill": 1 },
        "comment": "multikey idx for job match query"
      }
    ]
  }
  ```

### school_profiles

- **Short desc:** An institute's public profile + KYC + branding + address. Embeds the school's `saved_candidates` (lifelong bookmarks of teachers, capped ~50, app-side).
- **Datamodel:**

  ```json
  {
    "_schema": {
      "school_profile_id": "uuid - school/institute id",
      "school_admin_id": "uuid - first user who registered as school admin (users.user_id)",
      "school_name": "string - institute name",
      "sector": "enum - sector: Schools & Institutions/Colleges & Universities/Coaching Centers/EdTech/Government/Private/Other",
      "school_type": "enum - Public/Private/International/Boarding/Co-Ed/Girls/Boys/Special Education/Other School",
      "affiliation_status": "enum - Affiliated/Pending Affiliation/Not Affiliated",
      "board": "enum - CBSE/ICSE/State Board/IB/IGCSE-Cambridge/NIOS/Other",
      "medium": "string - medium of teaching (English/Hindi/etc)",
      "level": "enum - Primary/Middle/Secondary/Senior Secondary/All Levels",
      "industry": "string - industry label",
      "total_teachers": "number|null - approx teacher count",
      "established_year": "number|null - founding year",
      "description": "string|null - about school text, on public profile",
      "logo_url": "string|null - logo url",
      "cover_image_url": "string|null - cover img url",
      "gallery_image_urls": "string[] - extra photo urls",
      "contact": {
        "email": "string - school contact email",
        "phone": "string - school contact phone",
        "website": "string|null - website url"
      },
      "address": {
        "pin_code": "string - pincode",
        "city": "string - city",
        "state": "string - state",
        "country": "string - country",
        "full_address": "string|null - full address"
      },
      "social_links": {
        "linkedin": "string|null - linkedin url",
        "facebook": "string|null - fb url",
        "twitter": "string|null - twitter/x url",
        "instagram": "string|null - insta url"
      },
      "school_profile_status": "enum - active/pending_verification/suspended/rejected",
      "profile_verified": "bool - school kyc cleared by admin or not",
      "created_at": "date - created",
      "updated_at": "date - last update",

      "saved_candidates": {
        "_type": "object[]",
        "_item_schema": {
          "teacher_profile_id": "uuid - saved candidate (teacher_profiles.teacher_profile_id); school-level bookmark, lifelong, not tied to any job or application",
          "saved_by_user_id": "uuid - which staff saved (users.user_id)",
          "note": "string|null - school private note about candidate",
          "created_at": "date - when saved",
          "updated_at": "date - note last update"
        }
      }
    },
    "_indexes": [
      { "fields": { "school_profile_id": 1 }, "options": { "unique": true } },
      { "fields": { "school_name": 1 } },
      { "fields": { "school_profile_status": 1 } },
      { "fields": { "address.city": 1 } },
      {
        "fields": { "saved_candidates.teacher_profile_id": 1 },
        "comment": "lookup/dedupe saved candidates inside a school; uniqueness enforced app-side"
      }
    ]
  }
  ```

### jobs

- **Short desc:** Job postings created by school staff and reviewed by admin. Holds the full post-job form — compensation, language/skill/qualification requirements, and publish scheduling.
- **Datamodel:**
  ```json
  {
    "_schema": {
      "job_id": "uuid - job posting id",
      "school_profile_id": "uuid - which school owns job, kept here for fast queries",
      "posted_by_user_id": "uuid - which staff made the job (users.user_id)",
      "title": "string - job title (like Mathematics Teacher)",
      "subject": "string - which subject to teach",
      "role_category": "string|null - role grouping, from post-job form",
      "employment_type": "enum - Full-time/Part-time/Contract/Visiting/Internship/Hybrid/Remote, decides which salary fields apply",
      "joining_timeline": "string|null - join by when",
      "location": "string - job location",
      "language_type": "string|null - language grouping (Indian/Foreign)",
      "language_requirements": {
        "_type": "object[]",
        "_item_schema": {
          "language": "string - which language needed",
          "proficiency": "string - proficiency needed"
        }
      },
      "min_qualification": "string|null - min qualification",
      "additional_qualification": "string|null - extra qualification (preferred)",
      "certifications": "string[] - certs needed",
      "experience_required": "string|null - exp needed (like 2-5 Years)",
      "qualifications_required": "string|null - free text qualification summary (legacy/fallback)",
      "student_levels": "string[] - which student levels to handle",
      "preferred_school_types": "string[] - candidate prev school type preferred",
      "description": "string|null - full job description",
      "requirements": "string|null - free text requirements (legacy/fallback)",
      "required_skills": "string[] - core skills",
      "technical_skills": "string[] - technical/tooling skills",
      "compensation": {
        "structure": "string - Monthly or Annual, decides primary salary fields",
        "in_hand_percentage": "string|null - how much of ctc is in-hand",
        "min_annual_ctc": "string|null - min yearly ctc (full-time)",
        "max_annual_ctc": "string|null - max yearly ctc (full-time)",
        "min_monthly_salary": "string|null - min monthly salary",
        "max_monthly_salary": "string|null - max monthly salary",
        "min_hourly_rate": "string|null - min hourly rate (part-time)",
        "max_hourly_rate": "string|null - max hourly rate (part-time)",
        "hours_per_week": "string|null - hours per week (part-time)",
        "contract_duration": "string|null - contract length",
        "contract_payment_type": "string|null - how contract is paid (monthly vs total)",
        "contract_monthly_payment": "string|null - contract monthly payment",
        "contract_total_value": "string|null - contract total value",
        "wfh_days": "string|null - wfh days per week (hybrid)",
        "office_days": "string|null - office days per week (hybrid)",
        "work_timezone": "string|null - timezone needed (remote)",
        "remote_location": "string|null - allowed remote location (remote)",
        "internship_duration": "string|null - internship length",
        "min_stipend": "string|null - min stipend (internship)",
        "max_stipend": "string|null - max stipend (internship)",
        "monthly_benefits": "string[] - benefits for monthly comp",
        "annual_benefits": "string[] - benefits for annual comp"
      },
      "vacancies": "number - how many positions open",
      "gender_preference": "enum - Any/Male/Female",
      "interview_mode": "string|null - preferred interview mode for this role",
      "publish_option": "enum - Publish Immediately or Publish Later",
      "publish_at": "date|null - when to publish if Publish Later",
      "admin_review_status": "enum - pending_review/published/rejected/unpublished",
      "status": "enum - draft/scheduled/active/closed/expired",
      "admin_rejection_reason": "string|null - reason if rejected in review",
      "applicants_count": "number - how many applied, bumps on each application",
      "posted_date": "date|null - set when job goes live",
      "expiry_date": "date|null - auto close date",
      "created_at": "date - created",
      "updated_at": "date - last update"
    },
    "_indexes": [
      { "fields": { "job_id": 1 }, "options": { "unique": true } },
      { "fields": { "school_profile_id": 1 } },
      { "fields": { "status": 1 } },
      { "fields": { "location": 1 } },
      { "fields": { "employment_type": 1 } }
    ]
  }
  ```

### applications

- **Short desc:** A teacher's application to a job, with school + admin actions. Embeds the `interviews` rounds scheduled for that application.
- **Datamodel:**

  ```json
  {
    "_schema": {
      "application_id": "uuid - this application id",
      "job_id": "uuid - which job applied to (jobs.job_id)",
      "teacher_user_id": "uuid - applying teacher user id (users.user_id)",
      "school_id": "uuid - job school id, kept here for fast school-side queries",
      "resume_id": "uuid|null - which resume submitted (resumes.resume_id)",
      "cover_letter_id": "uuid|null - which cover letter submitted (cover_letters.cover_letter_id)",
      "status": "enum - submitted (pending sj_admin review)/admin_approved/admin_rejected/shortlisted/rejected_by_school/hired/withdrawn",
      "school_notes": "string|null - school hr private note",
      "admin_review": {
        "action": "enum|null - sj_admin gate before school sees the app: approve/reject",
        "admin_user_id": "uuid|null - which admin acted (users.user_id)",
        "notes": "string|null - admin notes, internal (never shown to teacher)",
        "actioned_at": "date|null - when admin acted"
      },
      "applied_date": "date - when teacher applied (shown in My Applications)",
      "reviewed_at": "date|null - when school first opened resume/profile (submitted -> reviewed)",
      "submitted_at": "date - application created",
      "updated_at": "date - last update",

      "interviews": {
        "_type": "object[]",
        "_item_schema": {
          "interview_id": "uuid - this interview round id (used to update its status)",
          "round": "enum - 1st Round/2nd Round/Technical Round/HR Round/Final Round",
          "scheduled_date": "date - interview date",
          "scheduled_time": "string - interview time",
          "duration": "enum - 15/30/45/60/90 Minutes",
          "mode": "enum - Online/In-Person/Telephonic",
          "online_platform": "enum|null - if Online: Google Meet/Zoom/Microsoft Teams/WhatsApp Video Call",
          "meeting_link": "string|null - meeting url, needed for online except WhatsApp Video Call",
          "location": "string|null - in-person address",
          "room": "string|null - in-person room/venue",
          "interviewer": "string|null - interviewer names",
          "notes_for_candidate": "string|null - notes shown to candidate",
          "internal_notes": "string|null - notes for school hr only",
          "reminders": {
            "confirmation": "bool - send confirmation to candidate right after scheduling",
            "remind_24h": "bool - reminder 24 hrs before",
            "remind_1h": "bool - reminder 1 hr before"
          },
          "status": "enum - Scheduled (default)/Confirmed/Completed/Cancelled",
          "scheduled_by_user_id": "uuid|null - which staff scheduled (users.user_id)",
          "created_at": "date - created",
          "updated_at": "date - last update"
        }
      }
    },
    "_indexes": [
      { "fields": { "application_id": 1 }, "options": { "unique": true } },
      { "fields": { "job_id": 1 } },
      { "fields": { "teacher_user_id": 1 } },
      { "fields": { "school_id": 1 } },
      { "fields": { "status": 1 } },
      { "fields": { "interviews.status": 1 } },
      {
        "fields": { "job_id": 1, "teacher_user_id": 1 },
        "options": {
          "unique": true,
          "comment": "stop same teacher applying to same job twice"
        }
      }
    ]
  }
  ```
